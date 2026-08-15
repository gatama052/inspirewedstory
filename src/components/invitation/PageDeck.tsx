import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type DeckPage = {
  id: string;
  label: string;
  inNav?: boolean;
  render: () => ReactNode;
};

type DeckContextValue = {
  active: number;
  direction: 1 | -1;
  token: number;
  count: number;
  go: (index: number) => void;
  next: () => void;
  prev: () => void;
};

const DeckContext = createContext<DeckContextValue | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used inside PageDeck");
  return ctx;
}

const TRANSITION_MS = 720;

function isInsideScrollable(target: EventTarget | null, deltaY: number) {
  let el = target as HTMLElement | null;
  while (el && el !== document.body) {
    if (el.dataset && el.dataset["scrollable"] !== undefined) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (deltaY > 0 && !atBottom) return true;
      if (deltaY < 0 && !atTop) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function PageDeck({
  pages,
  locked = false,
  children,
}: {
  pages: DeckPage[];
  locked?: boolean;
  children?: (ctx: DeckContextValue) => ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [entering, setEntering] = useState(false);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [token, setToken] = useState(0);
  const busy = useRef(false);
  const wheelAcc = useRef(0);
  const touchY = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  const lockedRef = useRef(locked);
  lockedRef.current = locked;

  const go = useCallback(
    (index: number) => {
      const current = activeRef.current;
      if (busy.current || lockedRef.current) return;
      if (index === current || index < 0 || index >= pages.length) return;
      busy.current = true;
      activeRef.current = index;
      setDirection(index > current ? 1 : -1);
      setLeaving(current);
      setEntering(true);
      setToken((t) => t + 1);
      setActive(index);
      window.setTimeout(() => setEntering(false), 30);
      window.setTimeout(() => {
        setLeaving(null);
        busy.current = false;
      }, TRANSITION_MS);
    },
    [pages.length],
  );


  const next = useCallback(() => go(activeRef.current + 1), [go]);
  const prev = useCallback(() => go(activeRef.current - 1), [go]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") next();
      if (e.key === "ArrowUp" || e.key === "PageUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onWheel = (e: React.WheelEvent) => {
    if (busy.current || locked) return;
    if (isInsideScrollable(e.target, e.deltaY)) return;
    wheelAcc.current += e.deltaY;
    if (Math.abs(wheelAcc.current) > 40) {
      const dir = wheelAcc.current > 0 ? 1 : -1;
      wheelAcc.current = 0;
      go(activeRef.current + dir);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0]?.clientY ?? 0;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (busy.current || locked) return;
    const endY = e.changedTouches[0]?.clientY ?? 0;
    const delta = touchY.current - endY;
    if (Math.abs(delta) < 45) return;
    if (isInsideScrollable(e.target, delta)) return;
    go(activeRef.current + (delta > 0 ? 1 : -1));
  };

  const ctx: DeckContextValue = { active, direction, token, count: pages.length, go, next, prev };

  return (
    <DeckContext.Provider value={ctx}>
      <div
        className="relative h-[100dvh] w-full overflow-hidden"
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {pages.map((page, index) => {
          let state = "idle";
          if (index === active) {
            state = entering ? (direction === 1 ? "enter-up" : "enter-down") : "active";
          } else if (index === leaving) {
            state = direction === 1 ? "exit-up" : "exit-down";
          }
          return (
            <div key={page.id} className="deck-page" data-state={state} aria-hidden={index !== active}>
              {index === active || index === leaving ? (
                <div key={index === active ? token : `leave-${token}`} className="h-full w-full">
                  {page.render()}
                </div>
              ) : null}
            </div>
          );
        })}
        {children?.(ctx)}
      </div>
    </DeckContext.Provider>
  );
}
