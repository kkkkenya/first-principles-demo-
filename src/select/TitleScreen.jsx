import { useEffect } from "react"
import "./title.css"

// Title screen: the game homepage. PRESS START boots into the garage.

export default function TitleScreen({ onStart }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onStart()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onStart])

  return (
    <div className="ti-root">
      <div className="ti-bg" />
      <div className="ti-road" />
      <div className="ti-vignette" />

      <div className="ti-top ti-hud">
        <span>
          HI-SCORE <span className="hi">999999</span>
        </span>
        <span>1 PLAYER</span>
        <span>CREDIT 01</span>
      </div>

      <div className="ti-center">
        <div className="ti-edition ti-hud">★ GREGORY KIMEMIAH ★</div>
        <h1 className="ti-logo">
          <span className="l1">Gregory</span>
          <span className="l2">Kimemiah</span>
        </h1>
        <p className="ti-tag ti-hud">
          MECHANICAL ENGINEER <b>×</b> WEB DEVELOPER
        </p>
        <button className="ti-start" onClick={onStart} autoFocus>
          ▶ PRESS START
        </button>
        <p className="ti-hint ti-hud">OR PRESS ENTER: 6 STAGES, NO CONTINUE NEEDED</p>
      </div>

      <div className="ti-bottom">
        <div className="ti-checkline" />
        <div className="ti-foot ti-hud">
          <span>© 2026 GREGORY KIMEMIAH · VER 1.0 · RUIRU GP</span>
          <span className="ti-credit">★ INSERT COIN ★</span>
        </div>
      </div>
    </div>
  )
}
