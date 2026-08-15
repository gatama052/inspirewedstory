import { useRef, useState } from "react";
import { OwnerDashboard } from "./OwnerDashboard";

/** Hidden entry point: tap the top-left corner three times quickly. */
export function OwnerAccess() {
  const [open, setOpen] = useState(false);
  const taps = useRef<number[]>([]);

  const handleTap = () => {
    const now = Date.now();
    taps.current = [...taps.current, now].filter((t) => now - t < 1400);
    if (taps.current.length >= 3) {
      taps.current = [];
      setOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        aria-hidden
        tabIndex={-1}
        className="fixed left-0 top-0 z-50 h-12 w-12 cursor-default opacity-0"
      />
      {open ? <OwnerDashboard onClose={() => setOpen(false)} /> : null}
    </>
  );
}
