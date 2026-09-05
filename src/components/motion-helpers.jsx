import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react"

// Shared ease — matches .fade-up in index.css
export const EASE = [0.22, 1, 0.36, 1]

// Shared viewport — trigger once, 100px before entering
export const VIEWPORT_ONCE = { once: true, margin: "-100px" }

// Words staggering in (hero, plays on mount)
export function WordStagger({ text, className = "", wordDelay = 0.05, startAt = 0, duration = 0.6, as: Tag = "span" }) {
  const words = text.split(" ")
  const MotionTag = motion[Tag] ?? motion.span
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <MotionTag
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: EASE, delay: startAt + i * wordDelay }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </MotionTag>
      ))}
    </span>
  )
}

// Fade + slide up on scroll into view
export function FadeUp({ children, className = "", delay = 0, y = 20, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Stagger container — children use <StaggerItem>
export function StaggerGroup({ children, className = "", stagger = 0.08, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerList({ children, className = "", stagger = 0.08, ...rest }) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({ children, className = "", as = "li", ...rest }) {
  const Tag = motion[as] ?? motion.li
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Animated number — counts up once when scrolled into view, eased
export function CountUp({ to, suffix = "", duration = 1.2, className = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration, ease: EASE })
    return () => controls.stop()
  }, [inView, mv, to, duration])

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  )
}
