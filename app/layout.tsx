import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import ActiveSectionIndicator from "@/components/active-section-indicator"
import MobileNav from "@/components/mobile-nav"
import ResumeButton from "@/components/resume-button"
import MusicPlayer from "@/components/music-player"
import StarryBackground from "@/components/starry-background"
import SpaceShips from "@/components/space-ships"
import SidebarNav from "@/components/sidebar-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <StarryBackground />
          <SpaceShips />
          <SidebarNav />
          <header className="sticky top-0 z-10 w-full bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center pl-4 md:pl-24">
              <Link href="/" className="font-medium text-white tracking-widest text-xl">
                {siteConfig.name.toUpperCase()}
              </Link>
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex items-center gap-6">
                  {/* <a href="#about" className="text-white hover:text-primary transition-colors text-sm tracking-wider">
                    ABOUT
                  </a>
                  <a href="#projects" className="text-gray-400 hover:text-primary transition-colors text-sm tracking-wider">
                    PROJECTS
                  </a>
                  <a href="#work" className="text-gray-400 hover:text-primary transition-colors text-sm tracking-wider">
                    WORK
                  </a> */}
                </nav>
                <div className="flex items-center gap-3">
                  <ResumeButton />
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>
          {/* <ActiveSectionIndicator /> */}
          <div className="flex-1 md:pl-20">{children}</div>
          <MusicPlayer src="/music/background-music.mp3" />
        </ThemeProvider>
      </body>
    </html>
  )
}
