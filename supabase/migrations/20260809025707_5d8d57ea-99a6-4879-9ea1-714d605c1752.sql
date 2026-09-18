-- 1. Activity configuration (admin-editable, no code changes)
CREATE TABLE public.unwind_activities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day integer NOT NULL,
  mission_key text NOT NULL,
  title text,
  hashtag text NOT NULL DEFAULT '#CAUnwind',
  tag_account text NOT NULL DEFAULT '@caunwind',
  platform text NOT NULL DEFAULT 'Instagram',
  story_required boolean NOT NULL DEFAULT true,
  feed_post_accepted boolean NOT NULL DEFAULT true,
  reel_accepted boolean NOT NULL DEFAULT true,
  link_required boolean NOT NULL DEFAULT false,
  extra_requirements text,
  xp_override integer,
  bulk_approvable boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (day, mission_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.unwind_activities TO authenticated;
GRANT ALL ON public.unwind_activities TO service_role;
ALTER TABLE public.unwind_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Activity config readable by participants" ON public.unwind_activities
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins insert activity config" ON public.unwind_activities
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update activity config" ON public.unwind_activities
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete activity config" ON public.unwind_activities
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER unwind_activities_updated_at BEFORE UPDATE ON public.unwind_activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Proof submissions awaiting verification
CREATE TABLE public.unwind_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  day integer NOT NULL,
  mission_key text NOT NULL,
  mission_title text NOT NULL DEFAULT '',
  xp integer NOT NULL DEFAULT 0,
  platform text NOT NULL DEFAULT 'Instagram',
  proof_path text,
  story_link text,
  note text,
  status text NOT NULL DEFAULT 'pending',
  review_note text,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, day, mission_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.unwind_submissions TO authenticated;
GRANT ALL ON public.unwind_submissions TO service_role;
ALTER TABLE public.unwind_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own unwind submissions" ON public.unwind_submissions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Staff read all unwind submissions" ON public.unwind_submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));
CREATE POLICY "Create own unwind submission" ON public.unwind_submissions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status IN ('pending'));
CREATE POLICY "Resubmit own unwind submission" ON public.unwind_submissions
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND status IN ('pending', 'resubmit'))
  WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Staff review unwind submissions" ON public.unwind_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));
CREATE POLICY "Admins delete unwind submissions" ON public.unwind_submissions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER unwind_submissions_updated_at BEFORE UPDATE ON public.unwind_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX unwind_submissions_status_idx ON public.unwind_submissions (status, created_at DESC);

-- 3. In-app notifications
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  kind text NOT NULL DEFAULT 'info',
  read_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Mark own notifications read" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX notifications_user_idx ON public.notifications (user_id, created_at DESC);

-- 4. Completions can only come from a verified approval
DROP POLICY IF EXISTS "Create own mission completions" ON public.mission_completions;

CREATE UNIQUE INDEX IF NOT EXISTS mission_completions_unique_key
  ON public.mission_completions (user_id, day, mission_key);

-- 5. Approval / rejection automation
CREATE OR REPLACE FUNCTION public.handle_unwind_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  awarded integer := 0;
  new_streak integer := 0;
BEGIN
  IF NEW.status = OLD.status THEN
    RETURN NEW;
  END IF;

  IF NEW.status = 'approved' THEN
    INSERT INTO public.mission_completions (user_id, day, mission_key, xp, note)
    VALUES (NEW.user_id, NEW.day, NEW.mission_key, NEW.xp, NEW.note)
    ON CONFLICT (user_id, day, mission_key) DO NOTHING;

    IF FOUND THEN
      awarded := NEW.xp;
    END IF;

    SELECT COUNT(DISTINCT day) INTO new_streak
    FROM public.mission_completions WHERE user_id = NEW.user_id;

    UPDATE public.profiles
    SET xp = xp + awarded, streak = new_streak
    WHERE id = NEW.user_id;

    INSERT INTO public.notifications (user_id, title, body, kind)
    VALUES (
      NEW.user_id,
      'Daily Unwind verified',
      'Congratulations! Your Daily Unwind "' || COALESCE(NULLIF(NEW.mission_title, ''), NEW.mission_key) ||
      '" has been verified. Thank you for making the community more vibrant today.',
      'success'
    );
  ELSIF NEW.status = 'rejected' THEN
    INSERT INTO public.notifications (user_id, title, body, kind)
    VALUES (
      NEW.user_id,
      'Daily Unwind needs a fix',
      COALESCE(NULLIF(NEW.review_note, ''), 'Your submission could not be verified.'),
      'error'
    );
  ELSIF NEW.status = 'resubmit' THEN
    INSERT INTO public.notifications (user_id, title, body, kind)
    VALUES (
      NEW.user_id,
      'Resubmission requested',
      COALESCE(NULLIF(NEW.review_note, ''), 'Please share fresh proof for this Daily Unwind.'),
      'warning'
    );
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_unwind_review() FROM public, anon, authenticated;

CREATE TRIGGER unwind_submissions_review
  AFTER UPDATE OF status ON public.unwind_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_unwind_review();

-- 6. Seed social config for all 15 days x 5 activities
INSERT INTO public.unwind_activities (day, mission_key, hashtag, tag_account, platform, story_required, feed_post_accepted, reel_accepted, link_required, extra_requirements, bulk_approvable)
SELECT d, 'd' || d || '-m' || m,
  '#CAUnwind',
  '@caunwind',
  'Instagram',
  true, true, true, false,
  'Share your Daily Unwind on your Instagram Story, tag the official account and use the event hashtag. Then upload the screenshot here.',
  m IN (1, 4, 5)
FROM generate_series(1, 15) AS d, generate_series(1, 5) AS m;