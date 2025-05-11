"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterFormProps {
  buttonText: string
}

export default function NewsletterForm({ buttonText }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // This is where you would normally send the email to your API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {isSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-800 dark:text-green-300">
          Thanks for subscribing! Check your email for confirmation.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
            aria-label="Email address"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : buttonText}
          </Button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
