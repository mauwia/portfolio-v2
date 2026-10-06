"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

/*
 * Welcome screen with a rocket launch.
 *
 * The site itself (#site-root) starts blurred, dimmed and slightly zoomed via
 * html[data-splash="on"]. On "lift off" the rocket shakes, ignites, detaches
 * and climbs off screen with accelerating motion and an exhaust trail drawn
 * on a canvas. While it climbs, html[data-splash] switches to "leaving" and
 * the site pulls into focus like a camera lens.
 *
 * The click is also the user interaction browsers require before audio may
 * play: the music player's first-interaction listener starts the music.
 * "drift in silence" carries data-music-skip, which the player ignores.
 */

const RUMBLE_MS = 320;
const FOCUS_DELAY_MS = 380; // after ignition
const CLEANUP_MS = 2200; // after ignition; trail smoke has faded by then

type Particle = { x: number; y: number; vx: number; vy: number; born: number; life: number; size: number; hot: boolean };

function RocketSvg({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 56" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="rk-body" x1="0" x2="1">
          <stop offset="0" stopColor="#c7d2fe" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a5b4fc" />
        </linearGradient>
      </defs>
      <path d="M16 1 C24 9 26 20 25 34 L7 34 C6 20 8 9 16 1 Z" fill="url(#rk-body)" />
      <path d="M16 1 C20 5 22 9 23 13 L9 13 C10 9 12 5 16 1 Z" fill="#818cf8" />
      <circle cx="16" cy="21" r="4" fill="#1e1b4b" stroke="#c7d2fe" strokeWidth="1.5" />
      <path d="M7 26 L1 38 L7 35 Z" fill="#6366f1" />
      <path d="M25 26 L31 38 L25 35 Z" fill="#6366f1" />
      <rect x="11" y="34" width="10" height="4" rx="1" fill="#475569" />
    </svg>
  );
}

function Flame({ className }: { className?: string }) {
  return (
    <span className={`rk-flame ${className ?? ""}`} aria-hidden="true">
      <span className="rk-flame-outer" />
      <span className="rk-flame-inner" />
    </span>
  );
}

