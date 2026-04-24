import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface VenuePlaceholderProps {
  className?: string
  label?: string
}

export function VenuePlaceholder({ className, label }: VenuePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-muted text-muted-foreground",
        className
      )}
      role="img"
      aria-label={label ?? "Venue image unavailable"}
    >
      <ImageOff className="h-8 w-8 mb-2 opacity-40" />
      <span className="text-xs opacity-60">Image unavailable</span>
    </div>
  )
}
