"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      setDone(true)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Save venues, track inquiries, and get personalised suggestions.
          </p>
        </div>

        {done ? (
          <div className="text-center p-8 border border-border rounded-2xl">
            <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold mb-2">Almost there!</h3>
            <p className="text-muted-foreground text-sm">
              Check your inbox at <strong>{email}</strong> and click the confirmation link to activate your account.
            </p>
          </div>
        ) : (
          <div className="border border-border rounded-2xl p-6 space-y-5">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                />
              </div>
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
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating account…</>
                ) : "Create account"}
              </Button>
            </form>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
