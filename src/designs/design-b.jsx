import { ArrowDown, ArrowRight, BookOpen, CalendarClock, Check, Clock, GraduationCap, MapPin, MessageCircle, Minus, Repeat, X } from "lucide-react"
import { MotionConfig } from "motion/react"
import { GradientScene } from "@/components/gradient-scene"
import { CountUp, FadeUp, StaggerGroup, StaggerItem, StaggerList, WordStagger } from "@/components/motion-helpers"
import { PhotoPlaceholder } from "@/components/photo-placeholder"
import { ArticleCard } from "@/components/article-overlay"
import { trackEvent } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import {
  about,
  articles,
  audience,
  brand,
  diagnostic,
  evidenceLite,
  faq,
  finalCta,
  fit,
  gap,
  gradeVsDegree,
  hero,
  logistics,
  method4,
  outcomes,
  parentNote,
  pricing,
  waMessages,
  whatsappFor,
} from "@/content"

function SectionHead({ index, children }) {
  return (
    <FadeUp className="flex items-baseline justify-between border-b border-black/15 pb-4">
      <p className="text-xs font-bold tracking-[0.3em]">{index}</p>
      <h2 className="text-right text-4xl font-black tracking-tighter md:text-6xl">{children}</h2>
    </FadeUp>
  )
}

