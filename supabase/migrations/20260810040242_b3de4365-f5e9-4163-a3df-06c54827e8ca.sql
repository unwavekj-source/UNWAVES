CREATE TABLE public.seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  theme text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  total_days integer NOT NULL DEFAULT 15,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL DEFAULT (now() + interval '15 days'),
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  instagram_handle text NOT NULL DEFAULT '@caunwind',
  default_hashtag text NOT NULL DEFAULT '#CAUnwind',
  story_instructions text NOT NULL DEFAULT 'Post your moment as an Instagram Story, tag the official account and add the hashtag, then upload a screenshot here.',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.seasons TO anon;
GRANT SELECT ON public.seasons TO authenticated;
GRANT ALL ON public.seasons TO service_role;

ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seasons are public" ON public.seasons FOR SELECT USING (true);
CREATE POLICY "Admins insert seasons" ON public.seasons FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update seasons" ON public.seasons FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete seasons" ON public.seasons FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER seasons_updated_at BEFORE UPDATE ON public.seasons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.seasons (name, slug, theme, tagline, description, total_days, starts_at, ends_at)
VALUES (
  'Season 1', 'season-1', 'Rediscover Yourself',
  'Fifteen days to remember who you are outside the syllabus.',
  'CA UNWIND Season 1 is a 15-day online festival for CA students: small daily activities, one main creative challenge, and a community that celebrates every attempt.',
  15,
  '2026-08-01T18:00:00+05:30',
  '2026-08-16T23:59:00+05:30'
);

ALTER TABLE public.unwind_activities
  ADD COLUMN season_id uuid REFERENCES public.seasons(id) ON DELETE CASCADE,
  ADD COLUMN kind text NOT NULL DEFAULT 'Daily Unwind',
  ADD COLUMN icon text NOT NULL DEFAULT 'Sparkles',
  ADD COLUMN intro text NOT NULL DEFAULT '',
  ADD COLUMN why_it_exists text NOT NULL DEFAULT '',
  ADD COLUMN instructions text NOT NULL DEFAULT '',
  ADD COLUMN rules text[] NOT NULL DEFAULT '{}',
  ADD COLUMN estimated_minutes integer NOT NULL DEFAULT 10,
  ADD COLUMN difficulty text NOT NULL DEFAULT 'Easy',
  ADD COLUMN outcome text NOT NULL DEFAULT '',
  ADD COLUMN xp integer NOT NULL DEFAULT 50,
  ADD COLUMN accent text NOT NULL DEFAULT 'primary',
  ADD COLUMN submission_type text NOT NULL DEFAULT 'screenshot',
  ADD COLUMN caption_template text NOT NULL DEFAULT '',
  ADD COLUMN story_template_url text,
  ADD COLUMN opens_at timestamptz,
  ADD COLUMN closes_at timestamptz,
  ADD COLUMN sort_order integer NOT NULL DEFAULT 0;

UPDATE public.unwind_activities a
SET season_id = s.id,
    sort_order = t.i,
    kind = t.kind,
    icon = t.icon,
    title = COALESCE(NULLIF(a.title, ''), t.title),
    intro = t.intro,
    why_it_exists = t.why_it_exists,
    instructions = t.instructions,
    rules = ARRAY[
      'Do the activity for real — no shortcuts.',
      'Share it on your Instagram Story tagging ' || s.instagram_handle || ' with ' || s.default_hashtag || '.',
      'Upload a clear screenshot of the story as proof.',
      'Submit before the activity window closes.'
    ],
    estimated_minutes = t.minutes,
    difficulty = t.difficulty,
    outcome = t.outcome,
    xp = t.xp,
    accent = t.accent,
    caption_template = 'Day ' || a.day || ' of ' || s.name || ' — ' || t.kind || '. ' || s.default_hashtag || ' ' || s.instagram_handle,
    opens_at = s.starts_at + ((a.day - 1) * interval '1 day'),
    closes_at = s.starts_at + ((a.day - 1) * interval '1 day') + interval '47 hours 59 minutes'
FROM public.seasons s,
(
  VALUES
    (0, 'Morning Mission', 'Sunrise', 'Open the window, open the day', 'Five minutes of sunlight, stretching and one deep breath before any screen.', 'Exam season taught your body to wake up anxious. This teaches it to wake up gently.', 'Step outside or to a window within 30 minutes of waking. Stretch, breathe, no phone. Then capture one photo of your morning.', 5, 'Easy', 'Reset your nervous system after exam mode', 50, 'warm'),
    (1, 'Creative Sprint', 'Zap', 'Twenty minutes, one idea', 'Make something from today''s prompt — a reel, a doodle, a beat, a paragraph.', 'Creative confidence comes from volume, not perfection. Twenty minutes is enough to prove that.', 'Set a 20 minute timer, respond to today''s prompt in any medium, and post the result to your story.', 20, 'Medium', 'Rebuild creative confidence through volume, not perfection', 120, 'primary'),
    (2, 'Learning Capsule', 'Lightbulb', 'One idea outside the syllabus', 'A tiny capsule on money, design, storytelling or life — nothing examinable.', 'Curiosity should not need a mark sheet attached to it.', 'Read, watch or listen to one short thing outside the syllabus, then share the one line you are taking away.', 10, 'Easy', 'Curiosity that isn''t tied to marks', 80, 'gold'),
    (3, 'Reflection Zone', 'Feather', 'One honest line', 'Write a single true sentence about today. Nobody grades it.', 'Naming how the day felt is how you close it.', 'Write one honest sentence about today, screenshot it or write it on your story, and share.', 5, 'Easy', 'Self-awareness and closure after the attempt', 40, 'cool'),
    (4, 'Fun Break', 'Dices', 'Pure nonsense hour', 'Games, memes, dance breaks. Zero productivity permitted.', 'Joy does not have to earn its place in your day.', 'Do something completely unproductive and fun, alone or with people, and share a moment from it.', 15, 'Easy', 'Joy for the sake of joy', 60, 'pink')
) AS t(i, kind, icon, title, intro, why_it_exists, instructions, minutes, difficulty, outcome, xp, accent)
WHERE s.slug = 'season-1'
  AND a.mission_key ~ '^d\d+-m\d+$'
  AND t.i = (regexp_replace(a.mission_key, '^d\d+-m', ''))::int;

UPDATE public.unwind_activities a
SET season_id = s.id
FROM public.seasons s
WHERE s.slug = 'season-1' AND a.season_id IS NULL;

CREATE INDEX unwind_activities_season_day_idx ON public.unwind_activities (season_id, day, sort_order);