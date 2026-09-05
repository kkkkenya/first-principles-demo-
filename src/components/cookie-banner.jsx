import { useEffect, useState } from "react"

const KEY = "fp-cookie-consent"

export function CookieBanner({ onOpenLegal }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (value) => {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      // storage unavailable — just dismiss
    }
    setVisible(false)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setVisible(false)
    }
    if (visible) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-black/15 bg-[#f4f2ee]/95 p-4 shadow-2xl backdrop-blur-md md:p-5">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-black/70 md:text-sm">
          <span className="font-black tracking-wide">COOKIES — </span>
          We use no advertising or tracking cookies. The only thing stored in your browser is
          this choice. Messaging us on WhatsApp or email is covered by their policies, and ours
          is{" "}
          <button onClick={() => onOpenLegal("privacy")} className="cursor-pointer font-bold underline underline-offset-2">
            here
          </button>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("declined")}
            className="cursor-pointer rounded-none border border-black/25 px-5 py-2.5 text-xs font-bold tracking-widest hover:bg-black/5"
          >
            DECLINE
          </button>
          <button
            onClick={() => choose("accepted")}
            className="cursor-pointer rounded-none bg-black px-5 py-2.5 text-xs font-bold tracking-widest text-white hover:bg-black/80"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  )
}
