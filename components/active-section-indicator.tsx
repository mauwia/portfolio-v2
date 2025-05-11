"use client"

import { useEffect, useState } from "react"

export default function ActiveSectionIndicator() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px", // Adjust this to change when the section is considered "active"
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)

          // Update the active class on navigation links
          document.querySelectorAll("nav a").forEach((link) => {
            const href = link.getAttribute("href")
            if (href === `#${entry.target.id}`) {
              link.classList.add("text-black", "dark:text-white")
              link.classList.remove("text-gray-600", "dark:text-gray-400")
            } else {
              link.classList.remove("text-black", "dark:text-white")
              link.classList.add("text-gray-600", "dark:text-gray-400")
            }
          })
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return null
}
