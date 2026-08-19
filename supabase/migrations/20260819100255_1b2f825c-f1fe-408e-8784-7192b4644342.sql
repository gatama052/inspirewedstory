CREATE POLICY "Admins read invitation media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'invitation-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins upload invitation media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'invitation-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update invitation media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'invitation-media' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'invitation-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete invitation media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'invitation-media' AND public.has_role(auth.uid(), 'admin'));