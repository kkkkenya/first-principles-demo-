/**
 * Clearly-labeled photo placeholder — NOT a stock photo, NOT an AI image.
 *
 * To swap in a real photo later, replace the whole <PhotoPlaceholder ... />
 * line with a one-line <img>, e.g.:
 *   <img src="/teaching.jpg" alt="Gregory teaching a session" className="aspect-video w-full rounded-sm border border-black/15 object-cover" />
 */
export function PhotoPlaceholder({ label, className = "", ratio = "aspect-video" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-[#1E3A8A]/25 bg-gradient-to-br from-[#1E3A8A]/10 via-[#f4f2ee] to-[#D4A017]/25 ${ratio} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(30,58,138,0.12) 0px, rgba(30,58,138,0.12) 1px, transparent 1px, transparent 10px)",
        }}
      />
      <p className="relative px-6 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A]/75">
        {label}
      </p>
    </div>
  )
}
