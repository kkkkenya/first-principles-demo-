import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/85",
        outline:
          "border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm",
        dark: "bg-black text-white hover:bg-black/80",
        lightOutline:
          "border border-black/25 text-black hover:bg-black/5",
        glow: "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-9 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? "a" : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
