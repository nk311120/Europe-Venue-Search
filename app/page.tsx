import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VenueCard } from "@/components/venue-card"
import { createClient } from "@/lib/supabase/server"
import type { VenueWithReviewStats } from "@/types/venue"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: featuredVenues } = await supabase
    .from("venues")
    .select(`
      *,
      reviews!inner(rating)
    `)
    .eq("is_featured", true)
    .eq("reviews.status", "approved")
    .limit(6)

  // Compute avg_rating and review_count from joined reviews
  const venues: VenueWithReviewStats[] = (featuredVenues ?? []).map((v: any) => {
    const ratings = (v.reviews ?? []).map((r: any) => r.rating)
    const avg_rating = ratings.length ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : null
    return { ...v, avg_rating, review_count: ratings.length }
  })

  const countries = [
    { code: "IT", name: "Italy", region: "Tuscany · Amalfi · Lake Como", img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80", count: 14 },
    { code: "FR", name: "France", region: "Provence · Loire · Côte d'Azur", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80", count: 12 },
    { code: "ES", name: "Spain", region: "Mallorca · Andalusia · Catalonia", img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80", count: 10 },
    { code: "PT", name: "Portugal", region: "Douro · Alentejo · Sintra", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80", count: 7 },
    { code: "UK", name: "United Kingdom", region: "Cotswolds · Scotland · Cornwall", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", count: 7 },
  ]

  const howItWorks = [
    { icon: <Search className="h-6 w-6" />, step: "01", title: "Discover", body: "Browse 50 curated venues across five European countries. Filter by country, guest count, venue type, season, and more." },
    { icon: <Heart className="h-6 w-6" />, step: "02", title: "Shortlist", body: "Save your favourites. Compare up to five venues side by side. Share your shortlist with your partner or planner." },
    { icon: <Mail className="h-6 w-6" />, step: "03", title: "Inquire", body: "Send a tailored inquiry directly to the venue. Most respond within 2–3 business days." },
  ]

  const testimonials = [
    { name: "Sophie & James", location: "London", quote: "We found our Provençal farmhouse through Lieu and couldn't be happier. The inquiry process was so easy — the venue replied within a day.", venue: "Domaine de la Lumière, Provence" },
    { name: "Emma & Lucas", location: "New York", quote: "The filters made it effortless to narrow down venues in Tuscany that could host our 120 guests with on-site accommodation. Absolute game-changer.", venue: "Villa Serafina, Tuscany" },
    { name: "Claire & Tomás", location: "Sydney", quote: "We shortlisted six venues and sent one message. Every single venue replied within three days. We booked our Andalusian masia two weeks later.", venue: "La Finca del Olivar, Andalusia" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
            alt="Elegant European wedding venue with stone architecture and golden light"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-accent text-xs uppercase tracking-[0.3em] font-sans mb-6">
            Destination Weddings · Europe
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white leading-[1.1] mb-6">
            Your perfect venue,<br />somewhere extraordinary
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            Discover 50 curated wedding venues across Italy, France, Spain, Portugal, and the United Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-foreground hover:bg-white/90 text-base px-8">
              <Link href="/venues">
                Browse all venues
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white bg-transparent hover:bg-white/10 text-base px-8">
              <Link href="/about">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-3">Explore by country</p>
            <h2 className="font-serif text-4xl font-semibold">Five extraordinary countries</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {countries.map((c) => (
              <Link key={c.code} href={`/venues?country=${c.code}`} className="group relative rounded-2xl overflow-hidden aspect-[3/4]">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-serif text-lg font-semibold">{c.name}</p>
                  <p className="text-white/70 text-xs font-sans mt-0.5">{c.region}</p>
                  <p className="text-accent text-xs font-sans mt-1">{c.count} venues</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured venues */}
      {venues.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-2">Hand-picked</p>
                <h2 className="font-serif text-4xl font-semibold">Featured venues</h2>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex gap-2">
                <Link href="/venues">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>

            <div className="text-center mt-10 sm:hidden">
              <Button asChild>
                <Link href="/venues">View all venues</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-3">Simple by design</p>
            <h2 className="font-serif text-4xl font-semibold">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map(({ icon, step, title, body }) => (
              <div key={step} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5">
                  {icon}
                </div>
                <p className="text-xs font-sans text-muted-foreground tracking-widest uppercase mb-2">{step}</p>
                <h3 className="font-serif text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-foreground">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 font-sans mb-12">
            From couples who found their venue here
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-2xl p-6">
                <p className="text-white/90 text-sm leading-relaxed mb-4 font-serif italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/50 text-xs font-sans">{t.location}</p>
                  <p className="text-accent text-xs font-sans mt-1">{t.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-semibold mb-4">Ready to find your venue?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Browse our curated collection of 50 venues across Europe. No account required to start exploring.
          </p>
          <Button size="lg" asChild className="px-10 text-base">
            <Link href="/venues">
              Start exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
