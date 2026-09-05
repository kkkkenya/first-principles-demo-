import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./skin-b.css"
import { profile, roster } from "./roster"

// Skin B — PS2 BIOS / memory-card browser on the same spiral engine.
// Chrome ghost roster, memory-card inspector + rail, live system clock,
// drifting cubes, loading sweep, elastic edges.

function blip(freq = 660, dur = 0.06) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    blip.ctx = blip.ctx || new Ctx()
    const ctx = blip.ctx
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = "sine"
    o.frequency.value = freq
    g.gain.setValueAtTime(0.05, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + dur)
  } catch {
    /* audio unavailable — silent */
  }
}

const initials = (p) => p.lines.map((w) => w[0]).join("")
const kbOf = (p) => 384 + p.points.length * 256 + p.stack.length * 96
const fmt = (n) => n.toLocaleString("en-US")

export default function SkinB({ onExit }) {
  const [active, setActive] = useState(2)
  const [sfx, setSfx] = useState(false)
  const [crt, setCrt] = useState(true)
  const [about, setAbout] = useState(false)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(null)
  const [now, setNow] = useState(() => new Date())
  const scrollRef = useRef(null)
  const listRef = useRef(null)
  const rowsRef = useRef([])
  const smoothRef = useRef(new Map())
  const activeRef = useRef(active)
  activeRef.current = active

  const item = detail ?? loading ?? roster[active]
  const preview = roster[active]
  const sizes = useMemo(() => roster.map(kbOf), [])
  const used = useMemo(() => sizes.reduce((a, b) => a + b, 0), [sizes])
  const FREE = 8192 - used

  const cubes = useMemo(
    () =>
      [70, 42, 96, 30, 58, 84, 36, 64, 48, 76, 26, 52].map((s, i) => ({
        s,
        left: (i * 83) % 100,
        dur: 26 + ((i * 37) % 30),
        delay: -((i * 53) % 40),
        op: 0.35 + ((i * 29) % 50) / 100,
      })),
    []
  )

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // ---- 3D engine (lerped spiral) ----
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    let raf = 0
    let lastTop = scroller.scrollTop
    let py = 50
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const top = scroller.scrollTop
      const vel = Math.max(-40, Math.min(40, top - lastTop))
      lastTop = top
      py += (50 + vel * 1.6 - py) * 0.12
      scroller.style.setProperty("--py", `${py.toFixed(2)}%`)

      const vh = window.innerHeight
      const cy = vh / 2
      rowsRef.current.forEach((cell, i) => {
        if (!cell) return
        const r = cell.getBoundingClientRect()
        const dist = Math.abs(r.top + r.height / 2 - cy) / (vh / 2)
        const base = -45 + (1 - Math.min(dist * 1.35, 1)) * 33
        const target = i === activeRef.current ? -4 : base
        const prev = smoothRef.current.get(cell) ?? target
        const next = reduced ? target : prev + (target - prev) * 0.16
        smoothRef.current.set(cell, next)
        cell.style.setProperty("--ry", `${next.toFixed(2)}deg`)
      })
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ---- elastic overscroll ----
  useEffect(() => {
    const scroller = scrollRef.current
    const list = listRef.current
    if (!scroller || !list) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let pull = 0
    let raf = 0
    let releaseTimer = 0

    const render = () => {
      const o = Math.max(-260, Math.min(260, pull))
      if (o === 0) {
        list.style.transform = ""
        return
      }
      const squash = 1 - Math.min(Math.abs(o) / 1400, 0.06)
      list.style.transformOrigin = o >= 0 ? "50% 0%" : "50% 100%"
      list.style.transform = `translateY(${(o * 0.7).toFixed(1)}px) scaleY(${squash.toFixed(4)})`
    }
    const release = () => {
      pull = 0
      list.style.transition = reduced ? "" : "transform 0.65s cubic-bezier(0.22, 1.4, 0.36, 1)"
      list.style.transform = ""
      clearTimeout(releaseTimer)
      releaseTimer = setTimeout(() => {
        list.style.transition = ""
      }, 700)
    }
    const scheduleRelease = () => {
      clearTimeout(releaseTimer)
      releaseTimer = setTimeout(release, 110)
    }
    const atLimit = (dir) => {
      const max = scroller.scrollHeight - scroller.clientHeight
      if (dir < 0) return scroller.scrollTop <= 0
      return scroller.scrollTop >= max - 1
    }
    const yank = (delta) => {
      if (reduced) return
      list.style.transition = ""
      pull = Math.max(-260, Math.min(260, pull - delta * 0.45))
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }
    const onWheel = (e) => {
      if ((atLimit(-1) && e.deltaY < 0) || (atLimit(1) && e.deltaY > 0)) {
        e.preventDefault()
        yank(e.deltaY)
        scheduleRelease()
      } else if (pull !== 0) {
        release()
      }
    }
    let lastY = 0
    const onTouchStart = (e) => {
      lastY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const y = e.touches[0].clientY
      const dy = lastY - y
      lastY = y
      if ((atLimit(-1) && dy < 0) || (atLimit(1) && dy > 0)) {
        e.preventDefault()
        yank(dy * 1.4)
      }
    }
    const onTouchEnd = () => {
      if (pull !== 0) release()
    }
    scroller.addEventListener("wheel", onWheel, { passive: false })
    scroller.addEventListener("touchstart", onTouchStart, { passive: true })
    scroller.addEventListener("touchmove", onTouchMove, { passive: false })
    scroller.addEventListener("touchend", onTouchEnd)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(releaseTimer)
      scroller.removeEventListener("wheel", onWheel)
      scroller.removeEventListener("touchstart", onTouchStart)
      scroller.removeEventListener("touchmove", onTouchMove)
      scroller.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  const hover = useCallback(
    (i) => {
      setActive((prev) => {
        if (prev !== i && sfx) blip(740 + i * 50, 0.05)
        return i
      })
    },
    [sfx]
  )

  const goto = useCallback(
    (i) => {
      hover(i)
      rowsRef.current[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    },
    [hover]
  )

  const select = useCallback(
    (proj) => {
      if (sfx) blip(1180, 0.12)
      setLoading(proj)
      setTimeout(() => {
        setLoading(null)
        setDetail(proj)
      }, 950)
    },
    [sfx]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (loading) return
      if (detail) {
        if (e.key === "Escape") setDetail(null)
        return
      }
      if (about && e.key === "Escape") setAbout(false)
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault()
        setActive((a) => {
          const n = (a + 1) % roster.length
          if (sfx) blip(740 + n * 50, 0.05)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault()
        setActive((a) => {
          const n = (a - 1 + roster.length) % roster.length
          if (sfx) blip(740 + n * 50, 0.05)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "Enter") select(roster[activeRef.current])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [detail, loading, about, sfx, select])

  const p2 = (n) => String(n).padStart(2, "0")
  const clock = `${p2(now.getHours())}:${p2(now.getMinutes())}:${p2(now.getSeconds())}`
  const date = `${p2(now.getDate())}/${p2(now.getMonth() + 1)}/${now.getFullYear()}`

  return (
    <div className={`ps-root ${crt ? "ps-crt" : ""}`}>
      {cubes.map((c, i) => (
        <span
          key={i}
          className="ps-cube"
          style={{
            width: c.s,
            height: c.s,
            left: `${c.left}%`,
            bottom: "-120px",
            opacity: c.op,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
      <div className="ps-grid" />

      {/* top system bar */}
      <div className="ps-topbar ps-hud">
        <span>
          BROWSER <span className="ps-hide-m">· {date}</span>
        </span>
        <span className="ps-clock">{clock}</span>
        <span style={{ display: "flex", gap: 16 }}>
          <button onClick={() => setSfx((v) => !v)}>SFX:{sfx ? "ON" : "OFF"}</button>
          <button onClick={() => setCrt((v) => !v)}>CRT:{crt ? "ON" : "OFF"}</button>
          <button onClick={onExit} title="Back to site">SKIN·B ✕</button>
        </span>
      </div>

      {/* spiral roster */}
      <div className="ps-scroll" ref={scrollRef}>
        <div className="ps-tall">
          <ul className="ps-list" ref={listRef}>
            {roster.map((p, i) => (
              <li
                key={p.id}
                className={`ps-row ps-enter ${i === active ? "is-active" : ""}`}
                style={{ animationDelay: `${0.25 + i * 0.09}s` }}
              >
                <span
                  className="ps-cell"
                  ref={(el) => {
                    rowsRef.current[i] = el
                  }}
                >
                  <button
                    className="ps-pick"
                    data-year={p.year}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    onClick={() => select(p)}
                  >
                    {i === active && <span className="ps-cursor">●</span>}
                    {p.lines.join(" ")}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* memory-card inspector */}
      <aside className="ps-card ps-hud" aria-live="polite">
        <div className="ps-slot">
          <span>SLOT 1</span>
          <span>
            {String(active + 1).padStart(2, "0")}/{String(roster.length).padStart(2, "0")}
          </span>
        </div>
        <div className="ps-icon" key={preview.id}>
          {initials(preview)}
        </div>
        <div className="ps-plate">
          <h3>{preview.lines.join(" ")}</h3>
          <p className="ps-sysline">
            {preview.role} · {preview.year} · {fmt(sizes[active])}KB
          </p>
          <p className="ps-meta">{preview.stack.join(" / ")}</p>
          <div className="ps-usebar">
            <i style={{ width: `${Math.min(100, (used / 8192) * 100).toFixed(1)}%` }} />
          </div>
          <p className="ps-controls">
            ↑↓ BROWSE — ✕ ENTER TO OPEN
          </p>
        </div>
      </aside>

      {/* memory-card rail */}
      <nav className="ps-rail" aria-label="Memory cards">
        {roster.map((p, i) => (
          <button
            key={p.id}
            className={`ps-minicard ${i === active ? "is-on" : ""}`}
            onMouseEnter={() => hover(i)}
            onFocus={() => hover(i)}
            onClick={() => goto(i)}
          >
            ▤ {initials(p)}
            <small>{fmt(sizes[i])}KB</small>
          </button>
        ))}
      </nav>

      {/* bottom bar */}
      <footer className="ps-cmdbar ps-hud">
        <span>
          <button onClick={() => setAbout(true)}>△ SYSTEM INFORMATION</button>
          <span className="ps-hide-m"> · {profile.name}</span>
        </span>
        <span className="ps-free">
          FREE {fmt(FREE)}KB / 8192KB
        </span>
      </footer>

      {/* system information sheet */}
      {about && (
        <div className="ps-sheet">
          <button className="ps-backbtn ps-hud" onClick={() => setAbout(false)}>
            ○ BACK [ESC]
          </button>
          <p className="ps-hud" style={{ marginTop: 24, fontSize: 22, color: "var(--cyan)" }}>
            SYSTEM INFORMATION
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,54px)", lineHeight: 1.05, maxWidth: 900, margin: "16px 0" }}>
            {profile.name} — {profile.title}.
          </h2>
          <p style={{ maxWidth: 640, lineHeight: 1.55 }}>
            Year 2 B.Sc. Mechanical Engineering, Kenyatta University. Class Rep, Vice Chair MESA KU.
            AI products on Claude and Gemini, M-Pesa payments, 120-member engineering community.
          </p>
          <p className="ps-hud" style={{ fontSize: 20, opacity: 0.75, marginTop: 16 }}>
            MODEL: GMK-2002 · REGION: KE/RUIRU · LANGUAGE: EN · {profile.email}
          </p>
        </div>
      )}

      {/* detail = saved data readout */}
      {detail && (
        <div className="ps-sheet">
          <button className="ps-backbtn ps-hud" onClick={() => setDetail(null)}>
            ○ BACK [ESC]
          </button>
          <p className="ps-hud" style={{ marginTop: 24, fontSize: 22, color: "var(--cyan)" }}>
            SAVED DATA — {item.year} — {fmt(kbOf(item))}KB — {item.role}
          </p>
          <h2
            style={{
              fontSize: "clamp(48px,9vw,150px)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              fontWeight: 900,
              margin: "12px 0",
            }}
          >
            {item.lines.join(" ")}
          </h2>
          <p style={{ maxWidth: 620, marginTop: 8, lineHeight: 1.55 }}>{item.blurb}</p>
          <p className="ps-hud" style={{ fontSize: 20, opacity: 0.75 }}>{item.stack.join(" / ")}</p>
          {item.points && (
            <ul style={{ maxWidth: 640, marginTop: 16, paddingLeft: 20, lineHeight: 1.6 }}>
              {item.points.map((pt, i) => (
                <li key={pt} style={{ marginBottom: 10 }}>
                  <span className="ps-hud" style={{ color: "var(--cyan)" }}>
                    FILE_{p2(i + 1)}
                  </span>{" "}
                  — {pt}
                </li>
              ))}
            </ul>
          )}
          {item.links && (
            <p className="ps-hud" style={{ fontSize: 20, marginTop: 14 }}>
              {item.links.map((l, i) => (
                <span key={l.url}>
                  {i > 0 && " · "}
                  <a href={l.url} target="_blank" rel="noreferrer">↗ {l.label}</a>
                </span>
              ))}
            </p>
          )}
        </div>
      )}

      {/* loading sweep */}
      {loading && (
        <div className="ps-load ps-hud">
          <span>LOADING…</span>
        </div>
      )}
    </div>
  )
}
