"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Add smooth scrolling to all hash links
  useEffect(() => {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Offset for the sticky header
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      })
    })

    // Show/hide scroll to top button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`fixed bottom-6 right-20 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Button 
        onClick={scrollToTop} 
        variant="outline"
        size="icon" 
        className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-accent" 
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
