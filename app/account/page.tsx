import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = { title: "My Account" }

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in?next=/account")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { count: inquiryCount } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: shortlistCount } = await supabase
    .from("shortlists")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold mb-8">My account</h1>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Link href="/inquiries" className="p-5 border border-border rounded-2xl hover:bg-muted/30 transition-colors group">
          <p className="font-serif text-3xl font-semibold">{inquiryCount ?? 0}</p>
          <p className="text-muted-foreground text-sm mt-1">
            Inquiry{(inquiryCount ?? 0) !== 1 ? "s" : ""} sent
          </p>
          <span className="text-xs text-accent flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
            View all <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link href="/shortlist" className="p-5 border border-border rounded-2xl hover:bg-muted/30 transition-colors group">
          <p className="font-serif text-3xl font-semibold">{shortlistCount ?? 0}</p>
          <p className="text-muted-foreground text-sm mt-1">
            Venue{(shortlistCount ?? 0) !== 1 ? "s" : ""} shortlisted
          </p>
          <span className="text-xs text-accent flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
            View shortlist <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      <div className="border border-border rounded-2xl p-6 space-y-5">
        <h2 className="font-serif text-xl font-semibold">Profile</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input defaultValue={profile?.full_name ?? ""} disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input defaultValue={user.email ?? ""} disabled />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          To update your name or email, please contact support.
        </p>
      </div>
    </div>
  )
}
