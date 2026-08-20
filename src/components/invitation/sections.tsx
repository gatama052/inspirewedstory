import { useState, type ReactNode } from "react";
import { ChevronDown, Copy, Gift, MapPin } from "lucide-react";
import { toast } from "sonner";
import { ASSETS } from "@/lib/assets";
import type { EventInfo } from "@/lib/invitation-data";
import { useInvitation } from "./InvitationProvider";
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

/**
 * Images fade in only once decoded, so nothing pops in half-painted while a
 * page transition is still running.
 */
export function SmoothImage({
  src,
  alt,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      onLoad={() => setLoaded(true)}
      ref={(el) => {
        if (el?.complete) setLoaded(true);
      }}
      className={`${className} transition-opacity duration-500 ease-out`}
      style={{ ...style, opacity: loaded ? undefined : 0 }}
    />
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
  const data = useInvitation();
  return (
    <PageShell>
      <Eyebrow delay={100}>{data.opening.title}</Eyebrow>

      <Reveal delay={220} variant="scale" className="mt-3">
        <h1 className="font-display leading-[1.02] font-medium text-balance break-words text-sage-deep">
          <span className="block text-[clamp(2.4rem,13vw,3.75rem)]">{data.groom.name}</span>
          <span className="my-0.5 block font-script text-[clamp(1.6rem,8vw,2.25rem)] text-gold">
            &amp;
          </span>
          <span className="block text-[clamp(2.4rem,13vw,3.75rem)]">{data.bride.name}</span>
        </h1>
      </Reveal>

      <Reveal delay={340} className="mt-7">
        <SmoothImage
          src={data.couplePhoto}
          alt={`${data.groom.name} dan ${data.bride.name}`}
          className="mx-auto h-[27dvh] w-auto max-w-[70%] object-contain"
          style={{ animation: "photo-in 800ms cubic-bezier(0.22,1,0.36,1) both" }}
        />
      </Reveal>

      <Reveal delay={520} className="mt-7">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          {data.opening.dateLabel}
        </p>
      </Reveal>

      <Reveal delay={620} variant="bottom" className="mt-7">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{data.opening.greeting}</p>
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
  const data = useInvitation();
  return (
    <PageShell>
      <Eyebrow delay={80}>Bismillahirrahmanirrahim</Eyebrow>
      <Divider delay={180} />
      <Reveal delay={260} variant="scale">
        <p className="font-display text-2xl text-sage-deep">Assalamu&apos;alaikum</p>
        <p className="font-display text-2xl text-sage-deep">Warahmatullahi Wabarakatuh</p>
      </Reveal>
      <Reveal delay={380} className="mt-5">
        <SmoothImage
          src={data.couplePhoto}
          alt={`${data.groom.name} dan ${data.bride.name}`}
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
  const data = useInvitation();
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
          {data.quote.arabic}
        </p>
      </Reveal>
      <Reveal delay={400} className="mt-5">
        <p className="font-display text-base leading-relaxed text-sage-deep italic">
          &ldquo;{data.quote.translation}&rdquo;
        </p>
      </Reveal>
      <Divider delay={520} />
      <Reveal delay={600}>
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          ({data.quote.source})
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
        <SmoothImage src={photo} alt={name} className="h-full w-full object-cover" />
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
  const data = useInvitation();
  return (
    <PageShell>
      <Eyebrow delay={60}>Mempelai</Eyebrow>
      <Divider delay={160} />
      <div className="space-y-4">
        <PersonCard
          photo={data.groom.photo}
          name={data.groom.full}
          father={data.groom.father}
          mother={data.groom.mother}
          role="Putra"
          delay={260}
          variant="left"
        />
        <Reveal delay={380} variant="scale" className="mx-auto w-16">
          <div className="gold-line" />
        </Reveal>
        <PersonCard
          photo={data.bride.photo}
          name={data.bride.full}
          father={data.bride.father}
          mother={data.bride.mother}
          role="Putri"
          delay={460}
          variant="right"
        />
      </div>
    </PageShell>
  );
}

/* ── 5 & 6. Event ───────────────────────────────────────── */
export function EventSection({ event }: { event: EventInfo }) {
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
  const data = useInvitation();
  return (
    <PageShell>
      <Reveal delay={150}>
        <h2 className="font-display text-4xl text-sage-deep">Menuju Hari Bahagia</h2>
      </Reveal>
      <Divider delay={250} />
      <Reveal delay={340} variant="scale">
        <Countdown date={data.weddingDate} />
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
  const data = useInvitation();
  return (
    <PageShell>
      <Reveal delay={150}>
        <h2 className="font-display text-4xl text-sage-deep">Love Story</h2>
      </Reveal>
      <Divider delay={250} />
      <ul className="space-y-2.5 text-left">
        {data.loveStory.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            delay={330 + index * 130}
            variant="left"
            className="glass-card flex items-start gap-4 rounded-2xl px-5 py-3"
          >
            <span className="mt-0.5 font-display text-xl text-gold">{item.year}</span>
            <span className="min-w-0">
              <span className="block font-display text-lg leading-tight text-sage-deep">
                {item.title}
              </span>
              <span className="block text-[11px] tracking-[0.14em] text-gold/80 uppercase">
                {item.subtitle}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </span>
            </span>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}

/* ── 9. Gift ────────────────────────────────────────────── */
type GiftTab = "qris" | "bank" | "kado";

export function GiftSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<GiftTab>("qris");
  const gift = useInvitation().gift;

  const copy = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(message);
    } catch {
      toast.error("Gagal menyalin");
    }
  };

  const tabs: { id: GiftTab; label: string }[] = [
    { id: "qris", label: "QRIS" },
    { id: "bank", label: "Transfer Bank" },
    { id: "kado", label: "Kirim Kado" },
  ];

  return (
    <PageShell>
      <Reveal delay={120}>
        <h2 className="font-display text-4xl text-sage-deep">Wedding Gift</h2>
      </Reveal>
      <Divider delay={220} />
      <Reveal delay={300}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Doa dan restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, apabila memberi
          merupakan ungkapan tanda kasih Anda, kami dengan senang hati menyediakan pilihan kado
          secara digital.
        </p>
      </Reveal>

      {!open ? (
        <Reveal delay={440} variant="bottom" className="mt-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[11px] tracking-[0.26em] text-primary-foreground uppercase shadow-lg transition-transform active:scale-95"
          >
            <Gift className="h-3.5 w-3.5" /> Wedding Gift
          </button>
        </Reveal>
      ) : (
        <Reveal delay={60} variant="bottom" className="mt-5">
          <div className="glass-card mx-auto rounded-3xl p-4">
            <div className="mb-4 flex items-center justify-center gap-1.5">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-full px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-colors ${
                    tab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {tab === "qris" ? (
              <div>
                <SmoothImage
                  src={gift.qris}
                  alt="Kode QRIS untuk hadiah pernikahan"
                  className="mx-auto w-40 rounded-xl"
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  Scan kode QRIS di atas melalui aplikasi pembayaran Anda.
                </p>
              </div>
            ) : null}

            {tab === "bank" ? (
              <div>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {gift.bank}
                </p>
                <p className="my-1.5 font-display text-2xl tracking-wide text-sage-deep">
                  {gift.account}
                </p>
                <p className="text-xs text-muted-foreground">a.n. {gift.holder}</p>
                <button
                  type="button"
                  onClick={() => copy(gift.account, "✓ Nomor rekening berhasil disalin")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[10px] tracking-[0.22em] text-primary-foreground uppercase transition-transform active:scale-95"
                >
                  <Copy className="h-3.5 w-3.5" /> Salin Nomor Rekening
                </button>
              </div>
            ) : null}

            {tab === "kado" ? (
              <div>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Alamat Pengiriman
                </p>
                <p className="mt-1.5 font-display text-lg text-sage-deep">{gift.addressName}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{gift.address}</p>
                <button
                  type="button"
                  onClick={() =>
                    copy(`${gift.addressName}, ${gift.address}`, "✓ Alamat berhasil disalin")
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[10px] tracking-[0.22em] text-primary-foreground uppercase transition-transform active:scale-95"
                >
                  <Copy className="h-3.5 w-3.5" /> Salin Alamat
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>
      )}
    </PageShell>
  );
}

/* ── 10. RSVP ───────────────────────────────────────────── */
export function RsvpSection({
  guestId,
  guestName,
  invitationId,
}: {
  guestId: string | null;
  guestName: string;
  invitationId: string;
}) {
  return (
    <PageShell>
      <Reveal delay={120}>
        <h2 className="font-display text-4xl text-sage-deep">Ucapan &amp; Doa</h2>
      </Reveal>
      <Reveal delay={220} className="mt-1 mb-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai
        </p>
      </Reveal>
      <RsvpForm guestId={guestId} guestName={guestName} invitationId={invitationId} />
    </PageShell>
  );
}

/* ── 11. Thanks ─────────────────────────────────────────── */
export function ThanksSection() {
  const data = useInvitation();
  return (
    <PageShell>
      <Reveal delay={160}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir dan memberikan doa restu kepada kami.
        </p>
      </Reveal>
      <Reveal delay={320} className="mt-4">
        <p className="font-display text-lg leading-relaxed text-sage-deep">
          Wassalamu&apos;alaikum warahmatullahi wabarakatuh.
        </p>
      </Reveal>
      <Divider delay={460} />
      <Reveal delay={600} className="mt-4">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Dengan penuh cinta,
        </p>
      </Reveal>
      <Reveal delay={760} variant="scale" className="mt-2">
        <p className="font-display text-[clamp(1.9rem,9vw,2.5rem)] leading-tight text-sage-deep">
          {data.groom.name}
          <span className="mx-2 font-script text-gold">&amp;</span>
          {data.bride.name}
        </p>
      </Reveal>
      <Reveal delay={1100} className="mt-12 flex flex-col items-center">
        <SmoothImage src={ASSETS.logo} alt="Inspire Wedstory" className="mb-1.5 h-7 w-auto opacity-50" />
        <p className="text-[9px] tracking-[0.22em] text-sage-deep/50 uppercase">Your Love. Your Story.</p>
        <p className="mt-1 text-[8px] tracking-[0.18em] text-sage-deep/40">
          Created with love by Inspire Wedstory &middot; 2026
        </p>
      </Reveal>
    </PageShell>
  );
}
