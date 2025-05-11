"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { siteConfig } from "@/config/site"

export default function AnimatedIdCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })

  // Initialize animation after component mounts
  useEffect(() => {
    setIsMounted(true)

    // Add floating animation
    const floatInterval = setInterval(() => {
      if (!isHovered) {
        setPosition({
          x: Math.sin(Date.now() / 1000) * 5,
          y: Math.cos(Date.now() / 1500) * 5,
        })
      }
    }, 50)

    return () => clearInterval(floatInterval)
  }, [isHovered])

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotation({ x: rotateX, y: rotateY })
    setGlowPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      className="relative w-64 h-96 select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
      }}
    >
      <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 rotate-90 origin-top-right translate-x-full text-xs font-medium tracking-wider z-10">
        {/* DARK MODE */}
      </div>
      <div
        ref={cardRef}
        className={`w-64 h-96 bg-black rounded-lg flex items-center justify-center p-4 relative overflow-hidden shadow-xl ${
          isMounted ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse-following glow effect */}
        {isHovered && (
          <div
            className="absolute w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none"
            style={{
              left: `${glowPosition.x - 80}px`,
              top: `${glowPosition.y - 80}px`,
              transition: "left 0.1s, top 0.1s",
            }}
          />
        )}

        {/* Animated dots pattern */}
        <div className="absolute bottom-0 right-0 grid grid-cols-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-white/20 rounded-full"
              style={{
                animation: `pulse 3s infinite ${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Animated shine effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0"
          style={{
            animation: "shine 8s infinite",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Card content */}
        <div className="text-white text-center space-y-2 z-10">
          <h2 className="text-3xl font-bold animate-text-shimmer">{siteConfig.name.toUpperCase()}</h2>
          <p className="text-sm">I like building cool stuff</p>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 border-2 border-white/10 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute inset-0 border-t-2 border-l-2 border-white/20 rounded-tl-lg animate-border-flow" />
        </div>
      </div>
    </div>
  )
}
