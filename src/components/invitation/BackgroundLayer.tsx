import { ASSETS } from "@/lib/assets";

export function BackgroundLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <img
        src={ASSETS.background}
        alt=""
        aria-hidden
        className="h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-background/35" />
    </div>
  );
}
