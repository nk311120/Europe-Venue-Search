import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search, Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Vow & Venue helps couples find extraordinary European wedding venues.",
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-accent font-sans mb-4">Our story</p>
      <h1 className="font-serif text-5xl font-semibold leading-tight mb-8">
        We believe your venue<br />should be extraordinary
      </h1>

      <div className="prose prose-stone max-w-none space-y-5 text-muted-foreground leading-relaxed mb-16">
        <p>
          Planning a destination wedding is one of the most exciting — and daunting — things a couple can do. The venue sets the stage for everything: the ceremony, the dinner, the dancing that carries on past midnight. It deserves more than a hurried search across a dozen unfamiliar websites.
        </p>
        <p>
          Vow &amp; Venue was built to make that search joyful. We&apos;ve personally researched and catalogued 50 remarkable venues across Italy, France, Spain, Portugal, and the United Kingdom — from vine-covered chateaux in Provence to whitewashed villas on the Amalfi coast.
        </p>
        <p>
          Every listing is hand-selected for its setting, character, and ability to host 60–150 guests in the style that destination weddings deserve. We show you the honest detail — capacity, catering, accommodation, accessibility — so you can shortlist with confidence and inquire without friction.
        </p>
        <p>
          No booking fees. No middlemen. Just a clear path from discovery to inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: <Search className="h-6 w-6" />, n: "50", label: "Curated venues" },
          { icon: <Heart className="h-6 w-6" />, n: "5", label: "European countries" },
          { icon: <Mail className="h-6 w-6" />, n: "2–3", label: "Days to first reply" },
        ].map(({ icon, n, label }) => (
          <div key={label} className="text-center p-6 border border-border rounded-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-3">
              {icon}
            </div>
            <p className="font-serif text-4xl font-semibold">{n}</p>
            <p className="text-muted-foreground text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="font-serif text-3xl font-semibold mb-4">Ready to start?</h2>
        <p className="text-muted-foreground mb-6">Browse all 50 venues — filter by country, guest count, season, and more.</p>
        <Button size="lg" asChild>
          <Link href="/venues">
            Browse venues <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
