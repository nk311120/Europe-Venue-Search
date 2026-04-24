"use client"

import { Share2 } from "lucide-react"

export function ShareButton({ title }: { title: string }) {
  return (
    <button
      className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
      aria-label="Share this venue"
      onClick={() => {
        if (navigator.share) navigator.share({ title, url: window.location.href })
        else navigator.clipboard?.writeText(window.location.href)
      }}
    >
      <Share2 className="h-4 w-4" />
    </button>
  )
}
