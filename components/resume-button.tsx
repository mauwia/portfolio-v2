"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function ResumeButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={siteConfig.resume.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 transition-all duration-300 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
      >
        <span>{siteConfig.resume.label}</span>
        <Download
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? "transform translate-y-0.5" : ""}`}
        />
      </Button>
      <span
        className={`absolute -bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white transform origin-left transition-transform duration-300 ${
          isHovered ? "scale-x-100" : "scale-x-0"
        }`}
      ></span>
    </a>
  )
}
