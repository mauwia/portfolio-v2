export interface ContributionDay {
  date: string // YYYY-MM-DD
  count: number
  level: number // 0-4, GitHub's own intensity bucket
}

export interface Contributions {
  total: number
  days: ContributionDay[]
}

function attr(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`))
  return match ? match[1] : null
}

/**
 * Reads the last year of public contributions from the calendar GitHub renders
 * on a profile page. No token needed. Returns null if GitHub is unreachable or
 * the markup changes, so the caller can simply hide the section.
 */
export async function getContributions(username: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
      headers: { "x-requested-with": "XMLHttpRequest" },
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!res.ok) return null
    const html = await res.text()

    // Counts live in the tooltips, keyed by the id of the day cell they describe.
    const counts = new Map<string, number>()
    for (const m of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>\s*([^<]*)/g)) {
      const n = m[2].match(/^([\d,]+)\s+contribution/)
      counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0)
    }

    const days: ContributionDay[] = []
    for (const m of html.matchAll(/<td[^>]*\sdata-date="[^"]*"[^>]*>/g)) {
      const tag = m[0]
      const date = attr(tag, "data-date")
      if (!date) continue
      const level = Number(attr(tag, "data-level") ?? 0)
      const id = attr(tag, "id")
      // If a tooltip is missing, fall back to the level so the bar still shows.
      const count = (id ? counts.get(id) : undefined) ?? level
      days.push({ date, count, level })
    }
    if (days.length === 0) return null

    days.sort((a, b) => a.date.localeCompare(b.date))
    return { total: days.reduce((sum, d) => sum + d.count, 0), days }
  } catch {
    return null
  }
}
