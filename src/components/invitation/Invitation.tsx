import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundLayer } from "./BackgroundLayer";
import { OrnamentLayer } from "./OrnamentLayer";
import { MusicPlayer } from "./MusicPlayer";
import { BottomNav } from "./BottomNav";
import { PageDeck, type DeckPage } from "./PageDeck";
import { OwnerAccess } from "./OwnerAccess";
import { INVITATION } from "@/lib/invitation-config";
import { PRELOAD_IMAGES } from "@/lib/assets";
import {
  CoupleSection,
  CountdownSection,
  EventSection,
  GiftSection,
  GreetingSection,
  OpeningSection,
  QuoteSection,
  RsvpSection,
  StorySection,
  ThanksSection,
} from "./sections";

export function Invitation({
  guestName,
  guestId,
}: {
  guestName: string;
  guestId: string | null;
}) {
  const [opened, setOpened] = useState(false);
  const goRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Once the invitation is unlocked, glide straight to the greeting page.
  useEffect(() => {
    if (!opened) return;
    const t = window.setTimeout(() => goRef.current?.(1), 260);
    return () => window.clearTimeout(t);
  }, [opened]);

  const pages: DeckPage[] = [
    {
      id: "opening",
      label: "Pembuka",
      render: () => (
        <OpeningSection guestName={guestName} opened={opened} onOpen={() => setOpened(true)} />
      ),
    },
    { id: "greeting", label: "Salam", render: () => <GreetingSection /> },
    { id: "quote", label: "Kutipan", render: () => <QuoteSection /> },
    { id: "couple", label: "Mempelai", render: () => <CoupleSection /> },
    { id: "akad", label: "Akad Nikah", render: () => <EventSection event={INVITATION.akad} /> },
    { id: "resepsi", label: "Resepsi", render: () => <EventSection event={INVITATION.resepsi} /> },
    { id: "countdown", label: "Hitung Mundur", render: () => <CountdownSection /> },
    { id: "story", label: "Love Story", render: () => <StorySection /> },
    { id: "gift", label: "Hadiah", render: () => <GiftSection /> },
    {
      id: "rsvp",
      label: "RSVP",
      render: () => <RsvpSection guestId={guestId} guestName={guestName} />,
    },
    { id: "thanks", label: "Penutup", render: () => <ThanksSection /> },
  ];

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      <BackgroundLayer />
      <MusicPlayer started={opened} />
      <PageDeck pages={pages} locked={!opened}>
        {({ active, token, go }) => {
          goRef.current = go;
          return (
            <>
              <OrnamentLayer token={token} />
              {opened ? (
                <BottomNav
                  pages={pages}
                  active={pages[active]!.id}
                  onSelect={(id) => go(pages.findIndex((page) => page.id === id))}
                />
              ) : null}
              <OwnerAccess />
            </>
          );
        }}
      </PageDeck>
      <Toaster position="top-center" />
    </main>
  );
}
