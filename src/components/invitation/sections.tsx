import type { ReactNode } from "react";
import { ChevronDown, Copy, MapPin } from "lucide-react";
import { toast } from "sonner";
import { ASSETS } from "@/lib/assets";
import { INVITATION, LOVE_STORY } from "@/lib/invitation-config";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { RsvpForm } from "./RsvpForm";

export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center overflow-x-hidden px-6 pt-16 pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-center ${className}`}
    >
      <div className="w-full max-w-md min-w-0">{children}</div>
    </div>
  );
}

function Eyebrow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">{children}</p>
    </Reveal>
  );
}

function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay} variant="scale" className="mx-auto my-4 w-28">
      <div className="gold-line" />
    </Reveal>
  );
}

/* ── 1. Opening ─────────────────────────────────────────── */
export function OpeningSection({
  guestName,
  opened,
  onOpen,
}: {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <PageShell>
      <Eyebrow delay={100}>The Wedding Of</Eyebrow>

      <Reveal delay={220} variant="scale" className="mt-3">
        <h1 className="font-display leading-[1.02] font-medium text-balance break-words text-sage-deep">
          <span className="block text-[clamp(2.4rem,13vw,3.75rem)]">{INVITATION.groom.name}</span>
          <span className="my-0.5 block font-script text-[clamp(1.6rem,8vw,2.25rem)] text-gold">
            &amp;
          </span>
          <span className="block text-[clamp(2.4rem,13vw,3.75rem)]">{INVITATION.bride.name}</span>
        </h1>
      </Reveal>

      <Reveal delay={340} className="mt-7">
        <img
          src={ASSETS.couple}
          alt={`${INVITATION.groom.name} dan ${INVITATION.bride.name}`}
          className="mx-auto h-[27dvh] w-auto max-w-[70%] object-contain"
          style={{ animation: "photo-in 800ms cubic-bezier(0.22,1,0.36,1) both" }}
        />
      </Reveal>

      <Reveal delay={520} className="mt-7">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          9 September 2026
        </p>
      </Reveal>

      <Reveal delay={620} variant="bottom" className="mt-7">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Kepada Yth.</p>
        <p className="mt-1.5 font-display text-2xl break-words text-sage-deep">{guestName}</p>
      </Reveal>

      {opened ? (
        <Reveal delay={760} className="mt-8">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-[10px] tracking-[0.3em] uppercase">Geser ke atas</span>
            <ChevronDown
              className="h-4 w-4 rotate-180"
              style={{ animation: "soft-float 2s infinite" }}
            />
          </div>
        </Reveal>
      ) : (
        <Reveal delay={760} variant="bottom" className="mt-8">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-primary px-8 py-3.5 text-[11px] tracking-[0.28em] text-primary-foreground uppercase shadow-xl transition-transform active:scale-95"
          >
            Buka Undangan
          </button>
        </Reveal>
      )}
    </PageShell>
  );
}

/* ── 2. Greeting ────────────────────────────────────────── */
export function GreetingSection() {
  return (
    <PageShell>
      <Eyebrow delay={80}>Bismillahirrahmanirrahim</Eyebrow>
      <Divider delay={180} />
      <Reveal delay={260} variant="scale">
        <p className="font-display text-2xl text-sage-deep">Assalamu&apos;alaikum</p>
        <p className="font-display text-2xl text-sage-deep">Warahmatullahi Wabarakatuh</p>
      </Reveal>
      <Reveal delay={380} className="mt-5">
        <img
          src={ASSETS.couple}
          alt={`${INVITATION.groom.name} dan ${INVITATION.bride.name}`}
          className="mx-auto h-[26dvh] w-auto max-w-[70%] object-contain"
          style={{ animation: "photo-in 800ms cubic-bezier(0.22,1,0.36,1) both" }}
        />
      </Reveal>
      <Reveal delay={520} className="mt-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i
          untuk menghadiri acara pernikahan kami.
        </p>
      </Reveal>
    </PageShell>
  );
}

/* ── 3. Quote ───────────────────────────────────────────── */
export function QuoteSection() {
  return (
    <PageShell>
      <Eyebrow delay={80}>Firman Allah SWT</Eyebrow>
      <Divider delay={180} />
      <Reveal delay={240} variant="scale">
        <p
          dir="rtl"
          lang="ar"
          className="text-[1.15rem] leading-[2.4] text-sage-deep"
          style={{ fontFamily: "'Traditional Arabic', 'Amiri', 'Scheherazade New', serif" }}
        >
          وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا
          وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ
          يَّتَفَكَّرُوْنَ
        </p>
      </Reveal>
      <Reveal delay={400} className="mt-5">
        <p className="font-display text-base leading-relaxed text-sage-deep italic">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari
          jenismu sendiri, supaya kamu mendapat ketenangan hati dan dijadikan-Nya kasih sayang di
          antara kamu.&rdquo;
        </p>
      </Reveal>
      <Divider delay={520} />
      <Reveal delay={600}>
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          (QS. Ar-Rum Ayat 21)
        </p>
      </Reveal>
    </PageShell>
  );
}

/* ── 4. Couple ──────────────────────────────────────────── */
function PersonCard({
  photo,
  name,
  father,
  mother,
  role,
  delay,
  variant,
}: {
  photo: string;
  name: string;
  father: string;
  mother: string;
  role: string;
  delay: number;
  variant: "left" | "right";
}) {
  return (
    <Reveal
      delay={delay}
      variant={variant}
      className="glass-card flex flex-col items-center rounded-3xl px-5 py-4 text-center"
    >
      <div className="mb-3 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gold/60 shadow-md">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3 className="font-display text-xl leading-tight text-sage-deep">{name}</h3>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {role} dari
          <br />
          {father}
          <br />
          &amp; {mother}
        </p>
      </div>
    </Reveal>
  );
}

export function CoupleSection() {
  return (
    <PageShell>
      <Eyebrow delay={60}>Mempelai</Eyebrow>
      <Divider delay={160} />
      <div className="space-y-4">
        <PersonCard
          photo={ASSETS.groom}
          name={INVITATION.groom.full}
          father={INVITATION.groom.father}
          mother={INVITATION.groom.mother}
          role="Putra"
          delay={260}
          variant="left"
        />
        <Reveal delay={380} variant="scale" className="mx-auto w-16">
          <div className="gold-line" />
        </Reveal>
        <PersonCard
          photo={ASSETS.bride}
          name={INVITATION.bride.full}
          father={INVITATION.bride.father}
          mother={INVITATION.bride.mother}
          role="Putri"
          delay={460}
          variant="right"
        />
      </div>
    </PageShell>
  );
}

/* ── 5 & 6. Event ───────────────────────────────────────── */
export function EventSection({ event }: { event: typeof INVITATION.akad }) {
  const addressLines = event.address.split(",").map((line) => line.trim());
  return (
    <PageShell>
      <Eyebrow delay={60}>Save The Date</Eyebrow>
      <Reveal delay={160}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">{event.title}</h2>
      </Reveal>
      <Divider delay={260} />
      <Reveal delay={340} variant="scale" className="glass-card mx-auto rounded-3xl px-5 py-5">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{event.day}</p>
        <p className="my-1 font-display text-[3.25rem] leading-none text-sage-deep">{event.date}</p>
        <p className="text-sm text-muted-foreground">{event.month}</p>
        <div className="gold-line my-3.5" />
        <p className="text-sm font-medium text-sage-deep">{event.time}</p>
        <p className="mt-2.5 font-display text-xl text-sage-deep">{event.place}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
      <Reveal delay={500} variant="bottom" className="mt-4">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[10px] tracking-[0.24em] text-primary-foreground uppercase shadow-lg transition-transform active:scale-95"
        >
          <MapPin className="h-3.5 w-3.5" /> Kunjungi Google Maps
        </a>
      </Reveal>
    </PageShell>
  );
}

/* ── 7. Countdown ───────────────────────────────────────── */
export function CountdownSection() {
  return (
    <PageShell>
      <Reveal delay={150}>
        <h2 className="font-display text-4xl text-sage-deep">Menuju Hari Bahagia</h2>
      </Reveal>
      <Divider delay={250} />
      <Reveal delay={340} variant="scale">
        <Countdown date={INVITATION.weddingDate} />
      </Reveal>
      <Reveal delay={520} className="mt-6">
        <p className="text-sm text-muted-foreground">
          Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
      </Reveal>
    </PageShell>
  );
}

/* ── 8. Love Story ──────────────────────────────────────── */
export function StorySection() {
  return (
    <PageShell>
      <Eyebrow delay={60}>Perjalanan Kami</Eyebrow>
      <Reveal delay={150}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">Love Story</h2>
      </Reveal>
      <Divider delay={250} />
      <ul className="space-y-3 text-left">
        {LOVE_STORY.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            delay={330 + index * 130}
            variant="left"
            className="glass-card flex items-center gap-4 rounded-2xl px-5 py-3"
          >
            <span className="font-display text-xl text-gold">{item.year}</span>
            <span className="min-w-0">
              <span className="block font-display text-lg text-sage-deep">{item.title}</span>
              <span className="block text-xs text-muted-foreground">{item.subtitle}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}

/* ── 9. Gift ────────────────────────────────────────────── */
export function GiftSection() {
  const account = "1234567890";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account);
      toast.success("Nomor rekening disalin");
    } catch {
      toast.error("Gagal menyalin");
    }
  };

  return (
    <PageShell>
      <Eyebrow delay={60}>Wedding Gift</Eyebrow>
      <Reveal delay={150}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">Tanda Kasih</h2>
      </Reveal>
      <Divider delay={250} />
      <Reveal delay={330} variant="scale" className="glass-card mx-auto rounded-3xl p-5">
        <img
          src={ASSETS.qris}
          alt="Kode QRIS untuk hadiah pernikahan"
          className="mx-auto w-40 rounded-xl"
        />
        <p className="mt-3 text-xs text-muted-foreground">Scan QRIS untuk memberi tanda kasih</p>
      </Reveal>
      <Reveal delay={480} variant="bottom" className="mt-4">
        <button
          type="button"
          onClick={copy}
          className="glass-card inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-sage-deep"
        >
          <Copy className="h-3.5 w-3.5" /> {account} &middot; a.n. Galium
        </button>
      </Reveal>
    </PageShell>
  );
}

/* ── 10. RSVP ───────────────────────────────────────────── */
export function RsvpSection({ guestId, guestName }: { guestId: string | null; guestName: string }) {
  return (
    <PageShell>
      <Eyebrow delay={60}>Konfirmasi Kehadiran</Eyebrow>
      <Reveal delay={140}>
        <h2 className="mt-1 mb-4 font-display text-4xl text-sage-deep">RSVP</h2>
      </Reveal>
      <RsvpForm guestId={guestId} guestName={guestName} />
    </PageShell>
  );
}

/* ── 11. Thanks ─────────────────────────────────────────── */
export function ThanksSection() {
  return (
    <PageShell>
      <Reveal delay={120} variant="scale">
        <h2 className="font-display text-[clamp(2rem,10vw,2.75rem)] tracking-[0.06em] text-sage-deep">
          Terima Kasih
        </h2>
      </Reveal>
      <Divider delay={280} />
      <Reveal delay={420}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir dan memberikan doa restu kepada kami.
        </p>
      </Reveal>
      <Reveal delay={600} className="mt-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Dengan penuh cinta,
        </p>
      </Reveal>
      <Reveal delay={760} variant="scale" className="mt-2">
        <p className="font-display text-[clamp(1.9rem,9vw,2.5rem)] leading-tight text-sage-deep">
          {INVITATION.groom.name}
          <span className="mx-2 font-script text-gold">&amp;</span>
          {INVITATION.bride.name}
        </p>
      </Reveal>
      <Reveal delay={940} className="mt-5">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Terima kasih atas doa, restu, dan kehadiran Anda.
        </p>
      </Reveal>
      <Reveal delay={1300} className="mt-12 flex flex-col items-center">
        <img
          src={ASSETS.logo}
          alt="Inspire Wedstory"
          className="mb-2 h-8 w-auto opacity-50"
        />
        <p className="text-[9px] tracking-[0.22em] text-sage-deep/50 uppercase">
          Inspire Wedstory
        </p>
        <p className="mt-0.5 text-[8px] tracking-[0.18em] text-sage-deep/40">
          Your Love. Your Story.
        </p>
        <p className="mt-0.5 text-[8px] tracking-[0.18em] text-sage-deep/40">
          Made by Inspire Wedstory. &middot; © 2026
        </p>
      </Reveal>
    </PageShell>
  );
}
