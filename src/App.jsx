import { useCallback, useEffect, useState } from "react"
import { DesignB } from "@/designs/design-b"
import { ArticleOverlay } from "@/components/article-overlay"
import { CookieBanner } from "@/components/cookie-banner"
import { LegalOverlay } from "@/components/legal"
import { StickyCta } from "@/components/sticky-cta"
import { SeoSchemas } from "@/components/seo-schemas"
import { initAnalytics } from "@/lib/analytics"
import { brand } from "@/content"

export default function App() {
  const [legalPage, setLegalPage] = useState(null)
  const [articleSlug, setArticleSlug] = useState(null)
  const openLegal = useCallback((page) => setLegalPage(page), [])
  const closeLegal = useCallback(() => setLegalPage(null), [])
  const openArticle = useCallback((slug) => setArticleSlug(slug), [])
  const closeArticle = useCallback(() => setArticleSlug(null), [])
  const overlayOpen = !!legalPage || !!articleSlug

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [overlayOpen])

  return (
    <div className="min-h-screen">
      <SeoSchemas />
      <DesignB onOpenLegal={openLegal} onOpenArticle={openArticle} />
      <CookieBanner onOpenLegal={openLegal} />
      <StickyCta hidden={overlayOpen} />
      <LegalOverlay page={legalPage} onClose={closeLegal} />
      <ArticleOverlay
        slug={articleSlug}
        onClose={closeArticle}
        onBook={() => {
          closeArticle()
          window.open(brand.whatsapp, "_blank", "noopener")
        }}
      />
    </div>
  )
}
