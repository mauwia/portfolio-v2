"use client"

import { useEffect, useRef, useState } from "react"
import type { ContributionDay } from "@/lib/github-contributions"

// World units: each day is a 1x1 cell on the ground. Weeks run along x,
// weekdays along z (Saturday nearest the viewer), height along y.
const MAX_H = 6
const BAR = 0.74 // bar footprint within its cell
const RISE_MS = 900
const STAGGER_MS = 14 // extra delay per week, so the rise sweeps left to right

const START_YAW = -0.18
const PITCH = 0.4 // how far the camera looks down
const SPIN = (Math.PI * 2) / 21000 // radians per ms: one full turn in 21s

type RGB = [number, number, number]
// Base colour per GitHub intensity level (1-4). On a dark page busier days
// are brighter; on a light page they are deeper, so they stand out either way.
const BASE_DARK: RGB[] = [
  [67, 56, 202],
  [88, 84, 236],
  [118, 122, 246],
  [165, 176, 252],
]
const BASE_LIGHT: RGB[] = [
  [190, 200, 253],
  [150, 163, 250],
  [104, 108, 242],
  [72, 62, 214],
]
// Fixed light: each wall direction gets its own brightness, so the shading
// shifts as the model turns.
const WALLS = [
  { nx: 1, nz: 0, light: 0.62 },
  { nx: -1, nz: 0, light: 0.84 },
  { nx: 0, nz: 1, light: 0.72 },
  { nx: 0, nz: -1, light: 0.5 },
]
// Windows: two per floor on every wall. Positions are fractions across the
// wall; heights are in world units.
const WINDOW_COLS = [
  [0.16, 0.42],
  [0.58, 0.84],
]
const FLOOR_H = 0.5
const WINDOW_H = 0.27
const WINDOW_BASE = 0.2 // height of the first row's sill
const LIT_SHARE = 38 // percent of windows with the lights on

// Stable pseudo-random 0-99 per window, so the same ones stay lit every frame.
const windowSeed = (bar: number, wall: number, row: number, col: number) =>
  (Math.imul(bar + 1, 73856093) ^ Math.imul(wall + 1, 19349663) ^ Math.imul(row + 1, 83492791) ^ Math.imul(col + 1, 2654435761)) >>> 0

// Below Tailwind's `sm` breakpoint, show this many of the most recent weeks.
const NARROW_QUERY = "(max-width: 639px)"
const NARROW_WEEKS = 22

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const rgb = (c: RGB, mul: number, toWhite = 0) =>
  `rgb(${c.map((v) => Math.round(v * mul + (255 - v * mul) * toWhite)).join(",")})`

function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  const weekday = WEEKDAYS[new Date(`${date}T00:00:00Z`).getUTCDay()]
  return `${weekday}, ${d} ${MONTHS[m - 1]} ${y}`
}

type Point = [number, number]

