import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";

/**
 * Ornaments live on their own layer, separate from the background and from the
 * page content. They fade out on page change and fade back in with a soft
 * stagger, so every page feels freshly composed.
 */
export function OrnamentLayer({ token }: { token: number }) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [renderToken, setRenderToken] = useState(token);

  useEffect(() => {
    if (token === renderToken) return;
    setPhase("out");
    const t = window.setTimeout(() => {
      setRenderToken(token);
      setPhase("in");
    }, 320);
    return () => window.clearTimeout(t);
  }, [token, renderToken]);

  const corners = [
    { src: ASSETS.ornamentTopLeft, pos: "top-0 left-0", delay: 120 },
    { src: ASSETS.ornamentTopRight, pos: "top-0 right-0", delay: 220 },
    { src: ASSETS.ornamentBottomLeft, pos: "bottom-0 left-0", delay: 320 },
    { src: ASSETS.ornamentBottomRight, pos: "bottom-0 right-0", delay: 420 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {corners.map((corner) => (
        <img
          key={`${corner.pos}-${renderToken}`}
          src={corner.src}
          alt=""
          aria-hidden
          className={`absolute ${corner.pos} w-[38vw] max-w-[220px] select-none transition-all duration-300 ease-out ${
            phase === "out" ? "scale-[0.97] opacity-0" : "reveal reveal-scale opacity-100"
          }`}
          style={phase === "in" ? { animationDelay: `${corner.delay}ms` } : undefined}
        />
      ))}
    </div>
  );
}
