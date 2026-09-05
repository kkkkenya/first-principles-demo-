import { cn } from "@/lib/utils"

/**
 * Animated flowing gradient background — deep crimson/violet/indigo mesh
 * with drifting blobs, a heavy blur veil, and film grain.
 * Pass `light` for the pale Swiss variant.
 */
export function GradientScene({ className, light = false }) {
  return (
    <div
      aria-hidden="true"
      className={cn("gradient-scene", light && "light", className)}
    >
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
      <div className="veil" />
      <div className="grain" />
    </div>
  )
}
