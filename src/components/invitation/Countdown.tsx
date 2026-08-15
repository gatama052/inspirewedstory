import { useEffect, useState } from "react";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const items = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2.5">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-card grid min-w-[68px] place-items-center rounded-2xl px-3 py-3"
        >
          <span className="font-display text-3xl leading-none font-semibold text-sage-deep tabular-nums">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
