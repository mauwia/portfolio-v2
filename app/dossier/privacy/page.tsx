import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dossier – Privacy policy",
  description: "How the self-hosted Dossier app handles Google user data.",
}

export default function DossierPrivacyPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold">Dossier privacy policy</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Last updated 16 November 2026</p>
      <p>
        <Link className="underline" href="/dossier">
          Dossier
        </Link>{" "}
        is a self-hosted app used only by its owner, on the owner&apos;s own computer. This policy covers the
        Google user data it accesses when the owner connects a Google account.
      </p>
      <h2 className="text-xl font-medium">What Dossier accesses, and why</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Basic profile (openid, email):</strong> to show which Google account is connected.
        </li>
        <li>
          <strong>Gmail send (gmail.send):</strong> to send job-application emails the owner writes and approves.
        </li>
        <li>
          <strong>Gmail read-only (gmail.readonly):</strong> to find replies to those applications.
        </li>
        <li>
          <strong>Calendar (calendar.freebusy, calendar.events):</strong> to check free time and add interview
          events.
        </li>
      </ul>
      <h2 className="text-xl font-medium">Where the data goes</h2>
      <p>
        Data stays on the owner&apos;s computer, in a local database. Dossier has no server of its own, uses no
        analytics, and does not sell, share or transfer Google user data to anyone. It is not used for advertising
        or to train AI models.
      </p>
      <p>
        Dossier&apos;s use of information received from Google APIs adheres to the{" "}
        <a className="underline" href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
      <h2 className="text-xl font-medium">Removing access</h2>
      <p>
        Access can be revoked at any time at{" "}
        <a className="underline" href="https://myaccount.google.com/permissions">
          myaccount.google.com/permissions
        </a>{" "}
        or with Disconnect in Dossier&apos;s settings. Deleting the local database removes all stored data.
      </p>
      <h2 className="text-xl font-medium">Contact</h2>
      <p>
        Questions can go to the owner through the links on{" "}
        <Link className="underline" href="/">
          dev-mavia.vercel.app
        </Link>
        .
      </p>
    </main>
  )
}
