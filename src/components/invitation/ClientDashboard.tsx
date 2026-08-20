import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, ExternalLink, Pencil, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { invitationUrl, makeGuestCode } from "@/lib/invitation-data";
import { OwnerOnboarding } from "./OwnerOnboarding";
import { DashboardShell, LoginForm, StatGrid, Tabs } from "./dashboard-ui";

type Guest = { id: string; name: string; code: string; created_at: string };
type Rsvp = {
  id: string;
  guest_id: string;
  guest_name: string;
  attendance: string;
  guest_count: number;
  message: string;
  created_at: string;
};
type Workspace = {
  clientName: string;
  invitationId: string;
  slug: string;
  theme: string;
  reception: { day: string; date: string; month: string; time: string; address: string };
};

const ATTENDANCE_LABEL: Record<string, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak hadir",
  ragu: "Ragu",
};

type Tab = "overview" | "guests" | "rsvp" | "wishes" | "invitation";

export function ClientDashboard({ onClose }: { onClose: () => void }) {
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [newGuest, setNewGuest] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(Boolean(next)),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: client } = await supabase
      .from("clients")
      .select("id, name")
      .eq("auth_user_id", userId)
      .maybeSingle();
    if (!client) {
      setError("Akun ini belum terhubung dengan undangan mana pun.");
      return;
    }
    const { data: invitation } = await supabase
      .from("invitations")
      .select("id, slug, theme")
      .eq("client_id", client.id)
      .maybeSingle();
    if (!invitation) {
      setError("Undangan untuk akun ini belum dibuat.");
      return;
    }
    const [contentRes, guestRes, rsvpRes] = await Promise.all([
      supabase
        .from("invitation_content")
        .select(
          "reception_day, reception_date, reception_month, reception_time, reception_address",
        )
        .eq("invitation_id", invitation.id)
        .maybeSingle(),
      supabase
        .from("guests")
        .select("id, name, code, created_at")
        .eq("invitation_id", invitation.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("rsvps")
        .select("*")
        .eq("invitation_id", invitation.id)
        .order("created_at", { ascending: false }),
    ]);

    setError("");
    setWorkspace({
      clientName: client.name,
      invitationId: invitation.id,
      slug: invitation.slug,
      theme: invitation.theme,
      reception: {
        day: contentRes.data?.reception_day ?? "",
        date: contentRes.data?.reception_date ?? "",
        month: contentRes.data?.reception_month ?? "",
        time: contentRes.data?.reception_time ?? "",
        address: contentRes.data?.reception_address ?? "",
      },
    });
    setGuests((guestRes.data ?? []) as Guest[]);
    setRsvps((rsvpRes.data ?? []) as Rsvp[]);
  }, []);

  useEffect(() => {
    if (session) void load();
  }, [session, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (signInError) {
      toast.error("Email atau kata sandi salah");
      return;
    }
    toast.success("Berhasil masuk");
  };

  const stats = useMemo(() => {
    const latest = new Map<string, Rsvp>();
    rsvps.forEach((r) => {
      if (!latest.has(r.guest_id)) latest.set(r.guest_id, r);
    });
    const values = [...latest.values()];
    return {
      total: guests.length,
      hadir: values.filter((r) => r.attendance === "hadir").length,
      tidak: values.filter((r) => r.attendance === "tidak_hadir").length,
      ragu: values.filter((r) => r.attendance === "ragu").length,
      belum: Math.max(0, guests.length - latest.size),
      orang: values
        .filter((r) => r.attendance === "hadir")
        .reduce((sum, r) => sum + r.guest_count, 0),
    };
  }, [guests, rsvps]);

  const rsvpByGuest = useMemo(() => {
    const map = new Map<string, Rsvp>();
    rsvps.forEach((r) => {
      if (!map.has(r.guest_id)) map.set(r.guest_id, r);
    });
    return map;
  }, [rsvps]);

  const addGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace) return;
    const name = newGuest.trim();
    if (name.length < 2) {
      toast.error("Nama tamu minimal 2 karakter");
      return;
    }
    const { error: insertError } = await supabase
      .from("guests")
      .insert({ name, code: makeGuestCode(), invitation_id: workspace.invitationId });
    if (insertError) {
      toast.error("Gagal menambah tamu");
      return;
    }
    setNewGuest("");
    void load();
  };

  const renameGuest = async (guest: Guest) => {
    const next = window.prompt("Nama tamu", guest.name)?.trim();
    if (!next || next.length < 2) return;
    const { error: updateError } = await supabase
      .from("guests")
      .update({ name: next })
      .eq("id", guest.id);
    if (updateError) {
      toast.error("Gagal mengubah nama tamu");
      return;
    }
    void load();
  };

  const removeGuest = async (id: string) => {
    const { error: deleteError } = await supabase.from("guests").delete().eq("id", id);
    if (deleteError) {
      toast.error("Gagal menghapus tamu");
      return;
    }
    void load();
  };

  const guestUrl = (guest: Guest) => invitationUrl(workspace?.slug ?? "", guest.code);

  const copy = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(message);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  const shareWhatsApp = (guest: Guest) => {
    if (!workspace) return;
    const { reception } = workspace;
    const tanggal = [reception.day, `${reception.date} ${reception.month}`.trim()]
      .filter(Boolean)
      .join(", ");
    const message = [
      "Yth.",
      "Bapak/Ibu/Saudara/i",
      "",
      `*${guest.name}*`,
      "",
      "di tempat",
      "",
      "Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara *Resepsi Pernikahan kami* pada:",
      "",
      `*Tanggal:* ${tanggal}`,
      `*Waktu:* ${reception.time}`,
      `*Alamat:* ${reception.address}`,
      "",
      "Info lebih lengkap mengenai acara dan lokasi dapat dilihat melalui link berikut:",
      "",
      guestUrl(guest),
      "",
      "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
      "",
      "Kami yang berbahagia,",
      "",
      "*Keluarga Kedua Mempelai*",
      "",
      "━━━━━━━━━━━━━━",
      "",
      "_Mohon maaf, undangan ini disampaikan secara digital melalui WhatsApp._",
    ].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setWorkspace(null);
    setGuests([]);
    setRsvps([]);
  };

  const wishes = rsvps.filter((r) => r.message.trim().length > 0);

  return (
    <DashboardShell
      title={workspace ? workspace.clientName : "Akses Pemilik Undangan"}
      subtitle={workspace ? "Wedding Dashboard" : undefined}
      onClose={onClose}
      onSignOut={session ? signOut : undefined}
    >
      {!session ? (
        <LoginForm
          heading="Masuk untuk mengelola undangan Anda"
          busy={busy}
          email={email}
          password={password}
          onEmail={setEmail}
          onPassword={setPassword}
          onSubmit={signIn}
        />
      ) : error ? (
        <p className="mt-16 px-6 text-center text-sm text-muted-foreground">{error}</p>
      ) : !workspace ? (
        <p className="mt-16 px-6 text-center text-sm text-muted-foreground">Memuat data…</p>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <Tabs
            active={tab}
            onSelect={setTab}
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "guests", label: `Data Tamu (${guests.length})` },
              { id: "rsvp", label: "RSVP" },
              { id: "wishes", label: `Ucapan (${wishes.length})` },
              { id: "invitation", label: "Undangan" },
            ]}
          />

          <div data-scrollable className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
            {tab === "overview" ? (
              <>
                <StatGrid
                  items={[
                    ["Total Tamu", stats.total],
                    ["Hadir", stats.hadir],
                    ["Tidak Hadir", stats.tidak],
                    ["Ragu", stats.ragu],
                    ["Belum Konfirmasi", stats.belum],
                    ["Total Orang", stats.orang],
                  ]}
                />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tema undangan: <span className="text-sage-deep">{workspace.theme}</span>
                </p>
                {guests.length === 0 ? <OwnerOnboarding /> : null}
              </>
            ) : null}

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
                  {guests.map((guest) => {
                    const rsvp = rsvpByGuest.get(guest.id);
                    return (
                      <li
                        key={guest.id}
                        className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">
                            {guest.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {guest.code} &middot;{" "}
                            {rsvp ? (ATTENDANCE_LABEL[rsvp.attendance] ?? rsvp.attendance) : "Belum"}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => copy(guestUrl(guest), "Link berhasil disalin")}
                          aria-label={`Salin link ${guest.name}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => shareWhatsApp(guest)}
                          aria-label={`Bagikan ke WhatsApp untuk ${guest.name}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => renameGuest(guest)}
                          aria-label={`Ubah nama ${guest.name}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
                        >
                          <Pencil className="h-3.5 w-3.5" />
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
                    );
                  })}
                  {guests.length === 0 ? <OwnerOnboarding /> : null}
                </ul>
              </>
            ) : null}

            {tab === "rsvp" ? (
              <>
                <StatGrid
                  items={[
                    ["Hadir", stats.hadir],
                    ["Tidak Hadir", stats.tidak],
                    ["Ragu", stats.ragu],
                  ]}
                />
                <ul className="space-y-2">
                  {rsvps.map((rsvp) => (
                    <li key={rsvp.id} className="rounded-xl border border-border bg-card px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium">{rsvp.guest_name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {ATTENDANCE_LABEL[rsvp.attendance] ?? rsvp.attendance} &middot;{" "}
                          {rsvp.guest_count} orang
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {new Date(rsvp.created_at).toLocaleString("id-ID")}
                      </p>
                    </li>
                  ))}
                  {rsvps.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Belum ada konfirmasi masuk.
                    </p>
                  ) : null}
                </ul>
              </>
            ) : null}

            {tab === "wishes" ? (
              <ul className="space-y-2">
                {wishes.map((rsvp) => (
                  <li key={rsvp.id} className="rounded-xl border border-border bg-card px-4 py-3">
                    <p className="text-sm font-medium">{rsvp.guest_name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      &ldquo;{rsvp.message}&rdquo;
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(rsvp.created_at).toLocaleString("id-ID")}
                    </p>
                  </li>
                ))}
                {wishes.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Belum ada ucapan masuk.
                  </p>
                ) : null}
              </ul>
            ) : null}

            {tab === "invitation" ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    Link Undangan
                  </p>
                  <p className="mt-1 break-all text-sm text-sage-deep">
                    {invitationUrl(workspace.slug)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copy(invitationUrl(workspace.slug), "Link berhasil disalin")
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground"
                    >
                      <Copy className="h-3.5 w-3.5" /> Salin Link
                    </button>
                    <a
                      href={invitationUrl(workspace.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Buka
                    </a>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Untuk mengubah isi undangan (foto, acara, quote, love story), silakan hubungi tim
                  Inspire Wedstory.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
