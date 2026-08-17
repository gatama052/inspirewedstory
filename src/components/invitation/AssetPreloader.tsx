import { useEffect, useState, type ReactNode } from "react";
import { COVER_IMAGES, PRELOAD_IMAGES } from "@/lib/assets";

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}

/**
 * Holds the invitation back until every asset visible on the cover (background,
 * corner ornaments, couple photo, logo) and the web fonts are ready. Children
 * mount only afterwards, so entrance animations always start from a settled
 * layout instead of running while images are still streaming in.
 */
export function AssetPreloader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };

    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? (document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => undefined)
        : Promise.resolve();

    // Never block longer than 6s, even on a flaky connection.
    const safety = window.setTimeout(done, 6000);

    Promise.all([...COVER_IMAGES.map(loadImage), fonts]).then(() => {
      // One frame of breathing room so layout/fonts settle before the fade-in.
      requestAnimationFrame(() => requestAnimationFrame(done));
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, []);

  // Warm the remaining pages quietly once the cover is up.
  useEffect(() => {
    if (!ready) return;
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [ready]);

  return (
    <>
      <div
        aria-hidden={!ready}
        className="h-full w-full transition-opacity duration-700 ease-out"
        style={{ opacity: ready ? 1 : 0 }}
      >
        {ready ? children : null}
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-50 bg-background transition-opacity duration-700 ease-out"
        style={{ opacity: ready ? 0 : 1, visibility: ready ? "hidden" : "visible" }}
        aria-hidden
      >
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="h-6 w-6 rounded-full border border-gold/50 border-t-transparent opacity-60"
            style={{ animation: "spin 900ms linear infinite" }}
          />
        </div>
      </div>
    </>
  );
}