function inside(poly: Point[], px: number, py: number) {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

interface Tip {
  x: number
  y: number
  day: ContributionDay
}

export default function GithubSkyline({ days }: { days: ContributionDay[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx || days.length === 0) return

    // ---- layout -----------------------------------------------------------
    // A full year is 53 weeks wide: fine on a desktop, unreadably small on a
    // phone. Narrow screens show only the most recent weeks, at a usable size.
    const narrow = window.matchMedia(NARROW_QUERY)
    type Bar = { day: ContributionDay; week: number; x: number; z: number; h: number }
    let weeks = 0
    let bars: Bar[] = []
    let monthLabels: { x: number; label: string }[] = []
    let order: { index: number; depth: number }[] = []

    function layout() {
      const fullOffset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
      const fullWeeks = Math.ceil((days.length + fullOffset) / 7)
      // Cut on a week boundary, so the first column shown is a whole week.
      const firstWeek = narrow.matches ? Math.max(0, fullWeeks - NARROW_WEEKS) : 0
      const shown = days.slice(Math.max(0, firstWeek * 7 - fullOffset))

      const offset = new Date(`${shown[0].date}T00:00:00Z`).getUTCDay()
      weeks = Math.ceil((shown.length + offset) / 7)
      const max = Math.max(1, ...shown.map((d) => d.count))
      bars = shown.map((day, i) => {
        const week = Math.floor((i + offset) / 7)
        return {
          day,
          week,
          x: week - (weeks - 1) / 2,
          z: ((i + offset) % 7) - 3,
          // Compress the range a little so one huge day doesn't flatten the rest.
          h: day.count === 0 ? 0 : 0.4 + (MAX_H - 0.4) * Math.pow(day.count / max, 0.6),
        }
      })
      monthLabels = []
      let lastMonth = -1
      let lastLabelWeek = -99
      for (const bar of bars) {
        const month = Number(bar.day.date.slice(5, 7)) - 1
        if (month !== lastMonth) {
          if (bar.week - lastLabelWeek >= 3) {
            monthLabels.push({ x: bar.x, label: MONTHS[month] })
            lastLabelWeek = bar.week
          }
          lastMonth = month
        }
      }
      order = bars.flatMap((bar, index) => (bar.day.count === 0 ? [] : [{ index, depth: 0 }]))
    }
    layout()

    // ---- state ------------------------------------------------------------
    let yaw = START_YAW
    let width = 0
    let height = 0
    let riseStart: number | null = null // set when the section first scrolls into view
    let visible = false // only spin while on screen
    let paused = false // the mouse is on a building, so hold still for the tooltip
    let pointer: Point | null = null // mouse position over the canvas, if any
    let ink = "" // the page's text colour, for labels
    let dark = true // which theme the page is in
    let lastFrame = 0
    let hovered = -1
    let tipTimer = 0
    let frame = 0
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Screen-space faces from the last draw, nearest bar last, for hit-testing.
    let drawn: { index: number; faces: Point[][] }[] = []

    const requestDraw = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    function draw(now: number) {
      frame = 0
      const spinning = visible && !paused && !still
      if (spinning && lastFrame) yaw += Math.min(64, now - lastFrame) * SPIN
      lastFrame = spinning ? now : 0

      const dpr = Math.min(2, window.devicePixelRatio || 1)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, width, height)

      const sinY = Math.sin(yaw)
      const cosY = Math.cos(yaw)
      const sinP = Math.sin(PITCH)
      const cosP = Math.cos(PITCH)
      // Orthographic view: turn about the vertical axis, then tilt the camera down.
      const flat = (x: number, y: number, z: number): Point => {
        const z1 = -x * sinY + z * cosY
        return [x * cosY + z * sinY, y * cosP - z1 * sinP]
      }

      // One fixed scale that fits the model at every angle of the turn, so it
      // doesn't grow and shrink as it spins. `reach` is the farthest corner.
      const reach = Math.hypot(weeks / 2, 3.5)
      const padX = 14, padTop = 8, padBottom = 26
      const tall = 2 * reach * sinP + MAX_H * cosP
      const scale = Math.min((width - padX * 2) / (2 * reach), (height - padTop - padBottom) / tall)
      const originX = width / 2
      const originY = padTop + (height - padTop - padBottom - scale * tall) / 2 + scale * (reach * sinP + MAX_H * cosP)
      const project = (x: number, y: number, z: number): Point => {
        const [px, pu] = flat(x, y, z)
        return [originX + px * scale, originY - pu * scale]
      }

      const quad = (pts: Point[]) => {
        ctx!.beginPath()
        ctx!.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i][0], pts[i][1])
        ctx!.closePath()
      }

      const elapsed = riseStart === null ? -1 : now - riseStart
      const half = BAR / 2

      // Empty days: faint tiles on the ground, all in one path. They lie flat,
      // so they can never cover a building and are simply drawn first.
      ctx!.beginPath()
      for (const bar of bars) {
        if (bar.day.count !== 0) continue
        const a = project(bar.x - half, 0, bar.z - half)
        const b = project(bar.x + half, 0, bar.z - half)
        const c = project(bar.x + half, 0, bar.z + half)
        const d = project(bar.x - half, 0, bar.z + half)
        ctx!.moveTo(a[0], a[1])
        ctx!.lineTo(b[0], b[1])
        ctx!.lineTo(c[0], c[1])
        ctx!.lineTo(d[0], d[1])
        ctx!.closePath()
      }
      // White tiles on dark; on light, indigo ones strong enough to read as ground.
      ctx!.fillStyle = dark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.10)"
      ctx!.strokeStyle = dark ? "rgba(255,255,255,0.16)" : "rgba(99,102,241,0.30)"
      ctx!.lineWidth = 0.5
      ctx!.fill()
      ctx!.stroke()

      // Buildings, by painter's algorithm: farthest ground cell first.
      for (const entry of order) entry.depth = -bars[entry.index].x * sinY + bars[entry.index].z * cosY
      order.sort((a, b) => a.depth - b.depth)

      drawn = []
      ctx!.lineJoin = "round"
      const palette = dark ? BASE_DARK : BASE_LIGHT
      const rise = scale * cosP // screen pixels per world unit of height
      // Night: warm lamps and dark panes. Day: bright reflections and tinted glass.
      const windowLit = dark ? "rgba(253,224,138,0.92)" : "rgba(255,255,255,0.8)"
      const windowDark = dark ? "rgba(8,8,32,0.38)" : "rgba(49,46,129,0.2)"
      ctx!.strokeStyle = dark ? "rgba(11,11,26,0.5)" : "rgba(255,255,255,0.75)"
      ctx!.lineWidth = 0.6
      for (const { index } of order) {
        const bar = bars[index]
        const t = Math.min(1, Math.max(0, (elapsed - bar.week * STAGGER_MS) / RISE_MS))
        const h = bar.h * (1 - Math.pow(1 - t, 3))
        const x0 = bar.x - half, x1 = bar.x + half, z0 = bar.z - half, z1 = bar.z + half
        const roof = [project(x0, h, z0), project(x1, h, z0), project(x1, h, z1), project(x0, h, z1)]
        const faces: Point[][] = [roof]
        const base = palette[Math.min(4, Math.max(1, bar.day.level)) - 1]
        // The hovered building lights up on dark and deepens on light.
        const isHovered = index === hovered
        const glow = isHovered && dark ? 0.35 : 0
        const dim = isHovered && !dark ? 0.72 : 1

        if (h > 0.001) {
          for (let w = 0; w < WALLS.length; w++) {
            const wall = WALLS[w]
            // Only walls turned towards the viewer are visible.
            if (-wall.nx * sinY + wall.nz * cosY <= 0) continue
            const [ax, az, bx, bz] = wall.nx
              ? [wall.nx > 0 ? x1 : x0, z0, wall.nx > 0 ? x1 : x0, z1]
              : [x0, wall.nz > 0 ? z1 : z0, x1, wall.nz > 0 ? z1 : z0]
            const face = [project(ax, 0, az), project(bx, 0, bz), project(bx, h, bz), project(ax, h, az)]
            quad(face)
            ctx!.fillStyle = rgb(base, (dark ? wall.light : 0.55 + wall.light * 0.45) * dim, glow)
            ctx!.fill()
            faces.push(face)

            // Windows, as two paths (lit and unlit) so each wall costs two fills.
            const [a, b] = face
            const ex = b[0] - a[0]
            const ey = b[1] - a[1]
            const rows = Math.floor((h - WINDOW_BASE - 0.12) / FLOOR_H + (FLOOR_H - WINDOW_H) / FLOOR_H)
            for (const lit of [false, true]) {
              ctx!.beginPath()
              for (let row = 0; row < rows; row++) {
                const bottom = (WINDOW_BASE + row * FLOOR_H) * rise
                const top = bottom + WINDOW_H * rise
                for (let col = 0; col < WINDOW_COLS.length; col++) {
                  if ((windowSeed(index, w, row, col) % 100 < LIT_SHARE) !== lit) continue
                  const [u0, u1] = WINDOW_COLS[col]
                  ctx!.moveTo(a[0] + ex * u0, a[1] + ey * u0 - bottom)
                  ctx!.lineTo(a[0] + ex * u1, a[1] + ey * u1 - bottom)
                  ctx!.lineTo(a[0] + ex * u1, a[1] + ey * u1 - top)
                  ctx!.lineTo(a[0] + ex * u0, a[1] + ey * u0 - top)
                  ctx!.closePath()
                }
              }
              ctx!.fillStyle = lit ? windowLit : windowDark
              ctx!.fill()
            }
          }
        }
        quad(roof)
        ctx!.fillStyle = rgb(base, dim, (dark ? 0.28 : 0.3) + glow)
        ctx!.fill()
        ctx!.stroke()
        drawn.push({ index, faces })
      }

      // A building may have turned under a resting mouse: stop for it.
      if (pointer && !paused) pick()

      // Month names along whichever long edge currently faces the viewer.
      const edge = (cosY >= 0 ? 1 : -1) * 4.6
      ctx!.fillStyle = ink
      ctx!.globalAlpha = 0.45
      ctx!.font = "10px ui-sans-serif, system-ui, sans-serif"
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      let lastX = Infinity
      let lastY = Infinity
      for (const { x, label } of monthLabels) {
        const [lx, ly] = project(x, 0, edge)
        // Seen end-on the months bunch up: drop any that would sit on the last one.
        if (Math.abs(lx - lastX) < 26 && Math.abs(ly - lastY) < 12) continue
        ctx!.fillText(label, lx, ly + 6)
        lastX = lx
        lastY = ly
      }
      ctx!.globalAlpha = 1

      // Keep going while it spins, or until the last week has finished rising.
      if (spinning || (riseStart !== null && elapsed < RISE_MS + weeks * STAGGER_MS)) requestDraw()
    }

    const readTheme = () => {
      dark = document.documentElement.classList.contains("dark")
      ink = getComputedStyle(wrap).color
    }
    // The theme toggle flips a class on <html>: repaint in the new colours.
    const themeObserver = new MutationObserver(() => {
      readTheme()
      requestDraw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const resize = () => {
      width = wrap.clientWidth
      height = Math.max(250, Math.round(width * 0.5))
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      readTheme()
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.height = `${height}px`
      requestDraw()
    }

    // ---- interaction ------------------------------------------------------
    // Finds the building under the mouse. The spin holds only while there is one.
    function pick() {
      let found = -1
      if (pointer) {
        const [px, py] = pointer
        for (let i = drawn.length - 1; i >= 0 && found < 0; i--) {
          if (drawn[i].faces.some((face) => inside(face, px, py))) found = drawn[i].index
        }
      }
      paused = found >= 0
      if (found !== hovered) {
        hovered = found
        setTip(
          found < 0 ? null : { x: Math.min(width - 80, Math.max(80, pointer![0])), y: pointer![1], day: bars[found].day },
        )
      }
      requestDraw()
    }

    const locate = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect()
      return [e.clientX - rect.left, e.clientY - rect.top]
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      pointer = locate(e)
      pick()
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      pointer = null
      pick()
    }
    // Touch has no hover: a tap on a building holds it for a moment, then the spin resumes.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return
      pointer = locate(e)
      pick()
      window.clearTimeout(tipTimer)
      tipTimer = window.setTimeout(() => {
        pointer = null
        pick()
      }, 2500)
    }

    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointerleave", onLeave)

    // Crossing the phone/desktop breakpoint changes how many weeks are shown.
    const onBreakpoint = () => {
      layout()
      hovered = -1
      paused = false
      drawn = []
      setTip(null)
      requestDraw()
    }
    narrow.addEventListener("change", onBreakpoint)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    resize()

    // Bars stay flat until the skyline first scrolls into view, then rise.
    // The spin only runs while the skyline is on screen.
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && riseStart === null) riseStart = performance.now()
        requestDraw()
      },
      { threshold: 0.35 },
    )
    viewObserver.observe(wrap)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(tipTimer)
      resizeObserver.disconnect()
      viewObserver.disconnect()
      themeObserver.disconnect()
      narrow.removeEventListener("change", onBreakpoint)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointerleave", onLeave)
    }
  }, [days])

  if (days.length === 0) return null

  return (
    <div>
      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className="block w-full select-none"
          role="img"
          aria-label="GitHub contributions over the last year, drawn as a slowly rotating 3D skyline"
        />
        {tip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-center shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-black/85"
            style={{ left: tip.x, top: tip.y - 14 }}
          >
            <div className="text-lg font-bold leading-tight tabular-nums">{tip.day.count}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {tip.day.count === 1 ? "contribution" : "contributions"}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">{formatDate(tip.day.date)}</div>
          </div>
        )}
      </div>
      {/* Matches NARROW_QUERY: phones only get the most recent weeks. */}
      <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400 sm:hidden">last 5 months</p>
    </div>
  )
}
