"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"

interface HeaderProps {
  shortlistCount?: number
  user?: SupabaseUser | null
}

export function Header({ shortlistCount = 0, user: initialUser }: HeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(initialUser ?? null)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/venues", label: "Venues" },
    { href: "/map", label: "Map" },
    { href: "/shortlist", label: "Shortlist" },
    { href: "/about", label: "About" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
              Lieu
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname.startsWith(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {link.href === "/shortlist" && shortlistCount > 0 && (
                  <span className="ml-1.5 bg-accent text-accent-foreground text-xs rounded-full px-1.5 py-0.5 font-sans">
                    {shortlistCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate text-sm">
                      {user.user_metadata?.full_name ?? user.email}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/inquiries">My inquiries</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-up">Get started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.href === "/shortlist" && shortlistCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5">
                    {shortlistCount}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="flex px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    My account
                  </Link>
                  <Link
                    href="/inquiries"
                    className="flex px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    My inquiries
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex w-full px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-muted"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)}>Sign in</Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link href="/sign-up" onClick={() => setMobileOpen(false)}>Get started</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
