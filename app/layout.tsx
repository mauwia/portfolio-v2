import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"
import ActiveSectionIndicator from "@/components/active-section-indicator"
import MobileNav from "@/components/mobile-nav"
import ResumeButton from "@/components/resume-button"
import MusicPlayer from "@/components/music-player"

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-sm dark:bg-black/80">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="font-medium">
                {siteConfig.name}
              </Link>
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#about" className="text-black dark:text-white text-sm transition-colors">
                    about
                  </a>
                  <a
                    href="#projects"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white text-sm transition-colors"
                  >
                    projects
                  </a>
                  <a
                    href="#work"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white text-sm transition-colors"
                  >
                    work
                  </a>
                  {/* <a
                    href="#newsletter"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white text-sm transition-colors"
                  >
                    newsletter
                  </a> */}
                </nav>
                <div className="flex items-center gap-3">
                  <ResumeButton />
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>
          <ActiveSectionIndicator />
          <div className="flex-1">{children}</div>
          <MusicPlayer src="/music/background-music.mp3" />
        </ThemeProvider>
      </body>
    </html>
  )
}
