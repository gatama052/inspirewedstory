import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function MusicPlayer({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!started) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;
    void audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (playing) {
        void audio.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!started) return <audio ref={audioRef} src={ASSETS.music} loop preload="auto" />;

  return (
    <>
      <audio ref={audioRef} src={ASSETS.music} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        className="glass-card fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full text-primary shadow-lg transition-transform active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Music className="h-4 w-4 animate-pulse" />
        )}
      </button>
    </>
  );
}
