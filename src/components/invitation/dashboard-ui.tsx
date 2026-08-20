import type { ReactNode } from "react";
import { LogOut, X } from "lucide-react";

export function DashboardShell({
  title,
  subtitle,
  onClose,
  onSignOut,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  onSignOut?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-xl text-sage-deep">{title}</h2>
          {subtitle ? (
            <p className="truncate text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {onSignOut ? (
            <button
              type="button"
              onClick={onSignOut}
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
      {children}
    </div>
  );
}

export function LoginForm({
  heading,
  busy,
  email,
  password,
  onEmail,
  onPassword,
  onSubmit,
}: {
  heading: string;
  busy: boolean;
  email: string;
  password: string;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="mx-auto mt-16 w-full max-w-sm space-y-3 px-6">
      <p className="text-center text-sm text-muted-foreground">{heading}</p>
      <input
        type="email"
        value={email}
        onChange={(e) => onEmail(e.target.value)}
        placeholder="Email"
        autoComplete="username"
        className="w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => onPassword(e.target.value)}
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
  );
}

export function Tabs<T extends string>({
  tabs,
  active,
  onSelect,
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div data-scrollable className="flex gap-2 overflow-x-auto px-4 py-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelect(tab.id)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs ${
            active === tab.id
              ? "bg-primary text-primary-foreground"
              : "border border-border text-muted-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function StatGrid({ items }: { items: [string, number | string][] }) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-2 text-center">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-border bg-card py-3">
          <p className="font-display text-2xl text-sage-deep">{value}</p>
          <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const className =
    "w-full rounded-xl border border-border bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
