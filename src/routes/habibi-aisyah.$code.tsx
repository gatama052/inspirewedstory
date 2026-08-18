import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Invitation } from "@/components/invitation/Invitation";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/habibi-aisyah/$code")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Habibi & Aisyah — Undangan Pernikahan" },
      {
        name: "description",
        content:
          "Undangan pernikahan Habibi & Aisyah, Rabu 9 September 2026. Konfirmasi kehadiran melalui link pribadi Anda.",
      },
      { property: "og:title", content: "Habibi & Aisyah — Undangan Pernikahan" },
      {
        property: "og:description",
        content: "Undangan pribadi untuk hari bahagia kami, 9 September 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PersonalInvitation,
});

function PersonalInvitation() {
  const { code } = Route.useParams();
  const [guest, setGuest] = useState<{ id: string | null; name: string }>({
    id: null,
    name: "Tamu Undangan",
  });

  useEffect(() => {
    let cancelled = false;
    void supabase
      .rpc("get_guest_by_code", { _code: code })
      .then(({ data }) => {
        const row = Array.isArray(data) ? data[0] : null;
        if (!cancelled && row) setGuest({ id: row.id, name: row.name });
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return <Invitation guestName={guest.name} guestId={guest.id} />;
}
