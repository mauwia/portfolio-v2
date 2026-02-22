"use client"

import { useState, useEffect } from "react"
import { Home, Grid, Briefcase } from "lucide-react"

const navItems = [
  { name: "Home", href: "#about", icon: Home },
  { name: "Projects", href: "#projects", icon: Grid },
  { name: "Work", href: "#work", icon: Briefcase },
]

export default function SidebarNav() {
  const [activeHash, setActiveHash] = useState("#about")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      let currentActiveHash = navItems[0].href
      for (const section of sections) {
        if (section instanceof HTMLElement) {
          if (section.offsetTop <= scrollPosition) {
            currentActiveHash = `#${section.id}`
          }
        }
      }
      setActiveHash(currentActiveHash)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-full animate-in fade-in slide-in-from-left-4 duration-700">
      {navItems.map((item) => {
        const isActive = activeHash === item.href
        return (
          <a
            key={item.name}
            href={item.href}
            className="group relative flex items-center justify-center p-3 rounded-full transition-all duration-300 hover:bg-white/10"
            onClick={() => setActiveHash(item.href)}
          >
            <item.icon
              className={`w-5 h-5 z-10 transition-colors duration-300 ${
                isActive ? "text-primary" : "text-white/60 group-hover:text-white"
              }`}
            />
            {isActive && (
              <div
                className="absolute inset-0 border border-primary rounded-full shadow-[0_0_10px_rgba(255,114,37,0.5)] transition-all duration-300"
              />
            )}
            
            <div className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
              {item.name}
            </div>
          </a>
        )
      })}
    </nav>
  )
}
