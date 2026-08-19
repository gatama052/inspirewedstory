-- ROLES ---------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- CLIENTS -------------------------------------------------------------
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients read own record" ON public.clients
  FOR SELECT TO authenticated USING (auth_user_id = auth.uid());
CREATE POLICY "Admins manage clients" ON public.clients
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- INVITATIONS ---------------------------------------------------------
CREATE TABLE public.invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  theme text NOT NULL DEFAULT 'sage-romance',
  music_url text NOT NULL DEFAULT '/media/Kabagyan.mp3',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.invitations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invitations TO authenticated;
GRANT ALL ON public.invitations TO service_role;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view invitations" ON public.invitations
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage invitations" ON public.invitations
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER invitations_updated_at BEFORE UPDATE ON public.invitations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.owns_invitation(_invitation_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.invitations i
    JOIN public.clients c ON c.id = i.client_id
    WHERE i.id = _invitation_id AND c.auth_user_id = auth.uid()
  )
$$;
REVOKE EXECUTE ON FUNCTION public.owns_invitation(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.owns_invitation(uuid) TO authenticated, service_role;

-- INVITATION CONTENT --------------------------------------------------
CREATE TABLE public.invitation_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id uuid NOT NULL UNIQUE REFERENCES public.invitations(id) ON DELETE CASCADE,
  groom_name text NOT NULL DEFAULT '',
  groom_full_name text NOT NULL DEFAULT '',
  groom_father text NOT NULL DEFAULT '',
  groom_mother text NOT NULL DEFAULT '',
  groom_photo_url text NOT NULL DEFAULT '/media/Profil_mempelai_pria.png',
  bride_name text NOT NULL DEFAULT '',
  bride_full_name text NOT NULL DEFAULT '',
  bride_father text NOT NULL DEFAULT '',
  bride_mother text NOT NULL DEFAULT '',
  bride_photo_url text NOT NULL DEFAULT '/media/Profil_mempelai_wanita.png',
  couple_photo_url text NOT NULL DEFAULT '/media/Poto_mempelai.png',
  opening_title text NOT NULL DEFAULT 'The Wedding Of',
  opening_greeting text NOT NULL DEFAULT 'Yth. Bapak/Ibu/Saudara/i',
  opening_date_label text NOT NULL DEFAULT '',
  wedding_date timestamptz NOT NULL DEFAULT now(),
  akad_title text NOT NULL DEFAULT 'Akad Nikah',
  akad_day text NOT NULL DEFAULT '',
  akad_date text NOT NULL DEFAULT '',
  akad_month text NOT NULL DEFAULT '',
  akad_time text NOT NULL DEFAULT '',
  akad_place text NOT NULL DEFAULT '',
  akad_address text NOT NULL DEFAULT '',
  akad_maps_url text NOT NULL DEFAULT '',
  reception_title text NOT NULL DEFAULT 'Resepsi',
  reception_day text NOT NULL DEFAULT '',
  reception_date text NOT NULL DEFAULT '',
  reception_month text NOT NULL DEFAULT '',
  reception_time text NOT NULL DEFAULT '',
  reception_place text NOT NULL DEFAULT '',
  reception_address text NOT NULL DEFAULT '',
  reception_maps_url text NOT NULL DEFAULT '',
  quote_arabic text NOT NULL DEFAULT '',
  quote_translation text NOT NULL DEFAULT '',
  quote_source text NOT NULL DEFAULT '',
  love_story jsonb NOT NULL DEFAULT '[]'::jsonb,
  gift_bank text NOT NULL DEFAULT '',
  gift_account text NOT NULL DEFAULT '',
  gift_holder text NOT NULL DEFAULT '',
  gift_address_name text NOT NULL DEFAULT '',
  gift_address text NOT NULL DEFAULT '',
  qris_url text NOT NULL DEFAULT '/media/QRIS.jpg',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.invitation_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invitation_content TO authenticated;
GRANT ALL ON public.invitation_content TO service_role;
ALTER TABLE public.invitation_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view invitation content" ON public.invitation_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage invitation content" ON public.invitation_content
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER invitation_content_updated_at BEFORE UPDATE ON public.invitation_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- INVITATION PHOTOS ---------------------------------------------------
CREATE TABLE public.invitation_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id uuid NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  type text NOT NULL DEFAULT 'gallery',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.invitation_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invitation_photos TO authenticated;
GRANT ALL ON public.invitation_photos TO service_role;
ALTER TABLE public.invitation_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view invitation photos" ON public.invitation_photos
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage invitation photos" ON public.invitation_photos
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- GUESTS / RSVPS MIGRATION -------------------------------------------
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS invitation_id uuid REFERENCES public.invitations(id) ON DELETE CASCADE;
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS invitation_id uuid REFERENCES public.invitations(id) ON DELETE CASCADE;

DO $$
DECLARE v_user uuid; v_client uuid; v_inv uuid;
BEGIN
  SELECT id INTO v_user FROM auth.users WHERE email = 'galiumaiktimal09@gmail.com' LIMIT 1;
  IF v_user IS NULL THEN
    SELECT owner_id INTO v_user FROM public.guests LIMIT 1;
  END IF;
  IF v_user IS NOT NULL THEN
    INSERT INTO public.clients (auth_user_id, name, email)
    VALUES (v_user, 'Habibi & Aisyah', COALESCE((SELECT email FROM auth.users WHERE id = v_user), 'client@inspirewedstory.id'))
    ON CONFLICT (auth_user_id) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_client;

    INSERT INTO public.invitations (client_id, slug) VALUES (v_client, 'habibi-aisyah')
    ON CONFLICT (slug) DO UPDATE SET client_id = EXCLUDED.client_id
    RETURNING id INTO v_inv;

    INSERT INTO public.invitation_content (
      invitation_id, groom_name, groom_full_name, groom_father, groom_mother,
      bride_name, bride_full_name, bride_father, bride_mother,
      opening_date_label, wedding_date,
      akad_day, akad_date, akad_month, akad_time, akad_place, akad_address, akad_maps_url,
      reception_day, reception_date, reception_month, reception_time, reception_place, reception_address, reception_maps_url,
      quote_arabic, quote_translation, quote_source, love_story,
      gift_bank, gift_account, gift_holder, gift_address_name, gift_address
    ) VALUES (
      v_inv, 'Habibi', 'Muhammad Habibi', 'Bapak Ahmad Pratama', 'Ibu Nur Aisyah',
      'Aisyah', 'Aisyah Humaira', 'Bapak Muhammad Fadli', 'Ibu Siti Rahma',
      '9 September 2026', '2026-09-09T08:00:00+07:00',
      'Rabu', '09', 'September 2026', '08.00 WIB', 'Masjid Al-Hikmah',
      'Jl. Melati Raya No. 12, Kecamatan Sukamaju, Kabupaten Kediri, Jawa Timur',
      'https://www.google.com/maps/search/?api=1&query=Masjid+Al-Hikmah+Jl.+Melati+Raya+No.+12+Kediri+Jawa+Timur',
      'Rabu', '09', 'September 2026', '10.00 – 20.00 WIB', 'Kediaman Mempelai Wanita',
      'Jl. Melati Raya No. 12, Kecamatan Sukamaju, Kabupaten Kediri, Jawa Timur',
      'https://www.google.com/maps/search/?api=1&query=Jl.+Melati+Raya+No.+12+Sukamaju+Kediri+Jawa+Timur',
      'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ',
      'Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri, supaya kamu mendapat ketenangan hati dan dijadikan-Nya kasih sayang di antara kamu.',
      'QS. Ar-Rum Ayat 21',
      '[{"title":"The Beginning","subtitle":"Pertama Bertemu","year":"2021","description":"Pertemuan sederhana yang tidak direncanakan, namun meninggalkan kesan mendalam."},{"title":"The Journey","subtitle":"Mulai Mengenal","year":"2022","description":"Saling mengenal lebih dalam, melewati suka duka, dan tumbuh bersama."},{"title":"The Promise","subtitle":"Memutuskan Bersama","year":"2025","description":"Sebuah janji untuk melangkah lebih serius menuju jenjang yang diridhoi."},{"title":"The Day","subtitle":"Hari Pernikahan","year":"2026","description":"Hari yang kami nantikan, menyatukan dua hati dalam ikatan yang suci."}]'::jsonb,
      'Bank BCA', '1234567890', 'Muhammad Habibi', 'Muhammad Habibi & Aisyah Humaira',
      'Jl. Melati Raya No. 12, Kecamatan Sukamaju, Kabupaten Kediri, Jawa Timur 64111'
    ) ON CONFLICT (invitation_id) DO NOTHING;

    UPDATE public.guests SET invitation_id = v_inv WHERE invitation_id IS NULL;
    UPDATE public.rsvps r SET invitation_id = g.invitation_id FROM public.guests g WHERE g.id = r.guest_id AND r.invitation_id IS NULL;
  END IF;
END $$;

DELETE FROM public.rsvps WHERE invitation_id IS NULL;
DELETE FROM public.guests WHERE invitation_id IS NULL;
ALTER TABLE public.guests ALTER COLUMN invitation_id SET NOT NULL;
ALTER TABLE public.rsvps ALTER COLUMN invitation_id SET NOT NULL;
ALTER TABLE public.rsvps ALTER COLUMN guest_id SET NOT NULL;
DROP POLICY IF EXISTS "Owners manage their guests" ON public.guests;
DROP POLICY IF EXISTS "Owners read rsvps" ON public.rsvps;
DROP POLICY IF EXISTS "Owners delete rsvps" ON public.rsvps;
DROP POLICY IF EXISTS "Invited guests can send an rsvp" ON public.rsvps;
ALTER TABLE public.guests DROP COLUMN IF EXISTS owner_id;
CREATE UNIQUE INDEX IF NOT EXISTS guests_invitation_code_key ON public.guests (invitation_id, upper(code));

CREATE POLICY "Owners manage their guests" ON public.guests
  FOR ALL TO authenticated
  USING (public.owns_invitation(invitation_id) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.owns_invitation(invitation_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Owners read rsvps" ON public.rsvps
  FOR SELECT TO authenticated
  USING (public.owns_invitation(invitation_id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners delete rsvps" ON public.rsvps
  FOR DELETE TO authenticated
  USING (public.owns_invitation(invitation_id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Invited guests can send an rsvp" ON public.rsvps
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.guests g WHERE g.id = rsvps.guest_id AND g.invitation_id = rsvps.invitation_id)
    AND attendance = ANY (ARRAY['hadir','tidak_hadir','ragu'])
    AND guest_count >= 0 AND guest_count <= 20
    AND char_length(guest_name) BETWEEN 2 AND 80
    AND char_length(message) <= 500
  );

-- GUEST LOOKUP --------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_guest_by_code(text);
CREATE OR REPLACE FUNCTION public.get_guest_by_code(_slug text, _code text)
RETURNS TABLE(id uuid, name text, invitation_id uuid)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT g.id, g.name, g.invitation_id
  FROM public.guests g
  JOIN public.invitations i ON i.id = g.invitation_id
  WHERE _code IS NOT NULL AND char_length(_code) BETWEEN 4 AND 12
    AND i.slug = lower(_slug) AND upper(g.code) = upper(_code)
  LIMIT 1
$$;
REVOKE EXECUTE ON FUNCTION public.get_guest_by_code(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_guest_by_code(text, text) TO anon, authenticated, service_role;