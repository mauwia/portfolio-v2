"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Spaceship {
  id: number;
  type: 'rocket' | 'ufo' | 'satellite';
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  duration: number;
  delay: number;
  opacity: number;
  flip: boolean;
  initialEdge: number; // Track which edge the ship starts from
}

export default function SpaceShips() {
  const { resolvedTheme } = useTheme();
  const [spaceships, setSpaceships] = useState<Spaceship[]>([]);
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

  // Generate spaceships based on dimensions
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    
    // Significantly increased ship count - scale with screen size but with more ships
    const shipCount = Math.max(12, Math.floor((dimensions.width * dimensions.height) / 100000));
    const newSpaceships: Spaceship[] = [];
    
    const shipTypes: ('rocket' | 'ufo' | 'satellite')[] = ['rocket', 'ufo', 'satellite'];
    
    // Ensure equal distribution from all edges
    for (let i = 0; i < shipCount; i++) {
      // Force distribution from all 4 edges evenly
      const edge = i % 4; // 0=top, 1=right, 2=bottom, 3=left
      let x, y, angle;
      
      switch (edge) {
        case 0: // top
          x = Math.random() * dimensions.width;
          y = -50;
          angle = Math.random() * 80 - 40; // -40 to 40 degrees (wider angle)
          break;
        case 1: // right
          x = dimensions.width + 50;
          y = Math.random() * dimensions.height;
          angle = Math.random() * 80 + 140; // 140 to 220 degrees
          break;
        case 2: // bottom
          x = Math.random() * dimensions.width;
          y = dimensions.height + 50;
          angle = Math.random() * 80 + 200; // 200 to 280 degrees
          break;
        default: // left (case 3)
          x = -50;
          y = Math.random() * dimensions.height;
          angle = Math.random() * 80 + 320; // 320 to 400 degrees
          break;
      }
      
      newSpaceships.push({
        id: i,
        type: shipTypes[Math.floor(Math.random() * shipTypes.length)],
        x,
        y,
        size: Math.random() * 20 + 15, // 15-35px (slightly larger)
        speed: Math.random() * 1.5 + 0.5, // 0.5-2 Speed factor (faster)
        angle,
        duration: Math.random() * 15 + 15, // 15-30 seconds (faster)
        delay: Math.random() * 5, // 0-10 second delay (shorter)
        opacity: Math.random() * 0.4 + 0.4, // 0.4-0.8 opacity (more visible)
        flip: Math.random() > 0.5,
        initialEdge: edge,
      });
    }
    
    setSpaceships(newSpaceships);
  }, [dimensions]);

  // Return early if we haven't mounted yet
  if (!hasMounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      style={{ 
        opacity: isDarkMode ? 1 : 0.3
      }}
    >
      {/* Spaceships */}
      {spaceships.map(ship => (
        <div
          key={ship.id}
          className="absolute"
          style={{
            left: `${ship.x}px`,
            top: `${ship.y}px`,
            opacity: ship.opacity,
            transform: `rotate(${ship.angle}deg) ${ship.flip ? 'scaleX(-1)' : ''}`,
            animation: `spaceship-move ${ship.duration}s linear ${ship.delay}s infinite`,
            // Add these CSS variables needed for the animation
            '--angle': `${ship.angle}deg`,
            '--flip': ship.flip ? 'scaleX(-1)' : '',
            // Calculate distance based on initial edge to ensure ships move across the entire screen
            '--distance-x': getDistanceX(ship.initialEdge, dimensions.width, ship.angle),
            '--distance-y': getDistanceY(ship.initialEdge, dimensions.height, ship.angle),
            '--base-opacity': ship.opacity.toString(),
          } as React.CSSProperties}
        >
          {ship.type === 'rocket' && (
            <svg width={ship.size} height={ship.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9 7 7 9 2 12C7 15 9 17 12 22C15 17 17 15 22 12C17 9 15 7 12 2Z" 
                stroke={isDarkMode ? "white" : "black"} 
                strokeWidth="1.5" 
                fill={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
              <path d="M12 22V18" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M2 12H6" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M18 12H22" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M12 6V2" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
            </svg>
          )}
          
          {ship.type === 'ufo' && (
            <svg width={ship.size} height={ship.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="12" rx="8" ry="3" 
                stroke={isDarkMode ? "white" : "black"} 
                fill={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                strokeWidth="1.5" />
              <path d="M12 9V6" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M7 10.5L5 8" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M17 10.5L19 8" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M8 12L8 15" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M12 12L12 15" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M16 12L16 15" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
            </svg>
          )}
          
          {ship.type === 'satellite' && (
            <svg width={ship.size} height={ship.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="9" width="12" height="6" 
                stroke={isDarkMode ? "white" : "black"} 
                fill={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                strokeWidth="1.5" />
              <path d="M2 12H4" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M20 12H22" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M4 7L6 9" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M18 9L20 7" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M4 17L6 15" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
              <path d="M18 15L20 17" stroke={isDarkMode ? "white" : "black"} strokeWidth="1.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// Helper functions to calculate proper distances for each edge type
function getDistanceX(edge: number, width: number, angle: number): string {
  const angleRad = angle * Math.PI / 180;
  const distance = Math.max(width, window.innerHeight) * 2;
  
  switch (edge) {
    case 0: // top
      return `${distance * Math.sin(angleRad)}px`;
    case 1: // right
      return `${-distance * 1.5}px`;
    case 2: // bottom
      return `${distance * Math.sin(angleRad)}px`;
    default: // left
      return `${distance * 1.5}px`;
  }
}

function getDistanceY(edge: number, height: number, angle: number): string {
  const angleRad = angle * Math.PI / 180;
  const distance = Math.max(height, window.innerWidth) * 2;
  
  switch (edge) {
    case 0: // top
      return `${distance * 1.5}px`;
    case 1: // right
      return `${distance * Math.sin(angleRad)}px`;
    case 2: // bottom
      return `${-distance * 1.5}px`;
    default: // left
      return `${distance * Math.sin(angleRad)}px`;
  }
}