import { useCallback, useEffect, useState } from "react";
import { Copy, LogOut, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { INVITATION } from "@/lib/invitation-config";

type Guest = { id: string; name: string; code: string; created_at: string };
type Rsvp = {
  id: string;
  guest_id: string | null;
  guest_name: string;
  attendance: string;
  guest_count: number;
  message: string;
  created_at: string;
};

const ATTENDANCE_LABEL: Record<string, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak hadir",
  ragu: "Ragu",
};

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 5 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join("");
}

export function OwnerDashboard({ onClose }: { onClose: () => void }) {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"guests" | "rsvp">("guests");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [newGuest, setNewGuest] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(Boolean(next));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const [guestRes, rsvpRes] = await Promise.all([
      supabase.from("guests").select("*").order("created_at", { ascending: false }),
      supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
    ]);
    if (guestRes.data) setGuests(guestRes.data as Guest[]);
    if (rsvpRes.data) setRsvps(rsvpRes.data as Rsvp[]);
  }, []);

  useEffect(() => {
    if (session) void load();
  }, [session, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error("Email atau kata sandi salah");
      return;
    }
    toast.success("Berhasil masuk");
  };

  const addGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newGuest.trim();
    if (name.length < 2) {
      toast.error("Nama tamu minimal 2 karakter");
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;
    const { error } = await supabase
      .from("guests")
      .insert({ name, code: makeCode(), owner_id: userId });
    if (error) {
      toast.error("Gagal menambah tamu");
      return;
    }
    setNewGuest("");
    void load();
  };

  const removeGuest = async (id: string) => {
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus tamu");
      return;
    }
    void load();
  };

  const copyLink = async (guest: Guest) => {
    const url = `${window.location.origin}/${INVITATION.slug}/${guest.code}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(`Link untuk ${guest.name} disalin`);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  const stats = {
    hadir: rsvps.filter((r) => r.attendance === "hadir").length,
    tidak: rsvps.filter((r) => r.attendance === "tidak_hadir").length,
    orang: rsvps.reduce((sum, r) => sum + r.guest_count, 0),
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-display text-xl text-sage-deep">Dashboard Undangan</h2>
        <div className="flex items-center gap-2">
          {session ? (
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              aria-label="Keluar"
              className="grid h-9 w-9 place-items-center rounded-full border border-border"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dashboard"
            className="grid h-9 w-9 place-items-center rounded-full border border-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {!session ? (
        <form onSubmit={signIn} className="mx-auto mt-16 w-full max-w-sm space-y-3 px-6">
          <p className="text-center text-sm text-muted-foreground">Masuk untuk mengelola undangan</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            className="w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kata sandi"
            autoComplete="current-password"
            className="w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm tracking-[0.18em] text-primary-foreground uppercase disabled:opacity-60"
          >
            {busy ? "Memproses…" : "Masuk"}
          </button>
        </form>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex gap-2 px-4 py-3">
            {(
              [
                ["guests", `Tamu (${guests.length})`],
                ["rsvp", `RSVP (${rsvps.length})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`rounded-full px-4 py-1.5 text-xs ${
                  tab === key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div data-scrollable className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
            {tab === "guests" ? (
              <>
                <form onSubmit={addGuest} className="mb-4 flex gap-2">
                  <input
                    value={newGuest}
                    onChange={(e) => setNewGuest(e.target.value)}
                    placeholder="Nama tamu"
                    maxLength={80}
                    className="min-w-0 flex-1 rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-primary px-4 text-sm text-primary-foreground"
                  >
                    Tambah
                  </button>
                </form>
                <ul className="space-y-2">
                  {guests.map((guest) => (
                    <li
                      key={guest.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-foreground">{guest.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          /{INVITATION.slug}/{guest.code}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => copyLink(guest)}
                        aria-label={`Salin link ${guest.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeGuest(guest.id)}
                        aria-label={`Hapus ${guest.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                  {guests.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Belum ada tamu. Tambahkan nama untuk membuat link pribadi.
                    </p>
                  ) : null}
                </ul>
              </>
            ) : (
              <>
                <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    ["Hadir", stats.hadir],
                    ["Tidak", stats.tidak],
                    ["Total Orang", stats.orang],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-border bg-card py-3">
                      <p className="font-display text-2xl text-sage-deep">{value}</p>
                      <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
                <ul className="space-y-2">
                  {rsvps.map((rsvp) => (
                    <li key={rsvp.id} className="rounded-xl border border-border bg-card px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium">{rsvp.guest_name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {ATTENDANCE_LABEL[rsvp.attendance] ?? rsvp.attendance} &middot;{" "}
                          {rsvp.guest_count}
                        </span>
                      </div>
                      {rsvp.message ? (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {rsvp.message}
                        </p>
                      ) : null}
                    </li>
                  ))}
                  {rsvps.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Belum ada konfirmasi masuk.
                    </p>
                  ) : null}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
