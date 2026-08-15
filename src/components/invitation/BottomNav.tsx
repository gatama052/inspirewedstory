import {
  Heart,
  CalendarDays,
  Gift,
  MailCheck,
  PartyPopper,
  Sparkles,
  Timer,
  Quote,
  Users,
  BookHeart,
} from "lucide-react";

const ICONS: Record<string, typeof Heart> = {
  greeting: Heart,
  quote: Quote,
  couple: Users,
  akad: CalendarDays,
  resepsi: PartyPopper,
  countdown: Timer,
  story: BookHeart,
  gift: Gift,
  rsvp: MailCheck,
  thanks: Sparkles,
};

export function BottomNav({
  pages,
  active,
  onSelect,
}: {
  pages: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const items = pages.filter((page) => page.id in ICONS);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div
        data-scrollable
        className="glass-card flex max-w-full gap-0.5 overflow-x-auto rounded-full px-1.5 py-1 shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((page) => {
          const Icon = ICONS[page.id] ?? Heart;
          const isActive = page.id === active;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onSelect(page.id)}
              aria-label={page.label}
              aria-current={isActive}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground scale-105 shadow-md"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
