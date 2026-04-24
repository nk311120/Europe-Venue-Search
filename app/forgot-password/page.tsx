"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account`,
    })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link href="/sign-in">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to sign in
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-semibold mb-2">Reset your password</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Enter your email and we&apos;ll send a reset link.
        </p>

        {sent ? (
          <div className="text-center p-8 border border-border rounded-2xl">
            <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Check your inbox at <strong>{email}</strong> for the reset link.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4 border border-border rounded-2xl p-6">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending…</> : "Send reset link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