export default function SplashOverlay() {
  const [phase, setPhase] = useState<"idle" | "rumble" | "flying" | "done">("idle");
  const [quiet, setQuiet] = useState(false); // "drift in silence": no rocket
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dockedRef = useRef<HTMLSpanElement | null>(null);
  const flyerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  // Lock scroll and focus the main button while the screen is up.
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (phase === "idle") buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const setSplash = (v: "on" | "leaving" | "off") => document.documentElement.setAttribute("data-splash", v);

  const finish = () => {
    setSplash("off");
    setPhase("done");
  };

  const driftIn = () => {
    if (phase !== "idle") return;
    setQuiet(true);
    setSplash("leaving");
    window.setTimeout(finish, 1300);
  };

  const liftOff = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setQuiet(true);
      setSplash("leaving");
      window.setTimeout(finish, 1300);
      return;
    }
    setPhase("rumble");
    window.setTimeout(() => launch(), RUMBLE_MS);
  };

  const launch = () => {
    const docked = dockedRef.current;
    const canvas = canvasRef.current;
    if (!docked || !canvas) return finish();

    const r = docked.getBoundingClientRect();
    const startX = r.left + r.width / 2;
    const startY = r.top + r.height / 2;
    setPhase("flying");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return finish();
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const t0 = performance.now();
    const climb = startY + 260; // distance until fully off screen
    const accel = (2 * climb) / 1.15 ** 2; // px/s² so it exits in ~1.15 s
    let lastNozzle: { x: number; y: number } | null = null;
    let focused = false;

    const step = (now: number) => {
      const t = (now - t0) / 1000;
      // Position: constant acceleration upwards, a tiny sway, growing scale.
      const y = startY - 0.5 * accel * t * t;
      const x = startX + Math.sin(t * 9) * 2 * Math.min(1, t * 3);
      const scale = 1 + Math.min(1, t / 0.55) * 2.4;
      const flyer = flyerRef.current;
      if (flyer) flyer.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;

      if (!focused && now - t0 > FOCUS_DELAY_MS) {
        focused = true;
        setSplash("leaving");
      }

      // Emit exhaust along the whole path the nozzle covered since the last
      // frame, so a fast rocket leaves a continuous trail instead of dots.
      const nozzle = { x, y: y + 12 * scale };
      if (y > -120) {
        const from = lastNozzle ?? nozzle;
        const dist = Math.hypot(nozzle.x - from.x, nozzle.y - from.y);
        const n = Math.max(3, Math.ceil(dist / 2.5));
        for (let i = 0; i < n; i++) {
          const f = i / n;
          const px = from.x + (nozzle.x - from.x) * f;
          const py = from.y + (nozzle.y - from.y) * f;
          const hot = Math.random() < 0.5;
          particles.push({
            x: px + (Math.random() - 0.5) * 5 * scale,
            y: py,
            vx: (Math.random() - 0.5) * (hot ? 40 : 110),
            vy: 40 + Math.random() * 90,
            born: now - f * 16,
            life: hot ? 220 + Math.random() * 220 : 900 + Math.random() * 900,
            size: hot ? 2.5 + Math.random() * 3 * (scale / 2) : 4 + Math.random() * 6,
            hot,
          });
        }
      }
      lastNozzle = nozzle;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.born;
        if (age > p.life) {
          particles.splice(i, 1);
          continue;
        }
        const k = age / p.life;
        const dt = 1 / 60;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.97;
        p.vy *= 0.94;
        const radius = p.size * (p.hot ? 1 - k * 0.6 : 1 + k * 4);
        const alpha = (1 - k) * (1 - k) * (p.hot ? 0.9 : 0.24);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        if (p.hot) {
          g.addColorStop(0, `rgba(255,250,220,${alpha})`);
          g.addColorStop(0.4, `rgba(255,170,60,${alpha * 0.8})`);
          g.addColorStop(1, "rgba(255,90,30,0)");
        } else {
          g.addColorStop(0, `rgba(200,205,235,${alpha})`);
          g.addColorStop(1, "rgba(160,170,210,0)");
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (now - t0 < CLEANUP_MS) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  if (phase === "done") return null;

  const leaving = phase === "flying" || quiet;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Welcome"
        className="splash-veil fixed inset-0 z-[100] flex items-center justify-center"
        data-leaving={leaving ? "true" : "false"}
      >
        <div className={`splash-copy px-6 text-center text-white max-w-xl space-y-6 ${phase === "rumble" ? "rk-shake-soft" : ""}`}>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">welcome to the void</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            {siteConfig.description}
          </h1>
          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              ref={buttonRef}
              type="button"
              onClick={liftOff}
              className={`liftoff-btn group inline-flex items-center gap-3 rounded-full border border-indigo-200/40 bg-white/10 pl-7 pr-5 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-white/20 hover:scale-105 transition-[background-color,transform] duration-300 ${
                phase === "rumble" ? "is-igniting" : ""
              }`}
            >
              lift off
              <span
                ref={dockedRef}
                className={`relative inline-flex h-6 w-4 items-center justify-center ${phase === "rumble" ? "rk-shake" : "rk-idle"}`}
                style={{ visibility: phase === "flying" ? "hidden" : "visible" }}
              >
                <RocketSvg className="h-6 w-auto" />
                {phase === "rumble" && <Flame className="rk-flame-docked" />}
              </span>
            </button>
            <button
              type="button"
              data-music-skip
              onClick={driftIn}
              className="text-xs text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors"
            >
              drift in silence
            </button>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[101] h-full w-full" />

      {phase === "flying" && (
        <div ref={flyerRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[102] flex flex-col items-center">
          <RocketSvg className="h-6 w-auto drop-shadow-[0_0_6px_rgba(165,180,252,0.9)]" />
          <Flame className="rk-flame-flying" />
        </div>
      )}
    </>
  );
}
