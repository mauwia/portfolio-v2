"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-up"
}

export default function AnimatedSection({ children, delay = 0, animation = "fade-up" }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const getAnimationClasses = () => {
    switch (animation) {
      case "fade-up":
        return `transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`
      case "fade-in":
        return `transition-opacity duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`
      case "slide-in":
        return `transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`
      case "scale-up":
        return `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
      default:
        return `transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`
    }
  }

  return (
    <div ref={sectionRef} className={getAnimationClasses()}>
      {children}
    </div>
  )
}
