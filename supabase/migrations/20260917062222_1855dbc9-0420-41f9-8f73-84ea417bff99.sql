DROP VIEW IF EXISTS public.public_passports;
DROP VIEW IF EXISTS public.submission_vote_counts;

CREATE TABLE public.public_profiles (
  id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  ca_level text NOT NULL DEFAULT '',
  avatar_url text,
  participant_id text NOT NULL DEFAULT '',
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  city text
);
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT ALL ON public.public_profiles TO service_role;
ALTER TABLE public.public_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public passports readable by participants" ON public.public_profiles
  FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.sync_public_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.public_profiles (id, full_name, ca_level, avatar_url, participant_id, xp, streak, city)
  VALUES (NEW.id, NEW.full_name, NEW.ca_level, NEW.avatar_url, NEW.participant_id, NEW.xp, NEW.streak, NEW.city)
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    ca_level = EXCLUDED.ca_level,
    avatar_url = EXCLUDED.avatar_url,
    participant_id = EXCLUDED.participant_id,
    xp = EXCLUDED.xp,
    streak = EXCLUDED.streak,
    city = EXCLUDED.city;
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_sync_public
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_public_profile();

INSERT INTO public.public_profiles (id, full_name, ca_level, avatar_url, participant_id, xp, streak, city)
SELECT id, full_name, ca_level, avatar_url, participant_id, xp, streak, city FROM public.profiles
ON CONFLICT (id) DO NOTHING;

CREATE TABLE public.submission_vote_counts (
  submission_id uuid PRIMARY KEY REFERENCES public.submissions(id) ON DELETE CASCADE,
  vote_count integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.submission_vote_counts TO authenticated;
GRANT ALL ON public.submission_vote_counts TO service_role;
ALTER TABLE public.submission_vote_counts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vote counts readable by participants" ON public.submission_vote_counts
  FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.sync_vote_count()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  sid uuid := COALESCE(NEW.submission_id, OLD.submission_id);
BEGIN
  INSERT INTO public.submission_vote_counts (submission_id, vote_count)
  VALUES (sid, (SELECT COUNT(*)::int FROM public.votes WHERE submission_id = sid))
  ON CONFLICT (submission_id) DO UPDATE SET vote_count = EXCLUDED.vote_count;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER votes_sync_count
AFTER INSERT OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION public.sync_vote_count();

INSERT INTO public.submission_vote_counts (submission_id, vote_count)
SELECT submission_id, COUNT(*)::int FROM public.votes GROUP BY submission_id
ON CONFLICT (submission_id) DO NOTHING;