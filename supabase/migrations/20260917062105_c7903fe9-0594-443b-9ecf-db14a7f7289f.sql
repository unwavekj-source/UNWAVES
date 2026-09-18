-- 1. profiles: restrict full row to owner + staff; expose safe view
DROP POLICY IF EXISTS "Passports are visible to participants" ON public.profiles;
CREATE POLICY "Passport visible to owner and staff" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

CREATE OR REPLACE VIEW public.public_passports AS
  SELECT id, full_name, ca_level, avatar_url, participant_id, xp, streak, city
  FROM public.profiles;
GRANT SELECT ON public.public_passports TO authenticated;
GRANT SELECT ON public.public_passports TO service_role;

-- 2. user_badges: owner + staff only
DROP POLICY IF EXISTS "Badges visible to participants" ON public.user_badges;
CREATE POLICY "Badges visible to owner and staff" ON public.user_badges
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

-- 3. votes: owner + staff only; public per-submission counts via view
DROP POLICY IF EXISTS "Votes visible to participants" ON public.votes;
CREATE POLICY "Votes visible to owner and staff" ON public.votes
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

CREATE OR REPLACE VIEW public.submission_vote_counts AS
  SELECT submission_id, COUNT(*)::int AS vote_count
  FROM public.votes
  GROUP BY submission_id;
GRANT SELECT ON public.submission_vote_counts TO authenticated;
GRANT SELECT ON public.submission_vote_counts TO service_role;

-- 4. submissions: approved visible to all participants; pending/rejected only owner + staff
DROP POLICY IF EXISTS "Submissions visible to participants" ON public.submissions;
CREATE POLICY "Approved submissions visible to participants" ON public.submissions
  FOR SELECT TO authenticated
  USING (status = 'approved' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

-- 5. registrations: stop broadcasting PII via realtime
ALTER PUBLICATION supabase_realtime DROP TABLE public.registrations;