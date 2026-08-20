import { useCallback, useRef, useState } from "react";
import { ClientDashboard } from "./ClientDashboard";
import { AdminDashboard } from "./AdminDashboard";

/**
 * Hidden entry points in the top-left corner.
 * - Client : three quick taps.
 * - Admin  : two quick taps, then hold the second one for ~3 seconds.
 */
export function HiddenAccess() {
  const [mode, setMode] = useState<"none" | "client" | "admin">("none");
  const taps = useRef<number[]>([]);
  const holdTimer = useRef<number | null>(null);
  const heldOpen = useRef(false);

  const clearHold = useCallback(() => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }, []);

  const handleDown = () => {
    const now = Date.now();
    taps.current = taps.current.filter((t) => now - t < 1400);
    heldOpen.current = false;
    // Second press held long enough → admin.
    if (taps.current.length === 1) {
      clearHold();
      holdTimer.current = window.setTimeout(() => {
        heldOpen.current = true;
        taps.current = [];
        setMode("admin");
      }, 3000);
    }
  };

  const handleUp = () => {
    clearHold();
    if (heldOpen.current) {
      heldOpen.current = false;
      return;
    }
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1400), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      setMode("client");
    }
  };

  return (
    <>
      <button
        type="button"
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerLeave={clearHold}
        onPointerCancel={clearHold}
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden
        tabIndex={-1}
        className="fixed left-0 top-0 z-50 h-12 w-12 cursor-default touch-none opacity-0 select-none"
      />
      {mode === "client" ? <ClientDashboard onClose={() => setMode("none")} /> : null}
      {mode === "admin" ? <AdminDashboard onClose={() => setMode("none")} /> : null}
    </>
  );
}
