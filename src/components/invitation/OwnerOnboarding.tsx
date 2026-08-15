import { Check, FileEdit, Link2, Share2, UserPlus } from "lucide-react";

const STEPS = [
  {
    icon: FileEdit,
    title: "Sesuaikan detail undangan",
    description:
      "Ubah nama pasangan, tanggal acara, lokasi, dan foto di file konfigurasi agar sesuai dengan pernikahan Anda.",
  },
  {
    icon: UserPlus,
    title: "Tambahkan tamu pertama",
    description:
      "Ketik nama tamu di kolom di atas, lalu tekan Tambah. Setiap tamu akan mendapat kode unik otomatis.",
  },
  {
    icon: Link2,
    title: "Uji coba link pribadi",
    description:
      "Tekan ikon salin di samping nama tamu, buka link tersebut, dan pastikan nama tamu muncul di halaman pembuka.",
  },
  {
    icon: Share2,
    title: "Bagikan ke tamu undangan",
    description:
      "Kirim link pribadi ke setiap tamu. Mereka bisa mengisi RSVP dan Anda bisa memantaunya di tab RSVP.",
  },
];

export function OwnerOnboarding() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-lg text-sage-deep">Selamat datang di dashboard undangan</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Ikuti langkah-langkah berikut untuk mulai menggunakan undangan digital Anda.
      </p>
      <ol className="mt-5 space-y-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <div className="flex shrink-0 flex-col items-center">
              <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-sage-deep">
                <step.icon className="h-4 w-4" />
              </div>
              {index < STEPS.length - 1 ? (
                <div className="mt-2 h-full min-h-[24px] w-px bg-border" />
              ) : null}
            </div>
            <div className="pb-2">
              <p className="text-sm font-medium text-foreground">
                {index + 1}. {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-xs text-muted-foreground">
        <Check className="h-4 w-4 shrink-0 text-primary" />
        <span>Tip: ketuk pojok kiri atas layar tiga kali cepat dari halaman undangan untuk membuka dashboard ini.</span>
      </div>
    </div>
  );
}
