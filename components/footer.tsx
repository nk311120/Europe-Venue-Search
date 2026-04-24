"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const countries = [
    { href: "/venues?country=IT", label: "Italy" },
    { href: "/venues?country=FR", label: "France" },
    { href: "/venues?country=ES", label: "Spain" },
    { href: "/venues?country=PT", label: "Portugal" },
    { href: "/venues?country=UK", label: "United Kingdom" },
  ]

  const venueTypes = [
    { href: "/venues?venueType=chateau", label: "Châteaux" },
    { href: "/venues?venueType=villa", label: "Villas" },
    { href: "/venues?venueType=vineyard", label: "Vineyards" },
    { href: "/venues?venueType=castle", label: "Castles" },
    { href: "/venues?venueType=coastal", label: "Coastal Estates" },
  ]

  const company = [
    { href: "/about", label: "About" },
    { href: "/venues", label: "Browse venues" },
    { href: "/shortlist", label: "My shortlist" },
    { href: "/inquiries", label: "My inquiries" },
  ]

  return (
    <footer className="bg-foreground text-background/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-semibold text-background hover:text-accent transition-colors">
              Lieu
            </Link>
            <p className="mt-3 text-sm text-background/60 leading-relaxed max-w-xs">
              Helping couples discover extraordinary wedding venues across Europe — from Tuscan vineyards to Scottish castles.
            </p>
          </div>

          {/* By country */}
          <div>
            <h3 className="text-xs font-sans uppercase tracking-widest text-background/40 mb-4">
              By Country
            </h3>
            <ul className="space-y-2">
              {countries.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm hover:text-accent transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By type */}
          <div>
            <h3 className="text-xs font-sans uppercase tracking-widest text-background/40 mb-4">
              By Venue Type
            </h3>
            <ul className="space-y-2">
              {venueTypes.map((v) => (
                <li key={v.href}>
                  <Link href={v.href} className="text-sm hover:text-accent transition-colors">
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-sans uppercase tracking-widest text-background/40 mb-4">
              Stay Inspired
            </h3>
            <p className="text-sm text-background/60 mb-4">
              New venues, seasonal guides, and planning tips — direct to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-accent"
              />
              <Button type="submit" variant="outline" className="border-background/20 text-background hover:bg-background/10 shrink-0">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Lieu. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {company.map((c) => (
              <Link key={c.href} href={c.href} className="text-xs text-background/40 hover:text-background/80 transition-colors">
                {c.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-background/30">
            Venue fees and availability are indicative. Always confirm directly with the venue.
          </p>
        </div>
      </div>
    </footer>
  )
}
