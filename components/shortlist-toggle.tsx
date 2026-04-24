"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { toggleShortlist } from "@/server-actions/toggle-shortlist"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface ShortlistToggleProps {
  venueId: string
  isShortlisted: boolean
  onOptimisticToggle?: (venueId: string, newValue: boolean) => void
  variant?: "icon" | "button"
  className?: string
}

export function ShortlistToggle({
  venueId,
  isShortlisted: initialValue,
  onOptimisticToggle,
  variant = "icon",
  className,
}: ShortlistToggleProps) {
  const [shortlisted, setShortlisted] = useState(initialValue)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Guest: use localStorage
      const stored = JSON.parse(localStorage.getItem("shortlist") ?? "[]") as string[]
      const newShortlisted = !shortlisted
      const updated = newShortlisted
        ? [...stored, venueId]
        : stored.filter((id) => id !== venueId)
      localStorage.setItem("shortlist", JSON.stringify(updated))
      setShortlisted(newShortlisted)
      onOptimisticToggle?.(venueId, newShortlisted)
      toast(newShortlisted ? "Added to shortlist" : "Removed from shortlist", {
        description: newShortlisted ? "Sign in to save it permanently." : undefined,
      })
      return
    }

    setLoading(true)
    const newValue = !shortlisted
    setShortlisted(newValue)
    onOptimisticToggle?.(venueId, newValue)

    const result = await toggleShortlist(venueId)
    setLoading(false)

    if (!result.success) {
      setShortlisted(!newValue)
      onOptimisticToggle?.(venueId, !newValue)
      toast.error(result.error)
    } else {
      toast(result.action === "added" ? "Added to shortlist" : "Removed from shortlist")
    }
  }

  if (variant === "button") {
    return (
      <Button
        variant={shortlisted ? "default" : "outline"}
        size="sm"
        onClick={handleToggle}
        disabled={loading}
        className={cn("gap-2", className)}
        aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
      >
        <Heart className={cn("h-4 w-4", shortlisted && "fill-current")} />
        {shortlisted ? "Shortlisted" : "Save venue"}
      </Button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
      className={cn(
        "p-2 rounded-full transition-all duration-200",
        shortlisted
          ? "text-accent bg-accent/10 hover:bg-accent/20"
          : "text-muted-foreground hover:text-accent hover:bg-accent/10",
        className
      )}
    >
      <Heart className={cn("h-5 w-5", shortlisted && "fill-current")} />
    </button>
  )
}
