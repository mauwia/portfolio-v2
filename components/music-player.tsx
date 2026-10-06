"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  src: string;
}

// Only an explicit click on the mute button is remembered. A failed
// autoplay must never be saved as "muted", or the visitor would never
// hear the music again on later visits.
const PREF_KEY = "music-muted-v2";

function readPref(): string | null {
  try {
    return localStorage.getItem(PREF_KEY);
  } catch {
    return null;
  }
}

function writePref(muted: boolean) {
  try {
    localStorage.setItem(PREF_KEY, String(muted));
  } catch {}
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.currentTime = 130;
    audioRef.current = audio;

    // The visitor turned the music off before: respect that.
    if (readPref() === "true") {
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }

    const events = ["pointerdown", "keydown", "touchend"] as const;
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, startOnInteraction, true));

    function startOnInteraction(e: Event) {
      // A click on the mute button itself is handled by toggleMute.
      if (buttonRef.current && e.target instanceof Node && buttonRef.current.contains(e.target)) {
        removeListeners();
        return;
      }
      removeListeners();
      // "drift in silence" on the welcome screen: stay quiet.
      if (e.target instanceof Element && e.target.closest("[data-music-skip]")) return;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    // Browsers usually block sound until the visitor interacts with the
    // page. Try anyway; if blocked, start on the first click, tap or key.
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        events.forEach((e) => window.addEventListener(e, startOnInteraction, true));
      });

    return () => {
      removeListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      writePref(true);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      writePref(false);
    }
  };

  return (
    <div ref={buttonRef} className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-accent"
        onClick={toggleMute}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
    </div>
  );
}
