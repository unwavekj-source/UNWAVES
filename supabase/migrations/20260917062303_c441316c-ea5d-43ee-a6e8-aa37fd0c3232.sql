REVOKE EXECUTE ON FUNCTION public.assign_default_role() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_unwind_review() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_public_profile() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_vote_count() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;