import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dossier",
  description: "A self-hosted, single-user job-search app that runs on its owner's own computer.",
}

export default function DossierPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold">Dossier</h1>
      <p>
        Dossier is a self-hosted job-search app that runs only on its owner&apos;s own computer
        (localhost). It is a personal fork of the open-source{" "}
        <a className="underline" href="https://github.com/AienTech/dossier">
          AienTech/dossier
        </a>{" "}
        project (AGPL-3.0). It is not offered as a public service, and there are no accounts to sign up for.
      </p>
      <h2 className="text-xl font-medium">Why it signs in with Google</h2>
      <p>The owner connects their own Google account so that Dossier can:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>send application emails from the owner&apos;s Gmail,</li>
        <li>read replies to those applications in the owner&apos;s Gmail (read-only),</li>
        <li>check free/busy time and add interview events to the owner&apos;s Google Calendar.</li>
      </ul>
      <p>
        See the{" "}
        <Link className="underline" href="/dossier/privacy">
          privacy policy
        </Link>{" "}
        for how that data is handled.
      </p>
    </main>
  )
}
