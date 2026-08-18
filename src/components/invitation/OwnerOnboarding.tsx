import { CheckCircle, Lightbulb, Link2, ListChecks, Mail, Share2, UserPlus } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Tambahkan Tamu",
    description:
      "Klik Tambah untuk memasukkan nama tamu yang ingin Anda undang. Setiap tamu akan otomatis mendapatkan link undangan pribadi.",
  },
  {
    icon: CheckCircle,
    title: "Pastikan Data Tamu Benar",
    description:
      "Periksa kembali nama tamu sebelum membagikan undangan agar tidak terjadi kesalahan.",
  },
  {
    icon: Share2,
    title: "Bagikan Undangan",
    description:
      "Gunakan tombol Salin Link untuk menyalin link pribadi atau Bagikan ke WhatsApp untuk langsung mengirim undangan kepada tamu.",
  },
  {
    icon: Mail,
    title: "Tamu Mengisi RSVP",
    description:
      "Tamu dapat membuka undangan melalui link pribadi dan mengisi konfirmasi kehadiran (RSVP).",
  },
  {
    icon: ListChecks,
    title: "Pantau RSVP",
    description:
      "Lihat daftar tamu yang sudah memberikan konfirmasi kehadiran melalui tab RSVP.",
  },
];

export function OwnerOnboarding() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-lg text-sage-deep">Selamat datang di dashboard undangan Anda</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Kelola tamu, bagikan undangan pribadi, dan pantau konfirmasi kehadiran dengan mudah.
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
      <div className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-xs text-muted-foreground">
        <Lightbulb className="h-4 w-4 shrink-0 text-primary" />
        <span>
          <span className="font-medium text-foreground">Tips:</span>{" "}
          Pastikan nama tamu sudah benar sebelum membagikan undangan. Gunakan fitur Bagikan ke WhatsApp agar pesan undangan, nama tamu, dan link pribadi terisi secara otomatis.
        </span>
      </div>
    </div>
  );
}
