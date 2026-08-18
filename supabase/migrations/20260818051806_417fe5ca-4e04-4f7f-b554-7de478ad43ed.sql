-- 1. Owner-only read/delete of rsvps (drop ambiguous NULL ownership clause)
DROP POLICY IF EXISTS "Owners read rsvps" ON public.rsvps;
DROP POLICY IF EXISTS "Owners delete rsvps" ON public.rsvps;

CREATE POLICY "Owners read rsvps"
ON public.rsvps FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.guests g
  WHERE g.id = rsvps.guest_id AND g.owner_id = auth.uid()
));

CREATE POLICY "Owners delete rsvps"
ON public.rsvps FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.guests g
  WHERE g.id = rsvps.guest_id AND g.owner_id = auth.uid()
));

-- 2. Restrict inserts: must reference a real guest, with validated content
DROP POLICY IF EXISTS "Anyone can send an rsvp" ON public.rsvps;

CREATE POLICY "Invited guests can send an rsvp"
ON public.rsvps FOR INSERT TO anon, authenticated
WITH CHECK (
  guest_id IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.guests g WHERE g.id = rsvps.guest_id)
  AND attendance IN ('hadir', 'tidak_hadir', 'ragu')
  AND guest_count BETWEEN 0 AND 20
  AND char_length(guest_name) BETWEEN 2 AND 80
  AND char_length(message) <= 500
);

-- 3. Harden the guest lookup function (invitation links need this public lookup)
CREATE OR REPLACE FUNCTION public.get_guest_by_code(_code text)
RETURNS TABLE (id uuid, name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT g.id, g.name
  FROM public.guests g
  WHERE _code IS NOT NULL
    AND char_length(_code) BETWEEN 4 AND 12
    AND g.code = upper(_code)
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_guest_by_code(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_guest_by_code(text) TO anon, authenticated;