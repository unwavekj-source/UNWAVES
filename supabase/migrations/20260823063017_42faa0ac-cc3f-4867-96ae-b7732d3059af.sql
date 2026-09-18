-- ============================ site settings (CMS) ============================
CREATE TABLE public.site_settings (
  id text PRIMARY KEY DEFAULT 'main',
  hero_eyebrow text NOT NULL DEFAULT '',
  hero_heading text NOT NULL DEFAULT 'CA UNWIND',
  hero_highlight text NOT NULL DEFAULT '',
  hero_subheading text NOT NULL DEFAULT '',
  hero_tagline text NOT NULL DEFAULT '',
  cta_primary_label text NOT NULL DEFAULT 'Enter the festival',
  cta_primary_to text NOT NULL DEFAULT '/register',
  cta_secondary_label text NOT NULL DEFAULT 'See the journey',
  cta_secondary_to text NOT NULL DEFAULT '/journey',
  event_name text NOT NULL DEFAULT 'CA UNWIND',
  season_name text NOT NULL DEFAULT 'Season 1',
  event_description text NOT NULL DEFAULT '',
  event_status text NOT NULL DEFAULT 'upcoming',
  event_starts_at timestamptz,
  event_ends_at timestamptz,
  venue_info text NOT NULL DEFAULT 'Entirely online',
  important_instructions text NOT NULL DEFAULT '',
  countdown_target timestamptz,
  countdown_label text NOT NULL DEFAULT 'Gates open in',
  registration_status text NOT NULL DEFAULT 'open',
  registration_button_visible boolean NOT NULL DEFAULT true,
  registration_button_label text NOT NULL DEFAULT 'Register now',
  registration_url text,
  registration_limit integer NOT NULL DEFAULT 0,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  banner_enabled boolean NOT NULL DEFAULT false,
  banner_text text NOT NULL DEFAULT '',
  banner_cta_label text NOT NULL DEFAULT '',
  banner_cta_href text NOT NULL DEFAULT '',
  notices text[] NOT NULL DEFAULT '{}',
  stats jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured_note text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  contact_phone text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  youtube_url text NOT NULL DEFAULT '',
  linkedin_url text NOT NULL DEFAULT '',
  whatsapp_url text NOT NULL DEFAULT '',
  footer_note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_single_row CHECK (id = 'main'),
  CONSTRAINT site_settings_event_status CHECK (event_status IN ('upcoming','live','ended')),
  CONSTRAINT site_settings_registration_status CHECK (registration_status IN ('open','closed'))
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are public" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update site settings" ON public.site_settings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (
  id, hero_eyebrow, hero_heading, hero_highlight, hero_subheading, hero_tagline,
  event_description, event_status, event_starts_at, event_ends_at, countdown_target,
  important_instructions, registration_status, registration_button_label,
  banner_enabled, banner_text, notices, stats, contact_email, instagram_url, footer_note
) VALUES (
  'main',
  'Season 1 · 15 days',
  'CA',
  'UNWIND',
  'Digital Festival Night',
  '15 days of unwinding, creating and celebrating — right after your CA attempt.',
  'A 15-day online festival for CA students that begins right after every attempt — daily unwinds, creative challenges, community voting and recognition.',
  'upcoming',
  '2026-10-08T18:00:00+05:30',
  '2026-10-23T18:00:00+05:30',
  '2026-10-08T18:00:00+05:30',
  'Follow the official Instagram account, tag your stories and submit proof inside your festival lobby.',
  'open',
  'Register now',
  false,
  '',
  '{}',
  '[]'::jsonb,
  'hello@caunwind.com',
  'https://instagram.com/caunwind',
  'Built for CA students, by CA students.'
);

-- ============================== registrations ==============================
CREATE SEQUENCE IF NOT EXISTS public.registration_seq START 1001;

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  registration_no text NOT NULL UNIQUE DEFAULT ('CU1-R' || nextval('public.registration_seq')::text),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  ca_level text,
  college text,
  city text,
  consent boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'confirmed',
  verified boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'website',
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT registrations_status_check CHECK (status IN ('pending','confirmed','cancelled'))
);

CREATE UNIQUE INDEX registrations_email_unique ON public.registrations (lower(email));

GRANT SELECT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read registrations" ON public.registrations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));
CREATE POLICY "Staff update registrations" ON public.registrations
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));
CREATE POLICY "Admins delete registrations" ON public.registrations
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER registrations_updated_at BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ======================= guarded public registration =======================
CREATE OR REPLACE FUNCTION public.registration_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::int FROM public.registrations WHERE status <> 'cancelled';
$$;

REVOKE ALL ON FUNCTION public.registration_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.registration_count() TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_participant(
  _full_name text,
  _email text,
  _phone text DEFAULT NULL,
  _ca_level text DEFAULT NULL,
  _college text DEFAULT NULL,
  _city text DEFAULT NULL,
  _consent boolean DEFAULT true
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  s public.site_settings;
  taken integer;
  existing public.registrations;
  reg public.registrations;
  name_clean text := btrim(COALESCE(_full_name, ''));
  email_clean text := lower(btrim(COALESCE(_email, '')));
BEGIN
  SELECT * INTO s FROM public.site_settings WHERE id = 'main';

  IF s.id IS NULL OR s.registration_status <> 'open' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'closed');
  END IF;
  IF s.registration_opens_at IS NOT NULL AND now() < s.registration_opens_at THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'not_open_yet');
  END IF;
  IF s.registration_closes_at IS NOT NULL AND now() > s.registration_closes_at THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'closed');
  END IF;

  SELECT public.registration_count() INTO taken;
  IF COALESCE(s.registration_limit, 0) > 0 AND taken >= s.registration_limit THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'full');
  END IF;

  IF length(name_clean) < 2 OR length(name_clean) > 100 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_name');
  END IF;
  IF email_clean !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' OR length(email_clean) > 255 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_email');
  END IF;
  IF _phone IS NOT NULL AND length(btrim(_phone)) > 0 AND btrim(_phone) !~ '^[0-9+()\-[:space:]]{7,20}$' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_phone');
  END IF;
  IF _consent IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'consent_required');
  END IF;

  SELECT * INTO existing FROM public.registrations WHERE lower(email) = email_clean LIMIT 1;
  IF existing.id IS NOT NULL THEN
    RETURN jsonb_build_object(
      'ok', false, 'reason', 'duplicate',
      'registration_no', existing.registration_no,
      'full_name', existing.full_name
    );
  END IF;

  INSERT INTO public.registrations (user_id, full_name, email, phone, ca_level, college, city, consent)
  VALUES (
    auth.uid(), name_clean, email_clean,
    NULLIF(btrim(COALESCE(_phone, '')), ''),
    NULLIF(btrim(COALESCE(_ca_level, '')), ''),
    NULLIF(btrim(COALESCE(_college, '')), ''),
    NULLIF(btrim(COALESCE(_city, '')), ''),
    true
  )
  RETURNING * INTO reg;

  RETURN jsonb_build_object(
    'ok', true,
    'registration_no', reg.registration_no,
    'full_name', reg.full_name,
    'email', reg.email,
    'status', reg.status,
    'created_at', reg.created_at
  );
END;
$$;

REVOKE ALL ON FUNCTION public.register_participant(text, text, text, text, text, text, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_participant(text, text, text, text, text, text, boolean) TO anon, authenticated;

-- ============================== realtime ==============================
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations;