import { articles, brand, faq } from "@/content"

function stripEmphasis(s) {
  return s.replace(/[“”"']/g, "")
}

export function SeoSchemas() {
  const graph = [
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: stripEmphasis(f.q),
        acceptedAnswer: { "@type": "Answer", text: stripEmphasis(f.a) },
      })),
    },
    {
      "@type": "ItemList",
      name: "First Principles Study Notes",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          author: { "@type": "Person", name: "Gregory Kimemiah" },
          publisher: { "@type": "Organization", name: brand.name },
        },
      })),
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://firstprinciples.ke/#business",
      name: `${brand.name} — 1-on-1 STEM Tutoring`,
      description:
        "One-to-one tutoring in Mathematics, Physics and Chemistry for Form 2–4 students, focused on reasoning behind the grade.",
      email: brand.email,
      areaServed: ["Kahawa Sukari", "Ruiru", "Thika Road", "Nairobi", "Kenya"],
      priceRange: "KES 1,500–2,500",
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  )
}
