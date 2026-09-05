import { useCallback, useEffect, useRef, useState } from "react"
import "./skin-a.css"
import { profile, roster } from "./roster"

// Skin A — Fighter / arcade select on the same spiral engine.
// Ghost-outline roster, active fighter lights up with P1 cursor,
// portrait card, announcer line, round timer, VS splash, elastic edges.

const taunts = {
  "ai-builds": "A NEW CHALLENGER COMPILES!",
  community: "120-HIT COMMUNITY COMBO!",
  "tech-stack": "FULL TOOLBOX — NO COOLDOWN!",
  "mech-eng": "FIRST-PRINCIPLES FINISHER!",
  "field-work": "3 YEARS IN THE ARCADE!",
}

function blip(freq = 660, dur = 0.06) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    blip.ctx = blip.ctx || new Ctx()
    const ctx = blip.ctx
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = "square"
    o.frequency.value = freq
    g.gain.setValueAtTime(0.04, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + dur)
  } catch {
    /* audio unavailable — silent */
  }
}

const initials = (p) => p.lines.map((w) => w[0]).join("")

export default function SkinA({ onExit }) {
  const [active, setActive] = useState(2)
  const [sfx, setSfx] = useState(false)
  const [crt, setCrt] = useState(true)
  const [about, setAbout] = useState(false)
  const [detail, setDetail] = useState(null)
  const [versus, setVersus] = useState(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(99)
  const scrollRef = useRef(null)
  const listRef = useRef(null)
  const rowsRef = useRef([])
  const smoothRef = useRef(new Map())
  const scoredRef = useRef(-1)
  const activeRef = useRef(active)
  activeRef.current = active

  const item = detail ?? versus ?? roster[active]
  const preview = roster[active]

  // round timer
  useEffect(() => {
    if (detail || versus || about) return
    if (time <= 0) {
      setTime(99)
      return
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [time, detail, versus, about])

  // ---- 3D engine (lerped spiral, same recipe as Skin D) ----
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

  const bump = useCallback(
    (i, pts) => {
      if (scoredRef.current === i) return
      scoredRef.current = i
      setScore((s) => s + pts)
      if (sfx) blip(520 + i * 60)
    },
    [sfx]
  )

  const hover = useCallback(
    (i) => {
      setActive(i)
      bump(i, 10)
    },
    [bump]
  )

  const select = useCallback(
    (proj) => {
      if (sfx) blip(880, 0.14)
      setScore((s) => s + 500)
      setVersus(proj)
      setTimeout(() => {
        setVersus(null)
        setDetail(proj)
      }, 1250)
    },
    [sfx]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (versus) return
      if (detail) {
        if (e.key === "Escape") setDetail(null)
        return
      }
      if (about && e.key === "Escape") setAbout(false)
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault()
        setActive((a) => {
          const n = (a + 1) % roster.length
          bump(n, 10)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault()
        setActive((a) => {
          const n = (a - 1 + roster.length) % roster.length
          bump(n, 10)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "Enter") select(roster[activeRef.current])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [detail, versus, about, bump, select])

  const pad = (n, l = 6) => String(n).padStart(l, "0")

  return (
    <div className={`fa-root ${crt ? "fa-crt" : ""}`}>
      <div className="fa-spot" />
      <div className="fa-floor" />

      {/* top HUD */}
      <div className="fa-topbar fa-hud">
        <span>
          1P <span style={{ color: "var(--yellow)" }}>{pad(score)}</span>
          <span className="fa-hide-m"> · HI 999999</span>
        </span>
        <span className="fa-time">TIME {pad(time, 2)}</span>
        <span style={{ display: "flex", gap: 16 }}>
          <button onClick={() => setSfx((v) => !v)}>SFX:{sfx ? "ON" : "OFF"}</button>
          <button onClick={() => setCrt((v) => !v)}>CRT:{crt ? "ON" : "OFF"}</button>
          <button onClick={onExit} title="Back to site">SKIN·A ✕</button>
        </span>
      </div>

      {/* announcer */}
      <div className="fa-announcer fa-hud" aria-live="polite">
        <span className="fa-pop" key={preview.id}>
          <b>{preview.lines.join(" ")}</b> — {taunts[preview.id]}
        </span>
      </div>

      {/* spiral roster */}
      <div className="fa-scroll" ref={scrollRef}>
        <div className="fa-tall">
          <ul className="fa-list" ref={listRef}>
            {roster.map((p, i) => (
              <li
                key={p.id}
                className={`fa-row fa-enter ${i === active ? "is-active" : ""}`}
                style={{ animationDelay: `${0.25 + i * 0.09}s` }}
              >
                <span
                  className="fa-cell"
                  ref={(el) => {
                    rowsRef.current[i] = el
                  }}
                >
                  <button
                    className="fa-pick"
                    data-year={p.year}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    onClick={() => select(p)}
                  >
                    {i === active && <span className="fa-cursor">▶</span>}
                    {p.lines.join(" ")}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* fighter portrait */}
      <aside className="fa-portrait fa-hud" aria-live="polite">
        <div className="fa-p1">
          <span>1P</span>
          <span>
            {String(active + 1).padStart(2, "0")}/{String(roster.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="fa-art"
          style={{
            background: `linear-gradient(160deg, hsl(${preview.hue} 75% 42%), hsl(${(preview.hue + 70) % 360} 80% 26%)`,
          }}
        >
          <span className="fa-initials" key={preview.id}>
            {initials(preview)}
          </span>
          <span className="fa-gridov" />
        </div>
        <div className="fa-plate">
          <h3>{preview.lines.join(" ")}</h3>
          <p className="fa-taunt">“{taunts[preview.id]}”</p>
          <p className="fa-meta">
            {preview.year} · {preview.role} · {preview.stack.join(" / ")}
          </p>
          {Object.entries(preview.stats).map(([k, v]) => (
            <div className="fa-stat" key={k}>
              <span>{k}</span>
              <span className="fa-bar">
                <i style={{ width: `${v}%` }} />
              </span>
              <span>{v}</span>
            </div>
          ))}
          <p className="fa-controls">↑↓ BROWSE — ENTER TO FIGHT</p>
        </div>
      </aside>

      {/* bottom command bar */}
      <footer className="fa-cmdbar fa-hud">
        <span>
          <button onClick={() => setAbout(true)}>01 ABOUT</button>
          <span className="fa-hide-m"> · {profile.name} · {profile.location}</span>
        </span>
        <span className="fa-credit">★ CREDIT 01 — INSERT COIN ★</span>
      </footer>

      {/* about sheet */}
      {about && (
        <div className="fa-sheet">
          <button className="fa-backbtn fa-hud" onClick={() => setAbout(false)}>
            ✕ BACK [ESC]
          </button>
          <p className="fa-hud" style={{ marginTop: 24, fontSize: 22, color: "var(--yellow)" }}>
            PLAYER DATA — {profile.name.toUpperCase()}
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,54px)", lineHeight: 1.05, maxWidth: 900, margin: "16px 0" }}>
            Mechanical engineer in training who ships real web products.
          </h2>
          <p style={{ maxWidth: 640, lineHeight: 1.55 }}>
            Year 2 B.Sc. Mechanical Engineering at Kenyatta University — Class Rep, Vice Chair of MESA KU.
            AI products with Claude and Gemini, M-Pesa payments, and a 120-member engineering community.
          </p>
          <p className="fa-hud" style={{ fontSize: 20, opacity: 0.7, marginTop: 16 }}>
            {profile.email} · {profile.github}
          </p>
        </div>
      )}

      {/* detail sheet = post-fight dossier */}
      {detail && (
        <div className="fa-sheet">
          <button className="fa-backbtn fa-hud" onClick={() => setDetail(null)}>
            ✕ REMATCH [ESC]
          </button>
          <p className="fa-hud" style={{ marginTop: 24, fontSize: 22, color: "var(--yellow)" }}>
            K.O. — {item.year} — {item.role}
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
          <p className="fa-hud" style={{ fontSize: 20, opacity: 0.75 }}>{item.stack.join(" / ")}</p>
          {item.points && (
            <ul style={{ maxWidth: 640, marginTop: 16, paddingLeft: 20, lineHeight: 1.6 }}>
              {item.points.map((pt) => (
                <li key={pt} style={{ marginBottom: 10 }}>{pt}</li>
              ))}
            </ul>
          )}
          {item.links && (
            <p className="fa-hud" style={{ fontSize: 20, marginTop: 14 }}>
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

      {/* VS splash */}
      {versus && (
        <div className="fa-vs">
          <div className="fa-vs-name">{versus.lines.join(" ")}</div>
          <div className="fa-vs-mid">VS</div>
          <div className="fa-vs-name cpu">???</div>
        </div>
      )}
    </div>
  )
}