export function DesignB({ onOpenLegal, onOpenArticle }) {
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[#f4f2ee] font-display text-black">
      <GradientScene light className="fixed" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Nav */}
        <header className="fade-up flex items-center justify-between border-b border-black/10 py-6">
          <p className="text-xs font-black tracking-[0.25em] md:text-sm">{brand.name}</p>
          <nav className="hidden items-center gap-8 text-xs font-bold tracking-widest md:flex">
            <a href="#how" className="hover:opacity-60">HOW IT WORKS</a>
            <a href="#who" className="hover:opacity-60">WHO IT'S FOR</a>
            <a href="#results" className="hover:opacity-60">RESULTS</a>
            <a href="#about" className="hover:opacity-60">ABOUT</a>
          </nav>
          <Button asChild href={brand.whatsapp} variant="dark" size="sm" className="rounded-none font-bold tracking-widest">
            BOOK A DIAGNOSTIC
          </Button>
        </header>

        {/* 1. HERO */}
        <section className="fade-up py-14 text-center md:py-28" style={{ animationDelay: "100ms" }}>
          <p className="text-xs font-bold tracking-[0.35em] text-black/55">{hero.eyebrow}</p>
          <h1 className="mx-auto mt-8 max-w-5xl text-[12vw] font-black leading-[0.9] tracking-tighter md:text-[7.5rem]">
            <WordStagger text="GOOD GRADES" />
            <br />
            <WordStagger text="AREN'T THE" startAt={0.1} />
            <br />
            <WordStagger text="FINISH LINE." startAt={0.2} />
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[12vw] font-black leading-[0.9] tracking-tighter text-black/30 md:text-[7.5rem]">
            <WordStagger text="REASONING IS." startAt={0.35} />
          </p>
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">
            First Principles is one-to-one tutoring in Mathematics, Physics and Chemistry designed
            to help ambitious students understand <em>why</em> things work — not simply remember
            how to answer familiar questions.
          </p>
          <PhotoPlaceholder label="Photo: Gregory teaching a session" className="mt-10 w-full" ratio="aspect-video" />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild href={brand.whatsapp} variant="dark" size="lg" className="rounded-none font-bold tracking-widest" onClick={() => trackEvent("cta_click", { location: "hero" })}>
              Book a Diagnostic
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild href="#how" variant="lightOutline" size="lg" className="rounded-none font-bold tracking-widest">
              See How It Works
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-5 text-xs tracking-wide text-black/50">{hero.ctaNote}</p>
        </section>

        {/* 2. ABOUT / TRUST */}
        <section id="about" className="scroll-mt-8 border-t border-black/10 py-16 md:py-24">
          <SectionHead index="01">{about.heading}</SectionHead>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-sm border border-black/15 bg-black/[0.02]">
              <img
                src="/gregory.png"
                alt="Gregory Kimemiah — First Principles tutor"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div>
              <p className="max-w-lg text-2xl font-black leading-snug tracking-tight md:text-3xl">{about.greeting}</p>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 max-w-lg text-base leading-relaxed text-black/70">{p}</p>
              ))}
              <div className="mt-8 max-w-lg rounded-sm border border-dashed border-black/30 bg-black/[0.02] p-6">
                <p className="text-[11px] font-black tracking-[0.25em] text-black/60">{about.callout.head}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{about.callout.body}</p>
              </div>
              <dl className="mt-10 divide-y divide-black/10 border-y border-black/10">
                {about.credentials.map((c) => (
                  <div key={c.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="w-28 shrink-0 text-[11px] font-bold uppercase tracking-widest text-black/45">{c.label}</dt>
                    <dd className="text-sm font-semibold">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3. GRADE vs DEGREE */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <SectionHead index="02">
            WHAT EARNS
            <br />
            THE GRADE?
          </SectionHead>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-sm border border-black/15 bg-white p-8 md:p-10">
              <p className="text-xs font-bold tracking-[0.3em] text-black/50">{gradeVsDegree.grade.head}</p>
              <StaggerList className="mt-6 space-y-4">
                {gradeVsDegree.grade.points.map((p) => (
                  <StaggerItem key={p} className="text-lg font-medium leading-snug md:text-xl">{p}</StaggerItem>
                ))}
              </StaggerList>
            </div>
            <PhotoPlaceholder label="Photo: Gregory teaching — whiteboard session" className="h-full min-h-64" ratio="aspect-square md:aspect-auto" />
            <div className="rounded-sm bg-black p-8 text-white md:p-10">
              <p className="text-xs font-bold tracking-[0.3em] text-white/60">{gradeVsDegree.degree.head}</p>
              <StaggerList className="mt-6 space-y-4">
                {gradeVsDegree.degree.points.map((p) => (
                  <StaggerItem key={p} className="text-lg font-bold leading-snug md:text-xl">{p}</StaggerItem>
                ))}
              </StaggerList>
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <p className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{gradeVsDegree.close}</p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/65 md:text-xl">{gradeVsDegree.sub}</p>
          </div>
        </section>

        {/* 4. METHOD */}
        <section id="how" className="scroll-mt-8 border-t border-black/10 py-16 md:py-24">
          <SectionHead index="03">{method4.title}</SectionHead>
          <div className="mt-12 grid gap-px border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {method4.steps.map((s) => (
              <div key={s.n} className="bg-[#f4f2ee] p-7">
                <p className="text-xs font-bold tracking-[0.3em] text-black/40">{s.n}</p>
                <h3 className="mt-3 text-xl font-black tracking-tight">{s.head}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/65">{s.body}</p>
                {s.n === "02" && (
                  <PhotoPlaceholder label="Photo: Formula derivation — whiteboard close-up" className="mt-5 w-full" ratio="aspect-[16/10]" />
                )}
                <ul className="mt-5 space-y-2 border-t border-black/10 pt-4">
                  {s.asks.map((a) => (
                    <li key={a} className="text-sm font-medium italic leading-snug text-black/75">{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-bold leading-snug md:text-xl">
            {method4.close}
          </p>
        </section>

        {/* 5. DIAGNOSTIC */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <div className="rounded-sm bg-black p-8 text-white md:p-14">
            <p className="text-xs font-bold tracking-[0.3em] text-white/50">{diagnostic.title}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tighter md:text-6xl">{diagnostic.sub}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{diagnostic.body}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {diagnostic.looks.map((l) => (
                <div key={l.n} className="border-t border-white/20 pt-4">
                  <p className="text-xs font-bold tracking-[0.25em] text-white/50">{l.n}</p>
                  <p className="mt-2 text-base font-bold uppercase tracking-tight">{l.head}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{l.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl border-l-2 border-white/40 pl-5 text-base font-medium italic leading-relaxed text-white/85">
              {diagnostic.close}
            </p>
            <Button asChild href={brand.whatsapp} variant="glow" size="lg" className="mt-10 rounded-none font-bold tracking-widest" onClick={() => trackEvent("cta_click", { location: "diagnostic_box" })}>
              <MessageCircle className="h-4 w-4" />
              Book a Diagnostic
            </Button>
          </div>
        </section>

        {/* 6. RESULTS */}
        <section id="results" className="scroll-mt-8 border-t border-black/10 py-16 md:py-24">
          <SectionHead index="04">{evidenceLite.title}</SectionHead>

          {/* Evidence — one verified stat */}
          <div className="mx-auto mt-12 max-w-3xl rounded-sm border border-black/15 bg-white p-8 text-center md:p-12">
            <p className="text-xs font-bold tracking-[0.3em] text-black/50">{evidenceLite.stats[0].head}</p>
            <p className="mt-4 text-7xl font-black tracking-tighter md:text-8xl">
              <CountUp to={parseInt(evidenceLite.stats[0].value, 10)} suffix="%" duration={1.2} />
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-snug text-black/70">{evidenceLite.stats[0].body}</p>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-black/40">{evidenceLite.stats[0].source}</p>
          </div>
        </section>

        {/* 7. WHO IT'S FOR */}
        <section id="who" className="scroll-mt-8 border-t border-black/10 py-16 md:py-24">
          <SectionHead index="05">{fit.title}</SectionHead>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-black tracking-[0.25em]">YES, IF THEY…</p>
              <StaggerList className="mt-6 space-y-0 border-t border-black/15">
                {fit.yes.map((c) => (
                  <StaggerItem key={c} className="flex items-start gap-3 border-b border-black/15 py-4 text-base font-medium leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    {c}
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
            <StaggerGroup>
              <p className="text-sm font-black tracking-[0.25em] text-black/45">PROBABLY NOT, IF…</p>
              <StaggerItem as="div" className="mt-6 rounded-sm border border-black/15 bg-white p-7">
                <p className="flex items-start gap-3 text-base leading-relaxed text-black/70">
                  <Minus className="mt-1 h-4 w-4 shrink-0" />
                  {fit.no}
                </p>
                <p className="mt-5 border-t border-black/10 pt-4 text-sm font-bold italic">{fit.noNote}</p>
              </StaggerItem>
              <StaggerItem as="div" className="mt-8 rounded-sm bg-black p-7 text-white">
                <p className="text-xs font-bold tracking-[0.25em] text-white/50">AFTER A FEW MONTHS…</p>
                <ul className="mt-5 space-y-4">
                  {outcomes.items.map((o) => (
                    <li key={o.head}>
                      <p className="text-sm font-black tracking-wide">{o.head}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{o.body}</p>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* 8. PARENT DIRECT */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <X className="mx-auto h-6 w-6 text-black/30" />
            <h2 className="mt-6 text-3xl font-black leading-tight tracking-tighter md:text-5xl">{parentNote.title}</h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">{parentNote.body}</p>
            <p className="mx-auto mt-8 max-w-xl text-xl font-bold leading-snug md:text-2xl">{parentNote.question}</p>
            <p className="mt-4 text-base font-medium text-black/60">{parentNote.close}</p>
          </div>
        </section>

        {/* 9. PRICING */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <SectionHead index="06">
            {pricing.title}
            <br />
            {pricing.sub}
          </SectionHead>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {pricing.tiers.map((t) => {
              const featured = t.featured
              return (
                <div key={t.name} className={`relative flex flex-col rounded-sm border p-8 ${featured ? "glow-gold border-[#D4A017] bg-black text-white shadow-xl md:-my-3 md:py-11" : "border-black/15 bg-white"}`}>
                  {t.badge && (
                    <p className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1 text-[11px] font-black tracking-[0.25em] ring-2 ring-[#f4f2ee] ${featured ? "bg-[#D4A017] text-black" : "bg-black text-white"}`}>
                      {t.badge}
                    </p>
                  )}
                  <p className={`text-xs font-black tracking-[0.25em] ${featured ? "text-white/60" : "text-black/50"}`}>{t.name}</p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
                    {t.was && (
                      <p className="text-lg font-bold text-white/40 line-through">{t.was}</p>
                    )}
                    <p className="text-4xl font-black tracking-tighter md:text-5xl">{t.price}</p>
                    {t.per && (
                      <p className={`text-sm font-bold ${featured ? "text-white/60" : "text-black/50"}`}>{t.per}</p>
                    )}
                  </div>
                  {t.save && (
                    <p className="mt-3 inline-block w-fit bg-white px-3 py-1 text-xs font-black tracking-[0.2em] text-black">
                      {t.save}
                    </p>
                  )}
                  {t.effective && (
                    <p className="mt-2 text-sm font-bold text-white/70">{t.effective}</p>
                  )}
                  <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 text-sm leading-relaxed ${featured ? "border-white/15 text-white/70" : "border-black/10 text-black/65"}`}>
                    {t.includes.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {t.excludes.map((f) => (
                      <li key={f} className={`flex items-start gap-2 ${featured ? "text-white/40" : "text-black/40"}`}>
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild href={whatsappFor(waMessages[t.waKey])} variant={featured ? "glow" : "dark"} size="default" className="mt-8 w-full rounded-none font-bold tracking-widest" onClick={() => trackEvent("cta_click", { location: `pricing_${t.name}` })}>
                    {t.cta}
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-sm border border-black/15 bg-white p-6 text-center md:p-8">
            <p className="text-[11px] font-black tracking-[0.25em] text-black/50">{pricing.compare.head}</p>
            <div className="mt-4 flex items-center justify-center gap-4 md:gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/45">{pricing.compare.left.label}</p>
                <p className="mt-1 text-2xl font-black tracking-tighter md:text-3xl">{pricing.compare.left.price}</p>
                <p className="mt-1 text-[11px] font-medium text-black/50">{pricing.compare.left.sub}</p>
              </div>
              <p className="text-xl font-black">→</p>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">{pricing.compare.right.label}</p>
                <p className="mt-1 text-2xl font-black tracking-tighter md:text-3xl">{pricing.compare.right.price}</p>
                <p className="mt-1 text-[11px] font-medium text-black/50">{pricing.compare.right.sub}</p>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-black/65">{pricing.compare.save}</p>
          </div>
        </section>

        {/* 10. LOGISTICS */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <SectionHead index="07">{logistics.title}</SectionHead>
          <PhotoPlaceholder label="Photo: Gregory in a 1-on-1 session" className="mt-12 w-full" ratio="aspect-video md:aspect-[21/9]" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {logistics.items.map((l) => {
              const Icon = { MapPin, CalendarClock, Clock, Repeat, BookOpen, GraduationCap }[l.icon] ?? MapPin
              return (
                <div key={l.head} className="group rounded-sm border border-black/15 bg-white p-7 transition-all hover:-translate-y-1 hover:border-black hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-black text-white transition-colors group-hover:bg-black">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="mt-5 text-lg font-black tracking-tight">{l.head}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-[15px]">{l.body}</p>
                </div>
              )
            })}
          </div>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-sm bg-black p-8 text-center text-white md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-lg font-black tracking-tight">Tell us your child's timetable.</p>
              <p className="mt-1 text-sm text-white/65">We'll fit sessions around school hours — evenings and weekends included.</p>
            </div>
            <Button asChild href={whatsappFor(waMessages.timetable)} variant="glow" size="default" className="shrink-0 rounded-none font-bold tracking-widest" onClick={() => trackEvent("cta_click", { location: "timetable" })}>
              <MessageCircle className="h-4 w-4" />
              Plan sessions
            </Button>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <SectionHead index="08">{faq.title}</SectionHead>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/10 border-y border-black/10">
            {faq.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold md:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-xl font-black transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/65 md:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 12. STUDY NOTES */}
        <section className="border-t border-black/10 py-16 md:py-24">
          <SectionHead index="09">STUDY NOTES</SectionHead>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-black/65">
            Short, free revision notes written the way we teach — derivation first, memorisation
            last. New notes appear here regularly.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} onOpen={onOpenArticle} />
            ))}
          </div>
        </section>

        {/* 13. FINAL CTA */}
        <section className="border-t border-black/10 py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">{finalCta.body}</p>
          <div className="mt-10">
            <Button asChild href={brand.whatsapp} variant="dark" size="xl" className="rounded-none font-bold tracking-widest" onClick={() => trackEvent("cta_click", { location: "final" })}>
              <MessageCircle className="h-5 w-5" />
              BOOK A FREE DIAGNOSTIC
            </Button>
          </div>
          <p className="mt-4 text-xs tracking-wide text-black/50">{finalCta.note}</p>
          <footer className="mt-20 border-t border-black/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-3 text-[10px] font-bold tracking-[0.3em] text-black/45 md:flex-row">
              <span>{brand.name}</span>
              <span>Kahawa Sukari · Ruiru · Thika Rd — Online anywhere</span>
              <span>{brand.email}</span>
            </div>
            <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[11px] text-black/50 md:flex-row">
              <span>© 2026 {brand.name}. All rights reserved.</span>
              <div className="flex gap-6">
                <button onClick={() => onOpenLegal?.("privacy")} className="cursor-pointer font-bold tracking-widest underline underline-offset-4 hover:text-black">
                  PRIVACY POLICY
                </button>
                <button onClick={() => onOpenLegal?.("terms")} className="cursor-pointer font-bold tracking-widest underline underline-offset-4 hover:text-black">
                  TERMS OF SERVICE
                </button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
    </MotionConfig>
  )
}
