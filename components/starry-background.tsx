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
        opacity: isDarkMode ? 1 : 0.4,
        background: isDarkMode ? 'transparent' : 'transparent' 
      }}
    >
      {/* Regular stars only */}
      {stars.map(star => (
        <div
          key={star.id}
          className={`absolute rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}px`,
            top: `${star.y}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite ${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}