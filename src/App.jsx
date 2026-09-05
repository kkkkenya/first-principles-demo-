import { useCallback, useState } from "react"
import SkinC from "@/select/SkinC"
import TitleScreen from "@/select/TitleScreen"
import "./select/title.css"

// Homepage = arcade title screen. PRESS START -> loading beat -> garage.
export default function App() {
  const [phase, setPhase] = useState("title") // title | loading | game

  const start = useCallback(() => {
    setPhase((p) => {
      if (p !== "title") return p
      setTimeout(() => setPhase("game"), 1400)
      return "loading"
    })
  }, [])

  if (phase === "game") return <SkinC />
  return (
    <>
      <TitleScreen onStart={start} />
      {phase === "loading" && (
        <div className="ti-loading ti-hud"><span>NOW LOADING…</span></div>
      )}
    </>
  )
}
