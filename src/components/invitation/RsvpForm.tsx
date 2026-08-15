import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "./Reveal";

const schema = z.object({
  guest_name: z.string().trim().min(2, "Nama minimal 2 karakter").max(80, "Nama terlalu panjang"),
  attendance: z.enum(["hadir", "tidak_hadir", "ragu"]),
  guest_count: z.number().int().min(0).max(20),
  message: z.string().trim().max(500, "Ucapan maksimal 500 karakter"),
});

const OPTIONS = [
  { value: "hadir", label: "Hadir" },
  { value: "ragu", label: "Ragu" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
] as const;

export function RsvpForm({ guestId, guestName }: { guestId: string | null; guestName: string }) {
  const [name, setName] = useState(guestName === "Tamu Undangan" ? "" : guestName);
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "ragu">("hadir");
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      guest_name: name,
      attendance,
      guest_count: attendance === "hadir" ? count : 0,
      message,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Data belum lengkap");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("rsvps").insert({ ...parsed.data, guest_id: guestId });
    setSending(false);
    if (error) {
      toast.error("Gagal mengirim, silakan coba lagi");
      return;
    }
    setDone(true);
    toast.success("Terima kasih atas konfirmasi dan doanya");
  };

  if (done) {
    return (
      <Reveal variant="scale" className="glass-card w-full rounded-3xl px-6 py-10 text-center">
        <p className="font-display text-2xl text-sage-deep">Terima kasih</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Konfirmasi dan doa terbaikmu sudah kami terima.
        </p>
      </Reveal>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card w-full space-y-3 rounded-3xl p-5 text-left">
      <Reveal delay={80}>
        <label className="mb-1 block text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Nama
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="Nama kamu"
          className="w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </Reveal>

      <Reveal delay={160}>
        <label className="mb-1 block text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Kehadiran
        </label>
        <div className="grid grid-cols-3 gap-2">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAttendance(option.value)}
              className={`rounded-xl border px-2 py-2 text-xs transition-all ${
                attendance === option.value
                  ? "border-transparent bg-primary text-primary-foreground shadow"
                  : "border-border bg-white/60 text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Reveal>

      {attendance === "hadir" ? (
        <Reveal delay={220}>
          <label className="mb-1 block text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Jumlah Tamu
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="h-9 w-9 rounded-full border border-border bg-white/60 text-lg leading-none"
            >
              −
            </button>
            <span className="w-8 text-center text-lg font-medium tabular-nums">{count}</span>
            <button
              type="button"
              onClick={() => setCount((c) => Math.min(20, c + 1))}
              className="h-9 w-9 rounded-full border border-border bg-white/60 text-lg leading-none"
            >
              +
            </button>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={280}>
        <label className="mb-1 block text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Ucapan &amp; Doa
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="Tulis ucapan dan doa terbaik"
          className="w-full resize-none rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </Reveal>

      <Reveal delay={340}>
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-primary px-6 py-3 text-sm tracking-[0.18em] text-primary-foreground uppercase shadow-lg transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {sending ? "Mengirim…" : "Kirim"}
        </button>
      </Reveal>
    </form>
  );
}
