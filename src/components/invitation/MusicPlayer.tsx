import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function MusicPlayer({ started, src }: { started: boolean; src?: string }) {
  const track = src || ASSETS.music;
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

  if (!started) return <audio ref={audioRef} src={track} loop preload="auto" />;

  return (
    <>
      <audio ref={audioRef} src={track} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        className="fixed right-4 top-4 z-40 grid h-7 w-7 place-items-center rounded-full border border-gold/15 bg-background/10 text-primary/45 backdrop-blur-[2px] transition-transform active:scale-95"
      >
        {playing ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Music className="h-3 w-3 animate-pulse" />
        )}
      </button>
    </>
  );
}
