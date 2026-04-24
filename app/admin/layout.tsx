import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in?next=/admin")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/")

  const navLinks = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/venues", label: "Venues" },
    { href: "/admin/inquiries", label: "Inquiries" },
    { href: "/admin/reviews", label: "Reviews" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold">Admin</h1>
        <nav className="flex gap-4 mt-4 border-b border-border pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pb-1 border-b-2 border-transparent hover:border-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  )
}
