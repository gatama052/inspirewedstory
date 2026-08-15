import { createFileRoute } from "@tanstack/react-router";
import { Invitation } from "@/components/invitation/Invitation";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Galium & Aiktimal — Undangan Pernikahan" },
      {
        name: "description",
        content:
          "Undangan pernikahan Galium & Aiktimal, Sabtu 15 Agustus 2026. Akad nikah, resepsi, lokasi, dan konfirmasi kehadiran.",
      },
      { property: "og:title", content: "Galium & Aiktimal — Undangan Pernikahan" },
      {
        property: "og:description",
        content: "Dengan penuh kebahagiaan kami mengundang Anda di hari pernikahan kami.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const params =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const to = params?.get("to")?.trim();

  return <Invitation guestName={to && to.length > 1 ? to : "Tamu Undangan"} guestId={null} />;
}
