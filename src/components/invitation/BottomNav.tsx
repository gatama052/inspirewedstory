import {
  Heart,
  Home,
  Image,
  CalendarDays,
  Gift,
  MailCheck,
  MapPin,
  Timer,
  Quote,
  Users,
  BookHeart,
} from "lucide-react";

const ICONS: Record<string, typeof Heart> = {
  opening: Home,
  greeting: Heart,
  quote: Quote,
  couple: Users,
  akad: CalendarDays,
  resepsi: CalendarDays,
  maps: MapPin,
  countdown: Timer,
  gallery: Image,
  story: BookHeart,
  gift: Gift,
  rsvp: MailCheck,
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
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3">
      <div
        data-scrollable
        className="glass-card flex max-w-full gap-1 overflow-x-auto rounded-full px-2 py-1.5 shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page) => {
          const Icon = ICONS[page.id] ?? Heart;
          const isActive = page.id === active;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onSelect(page.id)}
              aria-label={page.label}
              aria-current={isActive}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground scale-105 shadow-md"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
