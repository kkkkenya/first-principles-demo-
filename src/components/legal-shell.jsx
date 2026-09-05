import { X } from "lucide-react"

export function LegalOverlayShell({ onClose, label = "Dialog", children }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl rounded-sm bg-[#f4f2ee] p-8 shadow-2xl md:p-12"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/15 hover:bg-black hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
}
