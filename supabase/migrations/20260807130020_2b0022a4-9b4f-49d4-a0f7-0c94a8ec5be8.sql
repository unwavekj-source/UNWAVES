-- 1. Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'team', 'participant');

-- 2. Roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Policies on user_roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can read all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

CREATE POLICY "Admins can grant roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can revoke roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Auto-assign participant role on signup
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'participant')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_default_role();

-- Backfill existing users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'participant' FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- 6. Submission review status
ALTER TABLE public.submissions
  ADD COLUMN status text NOT NULL DEFAULT 'approved',
  ADD COLUMN review_note text;

CREATE POLICY "Staff can review submissions"
  ON public.submissions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'team'));

CREATE POLICY "Admins can delete any submission"
  ON public.submissions FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Admin control of announcements
GRANT INSERT, UPDATE, DELETE ON public.announcements TO authenticated;

CREATE POLICY "Admins can create announcements"
  ON public.announcements FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update announcements"
  ON public.announcements FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete announcements"
  ON public.announcements FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Admins can correct participant passports (e.g. moderation)
CREATE POLICY "Admins can update any passport"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));