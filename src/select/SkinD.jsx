import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./select.css"
import { profile, roster } from "./roster"

// Skin D — faithful Van Holtz base clone + minimal Y2K HUD.
// Core spiral: perspective container + per-row rotateY driven by scroll (rAF),
// hover/keyboard sets active row which rotates forward + outlines.

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

function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00")
  useEffect(() => {
    const t0 = Date.now()
    const id = setInterval(() => {
      const el = Date.now() - t0
      const f = Math.floor((el % 1000) / (1000 / 24))
      const s = Math.floor(el / 1000) % 60
      const m = Math.floor(el / 60000) % 60
      const h = Math.floor(el / 3600000)
      const p = (n) => String(n).padStart(2, "0")
      setTc(`${p(h)}:${p(m)}:${p(s)}:${p(f)}`)
    }, 100)
    return () => clearInterval(id)
  }, [])
  return tc
}

export default function SkinD({ onExit }) {
  const [active, setActive] = useState(2)
  const [theme, setTheme] = useState("light") // light | night | ultra (original easter egg)
  const [sfx, setSfx] = useState(false)
  const [crt, setCrt] = useState(true)
  const [about, setAbout] = useState(false)
  const [detail, setDetail] = useState(null) // roster item or null
  const [curtain, setCurtain] = useState(false)
  const scrollRef = useRef(null)
  const listRef = useRef(null)
  const rowsRef = useRef([])
  const smoothRef = useRef(new Map()) // cell -> lerped angle
  const activeRef = useRef(active)
  activeRef.current = active
  const tc = useTimecode()

  const item = detail ?? roster[active]

  // ---- 3D engine: scroll position -> rotateY per row + perspective-origin ----
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
      // perspective-origin drifts with scroll velocity = the "wave" feel
      py += ((50 + vel * 1.6 - py) * 0.12)
      scroller.style.setProperty("--py", `${py.toFixed(2)}%`)

      const vh = window.innerHeight
      const cy = vh / 2
      rowsRef.current.forEach((cell, i) => {
        if (!cell) return
        const r = cell.getBoundingClientRect()
        const dist = Math.abs(r.top + r.height / 2 - cy) / (vh / 2) // 0 center .. ~1 edge
        const base = -45 + (1 - Math.min(dist * 1.35, 1)) * 33 // -45 edge .. -12 center
        const target = i === activeRef.current ? -4 : base
        // lerp toward target each frame = smooth, step-free motion
        const prev = smoothRef.current.get(cell) ?? target
        const next = reduced ? target : prev + (target - prev) * 0.16
        smoothRef.current.set(cell, next)
        cell.style.setProperty("--ry", `${next.toFixed(2)}deg`)
      })
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ---- elastic overscroll: rubber-band pinch past top/bottom limits ----
  useEffect(() => {
    const scroller = scrollRef.current
    const list = listRef.current
    if (!scroller || !list) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let pull = 0 // >0 dragged past top, <0 past bottom
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
      }, 600)
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
      // delta: scroll amount pushing past the limit
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
      const dy = lastY - y // >0 = pushing content up
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
        if (prev !== i && sfx) blip(520 + i * 60)
        return i
      })
    },
    [sfx]
  )

  const select = useCallback(
    (proj) => {
      if (sfx) blip(880, 0.12)
      setCurtain(true)
      setTimeout(() => {
        setDetail(proj)
        setCurtain(false)
      }, 580)
    },
    [sfx]
  )

  // keyboard = game controls
  useEffect(() => {
    const onKey = (e) => {
      if (detail) {
        if (e.key === "Escape") setDetail(null)
        return
      }
      if (about && e.key === "Escape") setAbout(false)
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault()
        setActive((a) => {
          const n = (a + 1) % roster.length
          if (sfx) blip(520 + n * 60)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault()
        setActive((a) => {
          const n = (a - 1 + roster.length) % roster.length
          if (sfx) blip(520 + n * 60)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "Enter") select(roster[activeRef.current])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [detail, about, sfx, select])

  const preview = useMemo(() => roster[active], [active])

  return (
    <div className={`vh-root ${crt ? "vh-crt" : ""}`} data-theme={theme}>
      {/* top Y2K HUD */}
      <div className="vh-topbar vh-hud-font">
        <span>
          <span style={{ color: "var(--accent)" }}>●</span> P1 — PORTFOLIO SELECT
        </span>
        <span className="vh-hide-m">{tc}</span>
        <span style={{ display: "flex", gap: 16 }}>
          <button onClick={() => setSfx((v) => !v)}>SFX:{sfx ? "ON" : "OFF"}</button>
          <button onClick={() => setCrt((v) => !v)}>CRT:{crt ? "ON" : "OFF"}</button>
          <button onClick={onExit} title="Back to site">SKIN·D ✕</button>
        </span>
      </div>

      {/* wordmark — top-left, clear of the spiral */}
      <span className="vh-logo">
        Gregory
        <br />
        Kimemiah
        <br />
        Co.
      </span>

      {/* spiral list */}
      <div className="vh-scroll" ref={scrollRef}>
        <div className="vh-tall">
          <ul className="vh-list" ref={listRef}>
            {roster.map((p, i) => (
              <li key={p.id} className={`vh-row vh-enter ${i === active ? "is-active" : ""}`} style={{ animationDelay: `${0.25 + i * 0.09}s` }}>
                <span
                  className="vh-cell"
                  ref={(el) => {
                    rowsRef.current[i] = el
                  }}
                >
                  <button
                    className="vh-pick"
                    data-year={p.year}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    onClick={() => select(p)}
                  >
                    {p.lines.join(" ")}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* left preview / stat card */}
      <aside className="vh-preview vh-hud-font" aria-live="polite">
        <p style={{ fontSize: 18, opacity: 0.7 }}>
          {String(active + 1).padStart(2, "0")}/{String(roster.length).padStart(2, "0")} — {preview.year} — {preview.role}
        </p>
        <div
          className="vh-thumb"
          style={{
            background: `linear-gradient(135deg, hsl(${preview.hue} 80% 55%), hsl(${(preview.hue + 60) % 360} 85% 45%))`,
          }}
        />
        <p style={{ fontSize: 24, margin: "8px 0 2px", textTransform: "uppercase" }}>
          {preview.lines.join(" ")}
        </p>
        <p style={{ fontSize: 17, opacity: 0.75, lineHeight: 1.1 }}>{preview.blurb}</p>
        <p style={{ fontSize: 16, opacity: 0.6, marginTop: 6 }}>▸ {preview.points?.length ?? 0} RECORDS INSIDE</p>
        <p style={{ fontSize: 16, opacity: 0.6, marginTop: 4 }}>{preview.stack.join(" · ")}</p>
        {Object.entries(preview.stats).map(([k, v]) => (
          <div className="vh-stat" key={k}>
            <span>{k}</span>
            <span className="vh-bar">
              <i style={{ width: `${v}%` }} />
            </span>
            <span>{v}</span>
          </div>
        ))}
        <p style={{ fontSize: 16, opacity: 0.6, marginTop: 8 }}>↑↓ / SCROLL TO BROWSE — ENTER TO PICK</p>
      </aside>

      {/* bottom UI = original footer */}
      <footer className="vh-footer">
        <div className="vh-fcols">
          <div className="vh-hide-m">
            <ul>
              <li>Studio of {profile.name}</li>
              <li>{profile.title}</li>
            </ul>
            <ul style={{ marginTop: 10 }}>
              <li>{profile.location}</li>
              <li>
                <a href={`mailto:${profile.email}`}>
                  <strong>{profile.email}</strong>
                </a>
              </li>
            </ul>
          </div>
          <nav>
            <ul>
              <li>
                <button className="linklike" onClick={() => setAbout(true)}>
                  <span className="num">01</span> <strong>about</strong>
                </button>
              </li>
              <li>
                <span className="num">02</span> <strong>journal</strong>
              </li>
            </ul>
          </nav>
        </div>
        <div className="vh-fcols">
          <nav className="vh-hide-m">
            <ul>
              <li><span className="num">03</span> <a href="https://github.com/kkkkenya" target="_blank" rel="noreferrer"><strong>github</strong></a></li>
              <li><span className="num">04</span> <a href="mailto:gregorykimemiah@gmail.com"><strong>email</strong></a></li>
              <li><span className="num">05</span> <a href="tel:+254745947704"><strong>+254 745 947 704</strong></a></li>
            </ul>
          </nav>
          <div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>design — feint homage</div>
            <div className="vh-theme-dot" role="group" aria-label="Color mode">
              <button title="light" aria-label="light" style={{ background: "#f2f2f2" }} onClick={() => setTheme("light")} />
              <button title="night" aria-label="night" style={{ background: "#0a0a0a" }} onClick={() => setTheme("night")} />
              <button title="ultra" aria-label="ultra" style={{ background: "#4801ff" }} onClick={() => setTheme("ultra")} />
            </div>
          </div>
        </div>
        <span className="vh-copy">SKIN D — BASE CLONE · © 2026 {profile.name}</span>
      </footer>

      {/* about overlay (original copy, condensed) */}
      {about && (
        <div className="vh-sheet">
          <button
            onClick={() => setAbout(false)}
            style={{ background: "none", border: "1px solid var(--line)", color: "inherit", padding: "8px 18px", cursor: "pointer", fontFamily: "inherit" }}
          >
            ✕ BACK [ESC]
          </button>
          <h2 style={{ fontSize: "clamp(28px,4vw,54px)", lineHeight: 1.05, maxWidth: 900, margin: "28px 0" }}>
            Mechanical engineer in training who ships real web products — first-principles thinking, from engines to APIs.
          </h2>
          <p style={{ maxWidth: 640, lineHeight: 1.5 }}>Year 2 B.Sc. Mechanical Engineering at Kenyatta University — Class Rep, Vice Chair of MESA KU. I build AI products with Claude and Gemini, take M-Pesa payments, and run a 120-member engineering community.</p>
          <p style={{ maxWidth: 640, lineHeight: 1.5 }}>Same method everywhere: understand from first principles, derive, solve, explain — whether it is thermodynamics or a React form.</p>
          <div style={{ display: "flex", gap: 48, marginTop: 32, flexWrap: "wrap" }}>
            <div><h5>Availability</h5><p>Open — Ruiru / Remote</p></div>
            <div><h5>Focus</h5><p>Web Dev · AI Integrations · M-Pesa / Paystack · Community Sites</p></div>
            <div><h5>Controls</h5><p className="vh-hud-font">↑↓ BROWSE · ENTER SELECT · 01 ABOUT · DOT = COLOR MODE</p></div>
          </div>
        </div>
      )}

      {/* case-study stub (transition target) */}
      {detail && (
        <div className="vh-sheet">
          <button
            onClick={() => setDetail(null)}
            style={{ background: "none", border: "1px solid var(--line)", color: "inherit", padding: "8px 18px", cursor: "pointer", fontFamily: "inherit" }}
          >
            ✕ BACK [ESC]
          </button>
          <p className="vh-hud-font" style={{ marginTop: 24, fontSize: 20 }}>STAGE CLEAR — {item.year} — {item.role}</p>
          <h2 style={{ fontSize: "clamp(48px,10vw,160px)", lineHeight: 0.9, textTransform: "uppercase", fontWeight: 900, margin: "12px 0" }}>
            {item.lines.join(" ")}
          </h2>
          <div
            style={{
              height: 220,
              border: "1px solid var(--line)",
              background: `linear-gradient(135deg, hsl(${item.hue} 80% 55%), hsl(${(item.hue + 60) % 360} 85% 45%))`,
            }}
          />
          <p style={{ maxWidth: 620, marginTop: 18, lineHeight: 1.55 }}>{item.blurb}</p>
          <p className="vh-hud-font" style={{ fontSize: 20, opacity: 0.75 }}>{item.stack.join(" · ")}</p>
          {item.points && (
            <ul style={{ maxWidth: 640, marginTop: 16, paddingLeft: 20, lineHeight: 1.6 }}>
              {item.points.map((pt) => (
                <li key={pt} style={{ marginBottom: 10 }}>{pt}</li>
              ))}
            </ul>
          )}
          {item.links && (
            <p className="vh-hud-font" style={{ fontSize: 20, marginTop: 14 }}>
              {item.links.map((l, i) => (
                <span key={l.url}>
                  {i > 0 && " · "}
                  <a href={l.url} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>↗ {l.label}</a>
                </span>
              ))}
            </p>
          )}
          <p className="vh-hud-font" style={{ fontSize: 18, opacity: 0.55, marginTop: 24 }}>
            [ Pick a stage on the select screen to inspect its records. Full case studies plug in here. ]
          </p>
        </div>
      )}

      {/* curtain wipe */}
      <div className={`vh-curtain vh-hud-font ${curtain ? "go" : ""}`}>
        <span style={{ fontSize: 32, letterSpacing: 4 }}>LOADING STAGE…</span>
      </div>
    </div>
  )
}
