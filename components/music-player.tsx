"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  src: string;
}

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on client-side only
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.currentTime = 130;
    audioRef.current = audio;

    // Load user preference from localStorage if available
    const savedMuteState = localStorage.getItem("music-muted");
    if (savedMuteState !== null) {
      const shouldMute = savedMuteState === "true";
      setIsMuted(shouldMute);
      audio.muted = shouldMute;
    } else {
      // If no saved preference, default to unmuted for autoplay attempt
      setIsMuted(false);
      audio.muted = false;
    }

    // Attempt autoplay immediately
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          console.log("Autoplay successful");
        })
        .catch((error) => {
          // Autoplay was prevented by browser
          console.log("Autoplay prevented:", error);
          // Since autoplay failed, set to muted
          setIsMuted(true);
          audio.muted = true;
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  // Handle mute state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;

    // If unmuting and not already playing, try to play when unmuting
    if (!isMuted && !isPlaying && hasInteracted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play prevented:", error);
          });
      }
    }

    // Save preference to localStorage
    localStorage.setItem("music-muted", isMuted.toString());
  }, [isMuted, isPlaying, hasInteracted]);

  const toggleMute = () => {
    // Mark that user has interacted with the player
    setHasInteracted(true);

    // If currently muted and not playing, attempt to play when unmuting
    if (isMuted && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play prevented:", error);
          });
      }
    }

    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-accent"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}