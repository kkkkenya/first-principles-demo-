import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { brand } from "@/content"
import { trackEvent } from "@/lib/analytics"

/**
 * Sticky bottom CTA bar — mobile only. Appears after scrolling past the
 * hero, hides when a legal overlay is open. Sits below the cookie banner
 * (z-80 vs banner z-90) so the banner takes precedence until dismissed.
 */
export function StickyCta({ hidden }) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] border-t border-black/15 bg-[#f4f2ee]/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        past ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="p-3">
        <a
          href={brand.whatsapp}
          onClick={() => trackEvent("cta_click", { location: "sticky_bar" })}
          className="flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-bold tracking-widest text-white active:bg-black/80"
        >
          <MessageCircle className="h-4 w-4" />
          BOOK FREE DIAGNOSTIC
        </a>
      </div>
    </div>
  )
}
