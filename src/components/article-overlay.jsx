import { ArrowRight, Clock } from "lucide-react"
import { articles, brand } from "@/content"
import { LegalOverlayShell } from "@/components/legal-shell"

export function ArticleCard({ article, onOpen }) {
  return (
    <button
      onClick={() => onOpen(article.slug)}
      className="group flex cursor-pointer flex-col rounded-sm border border-black/15 bg-white p-7 text-left transition-all hover:-translate-y-1 hover:border-black hover:shadow-lg"
    >
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-black/45">
        <Clock className="h-3.5 w-3.5" />
        {article.minutes} MIN READ
      </p>
      <p className="mt-4 text-xl font-black leading-snug tracking-tight group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 md:text-2xl">
        {article.title}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-black/65">{article.excerpt}</p>
      <p className="mt-5 flex items-center gap-2 text-xs font-black tracking-widest">
        READ NOTE
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </p>
    </button>
  )
}

export function ArticleOverlay({ slug, onClose, onBook }) {
  const article = articles.find((a) => a.slug === slug)
  if (!article) return null
  return (
    <LegalOverlayShell onClose={onClose} label={article.title}>
      <p className="text-xs font-bold tracking-[0.3em] text-black/50">STUDY NOTES</p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter md:text-4xl">
        {article.title}
      </h2>
      <p className="mt-3 flex items-center gap-2 text-xs font-bold tracking-widest text-black/45">
        <Clock className="h-3.5 w-3.5" />
        {article.minutes} MIN READ · FIRST PRINCIPLES
      </p>
      {article.sections.map((s) => (
        <div key={s.head} className="mt-10">
          <h3 className="text-lg font-black tracking-tight md:text-xl">{s.head}</h3>
          <div className="mt-3 space-y-4">
            {s.paras.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-black/70 md:text-base">
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-12 rounded-sm bg-black p-7 text-white">
        <p className="text-lg font-black tracking-tight">Want this thinking applied to your child's syllabus?</p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          A free diagnostic session works through one of their current topics the same way —
          first principles, no memorisation.
        </p>
        <button
          onClick={onBook}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-white px-6 py-3 text-xs font-black tracking-widest text-black hover:bg-white/85"
        >
          BOOK FREE DIAGNOSTIC
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </LegalOverlayShell>
  )
}
