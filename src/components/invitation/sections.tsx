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
      className={`flex h-full w-full flex-col items-center justify-center px-7 pt-20 pb-24 text-center ${className}`}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

function Eyebrow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <p className="text-[11px] tracking-[0.42em] text-muted-foreground uppercase">{children}</p>
    </Reveal>
  );
}

function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay} variant="scale" className="mx-auto my-5 w-32">
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
      <Reveal delay={220} variant="scale">
        <h1 className="font-display text-6xl leading-[1.05] font-medium text-sage-deep">
          {INVITATION.groom.name}
          <span className="mx-2 font-script text-gold">&amp;</span>
          {INVITATION.bride.name}
        </h1>
      </Reveal>
      <Divider delay={340} />
      <Reveal delay={420}>
        <p className="text-sm text-muted-foreground">Sabtu, 15 Agustus 2026</p>
      </Reveal>

      <Reveal delay={560} variant="bottom" className="mt-10">
        <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">Kepada Yth.</p>
        <p className="mt-2 font-display text-2xl text-sage-deep">{guestName}</p>
      </Reveal>

      {opened ? (
        <Reveal delay={700} className="mt-10">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-[10px] tracking-[0.3em] uppercase">Geser ke atas</span>
            <ChevronDown className="h-4 w-4 rotate-180" style={{ animation: "soft-float 2s infinite" }} />
          </div>
        </Reveal>
      ) : (
        <Reveal delay={700} variant="bottom" className="mt-10">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-primary px-9 py-3.5 text-xs tracking-[0.28em] text-primary-foreground uppercase shadow-xl transition-transform active:scale-95"
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
      <Reveal delay={260}>
        <p className="font-display text-2xl text-sage-deep">Assalamu&apos;alaikum</p>
        <p className="font-display text-2xl text-sage-deep">Warahmatullahi Wabarakatuh</p>
      </Reveal>
      <Reveal delay={420} className="mt-5">
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
      <Eyebrow delay={80}>Ar-Rum : 21</Eyebrow>
      <Divider delay={180} />
      <Reveal delay={280} variant="scale">
        <p className="font-display text-lg leading-relaxed text-sage-deep italic">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari
          jenismu sendiri, supaya kamu mendapat ketenangan hati dan dijadikan-Nya kasih sayang di
          antara kamu.&rdquo;
        </p>
      </Reveal>
    </PageShell>
  );
}

/* ── 4. Couple ──────────────────────────────────────────── */
function Person({
  photo,
  name,
  father,
  mother,
  delay,
  variant,
}: {
  photo: string;
  name: string;
  father: string;
  mother: string;
  delay: number;
  variant: "left" | "right";
}) {
  return (
    <Reveal delay={delay} variant={variant} className="flex flex-col items-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold/60 shadow-lg">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-3 font-display text-2xl text-sage-deep">{name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Putra/i dari
        <br />
        {father} &amp; {mother}
      </p>
    </Reveal>
  );
}

export function CoupleSection() {
  return (
    <PageShell>
      <Eyebrow delay={60}>Mempelai</Eyebrow>
      <Reveal delay={160} variant="scale" className="mx-auto mt-4 w-44">
        <img
          src={ASSETS.couple}
          alt={`${INVITATION.groom.name} dan ${INVITATION.bride.name}`}
          className="w-full rounded-2xl object-cover shadow-xl"
        />
      </Reveal>
      <Divider delay={280} />
      <div className="space-y-6">
        <Person
          photo={ASSETS.groom}
          name={INVITATION.groom.full}
          father={INVITATION.groom.father}
          mother={INVITATION.groom.mother}
          delay={360}
          variant="left"
        />
        <Person
          photo={ASSETS.bride}
          name={INVITATION.bride.full}
          father={INVITATION.bride.father}
          mother={INVITATION.bride.mother}
          delay={520}
          variant="right"
        />
      </div>
    </PageShell>
  );
}

/* ── 5 & 6. Event ───────────────────────────────────────── */
export function EventSection({ event }: { event: typeof INVITATION.akad }) {
  return (
    <PageShell>
      <Eyebrow delay={60}>Save The Date</Eyebrow>
      <Reveal delay={160}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">{event.title}</h2>
      </Reveal>
      <Divider delay={260} />
      <Reveal delay={340} variant="scale" className="glass-card mx-auto rounded-3xl px-6 py-6">
        <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">{event.day}</p>
        <p className="my-1 font-display text-6xl leading-none text-sage-deep">{event.date}</p>
        <p className="text-sm text-muted-foreground">{event.month}</p>
        <div className="gold-line my-4" />
        <p className="text-sm font-medium text-sage-deep">{event.time}</p>
        <p className="mt-3 font-display text-xl text-sage-deep">{event.place}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.address}</p>
      </Reveal>
    </PageShell>
  );
}

/* ── 7. Maps ────────────────────────────────────────────── */
export function MapsSection() {
  const locations = [
    { label: INVITATION.akad.title, place: INVITATION.akad.place, url: INVITATION.akad.mapsUrl },
    {
      label: INVITATION.resepsi.title,
      place: INVITATION.resepsi.place,
      url: INVITATION.resepsi.mapsUrl,
    },
  ];
  return (
    <PageShell>
      <Eyebrow delay={60}>Lokasi Acara</Eyebrow>
      <Reveal delay={150}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">Petunjuk Arah</h2>
      </Reveal>
      <Divider delay={250} />
      <div className="space-y-3">
        {locations.map((location, index) => (
          <Reveal key={location.label} delay={330 + index * 130} variant="bottom">
            <a
              href={location.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 rounded-2xl px-5 py-4 text-left transition-transform active:scale-[0.98]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  {location.label}
                </span>
                <span className="block truncate font-display text-lg text-sage-deep">
                  {location.place}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal delay={620} className="mt-4">
        <p className="text-xs text-muted-foreground">Ketuk untuk membuka Google Maps</p>
      </Reveal>
    </PageShell>
  );
}

/* ── 8. Countdown ───────────────────────────────────────── */
export function CountdownSection() {
  return (
    <PageShell>
      <Eyebrow delay={60}>Menuju Hari Bahagia</Eyebrow>
      <Reveal delay={150}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">Counting Down</h2>
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

/* ── 9. Gallery ─────────────────────────────────────────── */
export function GallerySection() {
  const photos = [
    { src: ASSETS.couple, alt: "Foto pasangan Galium dan Aiktimal" },
    { src: ASSETS.groom, alt: "Foto mempelai pria" },
    { src: ASSETS.bride, alt: "Foto mempelai wanita" },
  ];
  return (
    <PageShell>
      <Eyebrow delay={60}>Galeri</Eyebrow>
      <Reveal delay={150}>
        <h2 className="mt-2 font-display text-4xl text-sage-deep">Our Moments</h2>
      </Reveal>
      <Divider delay={250} />
      <div className="grid grid-cols-2 gap-3">
        <Reveal delay={330} variant="scale" className="col-span-2">
          <img
            src={photos[0]!.src}
            alt={photos[0]!.alt}
            className="h-44 w-full rounded-2xl object-cover shadow-lg"
          />
        </Reveal>
        {photos.slice(1).map((photo, index) => (
          <Reveal key={photo.alt} delay={450 + index * 140} variant="scale">
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-40 w-full rounded-2xl object-cover shadow-lg"
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

/* ── 10. Love Story ─────────────────────────────────────── */
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

/* ── 11. Gift ───────────────────────────────────────────── */
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
          className="mx-auto w-44 rounded-xl"
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

/* ── 12. RSVP ───────────────────────────────────────────── */
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
