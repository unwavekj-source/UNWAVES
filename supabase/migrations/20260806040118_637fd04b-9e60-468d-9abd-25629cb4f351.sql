CREATE POLICY "Participants can view festival media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'festival-media');

CREATE POLICY "Participants can upload own festival media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'festival-media' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Participants can update own festival media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'festival-media' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Participants can delete own festival media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'festival-media' AND (storage.foldername(name))[1] = auth.uid()::text);