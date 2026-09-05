const KEY = "fp-events"
const MAX = 200

function readLog() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]")
  } catch {
    return []
  }
}

/** Privacy-friendly event log: localStorage only, no cookies, no fingerprinting. */
export function trackEvent(name, detail = {}) {
  try {
    const log = readLog()
    log.push({ t: new Date().toISOString(), name, ...detail })
    localStorage.setItem(KEY, JSON.stringify(log.slice(-MAX)))
  } catch {
    // storage unavailable — event simply isn't recorded
  }
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(name, { props: detail })
  }
}

/** Loads Plausible (cookie-free analytics) only when a domain is configured. */
export function initAnalytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
  if (!domain || typeof document === "undefined") return
  if (document.querySelector('script[data-plausible]')) return
  const s = document.createElement("script")
  s.setAttribute("data-plausible", "")
  s.defer = true
  s.setAttribute("data-domain", domain)
  s.src = "https://plausible.io/js/script.js"
  document.head.appendChild(s)
}

/** Debug helper — run `window.__fpEvents()` in devtools to inspect. */
if (typeof window !== "undefined") {
  window.__fpEvents = readLog
}
