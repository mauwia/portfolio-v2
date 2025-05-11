"use client"

import { useState } from "react"
import { Menu, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px]">
        <div className="flex flex-col gap-6 mt-8">
          <a href="#about" className="text-lg font-medium" onClick={handleLinkClick}>
            about
          </a>
          <a href="#projects" className="text-lg font-medium" onClick={handleLinkClick}>
            projects
          </a>
          <a href="#work" className="text-lg font-medium" onClick={handleLinkClick}>
            work
          </a>
          <a href="#newsletter" className="text-lg font-medium" onClick={handleLinkClick}>
            newsletter
          </a>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <a
              href={siteConfig.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg font-medium"
              onClick={handleLinkClick}
            >
              <Download className="w-4 h-4" />
              {siteConfig.resume.label}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
