-- helper: updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS public.participant_seq START 1001;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL DEFAULT 'Festival Guest',
  email text,
  ca_level text NOT NULL DEFAULT 'CA Student',
  city text,
  avatar_url text,
  participant_id text NOT NULL UNIQUE DEFAULT ('CU1-' || nextval('public.participant_seq')::text),
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  favourite_memory text,
  season text NOT NULL DEFAULT 'Season 1',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passports are visible to participants" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Participants insert own passport" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Participants update own passport" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.mission_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  day integer NOT NULL DEFAULT 1,
  mission_key text NOT NULL,
  xp integer NOT NULL DEFAULT 0,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day, mission_key)
);
GRANT SELECT, INSERT, DELETE ON public.mission_completions TO authenticated;
GRANT ALL ON public.mission_completions TO service_role;
ALTER TABLE public.mission_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own mission completions" ON public.mission_completions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Create own mission completions" ON public.mission_completions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Delete own mission completions" ON public.mission_completions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_key text NOT NULL DEFAULT 'main',
  title text NOT NULL,
  story text,
  media_url text,
  media_kind text NOT NULL DEFAULT 'image',
  category text NOT NULL DEFAULT 'Art',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Submissions visible to participants" ON public.submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Create own submission" ON public.submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update own submission" ON public.submissions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Delete own submission" ON public.submissions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  submission_id uuid NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, submission_id)
);
GRANT SELECT, INSERT, DELETE ON public.votes TO authenticated;
GRANT ALL ON public.votes TO service_role;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Votes visible to participants" ON public.votes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Cast own vote" ON public.votes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Remove own vote" ON public.votes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_key text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_key)
);
GRANT SELECT, INSERT ON public.user_badges TO authenticated;
GRANT ALL ON public.user_badges TO service_role;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges visible to participants" ON public.user_badges FOR SELECT TO authenticated USING (true);
CREATE POLICY "Earn own badge" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  kind text NOT NULL DEFAULT 'news',
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.announcements TO anon, authenticated;
GRANT ALL ON public.announcements TO service_role;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Announcements are public" ON public.announcements FOR SELECT USING (true);

INSERT INTO public.announcements (title, body, kind, pinned) VALUES
('Season 1 gates are open', 'Rediscover Yourself begins now. Fifteen days of missions, challenges and celebration.', 'news', true),
('Main Challenge live: Reel It Unwind', 'Your 60-second story of the days after the attempt. Submissions close on Day 8.', 'challenge', false),
('People''s Choice Stage opens Day 9', 'The community decides the loudest cheer of the season. One vote per entry.', 'voting', false),
('Founder note', 'The 15 days after an attempt belong to you. Spend them creating, not revising.', 'founder', false);

-- auto-create passport on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, ca_level, city)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email, 'Festival Guest'), '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'ca_level', 'CA Student'),
    NEW.raw_user_meta_data->>'city'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();