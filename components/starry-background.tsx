"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

export default function StarryBackground() {
  const { resolvedTheme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  
  const isDarkMode = resolvedTheme === "dark";
  
  // Mark component as mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Get and track window dimensions
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate stars based on dimensions
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    
    const newStars: Star[] = [];
    const starCount = Math.floor((dimensions.width * dimensions.height) / 8000);
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 0.5,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 4 + 2,
        animationDelay: Math.random() * 5,
      });
    }
    setStars(newStars);
  }, [dimensions]);

  // Return early if we haven't mounted yet
  if (!hasMounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      style={{ 
        // Light mode gets a soft dawn-sky wash instead of flat white.
        background: isDarkMode
          ? 'transparent'
          : 'linear-gradient(180deg, #eef0ff 0%, #fbfbff 45%, #f6efff 100%)',
      }}
    >
      {/* Faint nebula glow in two opposite corners */}
      <div
        className="absolute rounded-full"
        style={{
          width: '70vmax',
          height: '70vmax',
          left: '-25vmax',
          top: '-30vmax',
          background:
            isDarkMode
              ? 'radial-gradient(closest-side, rgba(99,102,241,0.20), rgba(99,102,241,0.07) 55%, transparent)'
              : 'radial-gradient(closest-side, rgba(99,102,241,0.22), rgba(99,102,241,0.08) 55%, transparent)',
          animation: 'nebula-drift 40s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '65vmax',
          height: '65vmax',
          right: '-25vmax',
          // Anchored from the top, not the bottom: while the welcome screen is up
          // this layer is as tall as the whole page, and "bottom" would put the
          // glow far below the fold and make it pop in when the screen lifts.
          top: 'calc(100vh - 35vmax)',
          background:
            isDarkMode
              ? 'radial-gradient(closest-side, rgba(168,85,247,0.16), rgba(168,85,247,0.05) 55%, transparent)'
              : 'radial-gradient(closest-side, rgba(168,85,247,0.20), rgba(168,85,247,0.07) 55%, transparent)',
          animation: 'nebula-drift 55s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Regular stars only. Grey dots on white read as dust, so in light mode
          they are indigo and a touch bigger, to hold up against the pale sky. */}
      <div className="absolute inset-0" style={{ opacity: 1 }}>
      {stars.map(star => (
        <div
          key={star.id}
          className={`absolute rounded-full ${isDarkMode ? 'bg-white' : 'bg-indigo-500'}`}
          style={{
            width: `${star.size * (isDarkMode ? 1 : 1.35)}px`,
            height: `${star.size * (isDarkMode ? 1 : 1.35)}px`,
            left: `${star.x}px`,
            top: `${star.y}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite ${star.animationDelay}s`,
          }}
        />
      ))}
      </div>
    </div>
  );
}