import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundLayer } from "./BackgroundLayer";
import { OrnamentLayer } from "./OrnamentLayer";
import { MusicPlayer } from "./MusicPlayer";
import { BottomNav } from "./BottomNav";
import { PageDeck, type DeckPage } from "./PageDeck";
import { HiddenAccess } from "./HiddenAccess";
import { AssetPreloader } from "./AssetPreloader";
import { InvitationProvider } from "./InvitationProvider";
import type { InvitationData } from "@/lib/invitation-data";
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

/** Fullscreen is best-effort: unsupported browsers simply continue as before. */
async function enterFullscreen() {
  try {
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    if (document.fullscreenElement) return;
    if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
  } catch {
    /* ignore — not supported or rejected */
  }
}

function InvitationInner({
  data,
  guestName,
  guestId,
}: {
  data: InvitationData;
  guestName: string;
  guestId: string | null;
}) {
  const [opened, setOpened] = useState(false);
  const goRef = useRef<((index: number) => void) | null>(null);

  const handleOpen = async () => {
    await enterFullscreen();
    setOpened(true);
  };

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
        <OpeningSection guestName={guestName} opened={opened} onOpen={handleOpen} />
      ),
    },
    { id: "greeting", label: "Salam", render: () => <GreetingSection /> },
    { id: "quote", label: "Kutipan", render: () => <QuoteSection /> },
    { id: "couple", label: "Mempelai", render: () => <CoupleSection /> },
    { id: "akad", label: "Akad Nikah", render: () => <EventSection event={data.akad} /> },
    { id: "resepsi", label: "Resepsi", render: () => <EventSection event={data.resepsi} /> },
    { id: "countdown", label: "Hitung Mundur", render: () => <CountdownSection /> },
    { id: "story", label: "Love Story", render: () => <StorySection /> },
    { id: "gift", label: "Hadiah", render: () => <GiftSection /> },
    {
      id: "rsvp",
      label: "RSVP",
      render: () => (
        <RsvpSection guestId={guestId} guestName={guestName} invitationId={data.id} />
      ),
    },
    { id: "thanks", label: "Penutup", render: () => <ThanksSection /> },
  ];

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      <BackgroundLayer />
      <MusicPlayer started={opened} src={data.musicUrl} />
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
              <HiddenAccess />
            </>
          );
        }}
      </PageDeck>
      <Toaster position="top-center" />
    </main>
  );
}

export function Invitation(props: {
  data: InvitationData;
  guestName: string;
  guestId: string | null;
}) {
  return (
    <InvitationProvider value={props.data}>
      <AssetPreloader
        images={[props.data.couplePhoto]}
        secondary={[props.data.groom.photo, props.data.bride.photo, props.data.gift.qris]}
      >
        <InvitationInner {...props} />
      </AssetPreloader>
    </InvitationProvider>
  );
}
