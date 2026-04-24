"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = searchParams.get("next") ?? "/"
  const supabase = createClient()

  const [mode, setMode] = useState<"password" | "magic">("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      router.push(next)
      router.refresh()
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      setMagicSent(true)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to access your shortlist and inquiries.</p>
        </div>

        {magicSent ? (
          <div className="text-center p-8 border border-border rounded-2xl">
            <Mail className="h-10 w-10 text-accent mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold mb-2">Check your inbox</h3>
            <p className="text-muted-foreground text-sm">
              We&apos;ve sent a sign-in link to <strong>{email}</strong>. Click it to continue.
            </p>
          </div>
        ) : (
          <div className="border border-border rounded-2xl p-6 space-y-5">
            {/* Toggle */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              {(["password", "magic"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    mode === m ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "password" ? "Password" : "Magic link"}
                </button>
              ))}
            </div>

            <form onSubmit={mode === "password" ? handlePasswordSignIn : handleMagicLink} className="space-y-4">
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

              {mode === "password" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-accent hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Signing in…</>
                ) : mode === "password" ? "Sign in" : "Send magic link"}
              </Button>
            </form>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-accent hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
