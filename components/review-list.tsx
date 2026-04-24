import { Star } from "lucide-react"
import { formatDate, pluralize } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Review } from "@/types/venue"

interface ReviewListProps {
  reviews: Review[]
  avgRating: number | null
  totalCount: number
}

export function ReviewList({ reviews, avgRating, totalCount }: ReviewListProps) {
  const histogram = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: totalCount > 0 ? (reviews.filter((r) => r.rating === star).length / totalCount) * 100 : 0,
  }))

  return (
    <div className="space-y-8">
      {/* Rating summary */}
      {avgRating != null && totalCount > 0 && (
        <div className="flex gap-8 pb-8 border-b border-border">
          <div className="text-center">
            <p className="font-serif text-5xl font-semibold">{avgRating.toFixed(1)}</p>
            <StarRow rating={avgRating} size="md" />
            <p className="text-sm text-muted-foreground mt-1">{pluralize(totalCount, "review")}</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {histogram.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">{star}</span>
                <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review cards */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="font-medium text-sm">{review.reviewer_name}</p>
                {review.reviewer_location && (
                  <p className="text-xs text-muted-foreground">{review.reviewer_location}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <StarRow rating={review.rating} size="sm" />
                {review.event_date && (
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(review.event_date)}</p>
                )}
              </div>
            </div>
            {review.guest_count && (
              <p className="text-xs text-muted-foreground mb-2">{review.guest_count} guests</p>
            )}
            <h4 className="font-serif font-semibold text-base mb-1">{review.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StarRow({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const filled = Math.round(rating)
  return (
    <div className="flex gap-0.5 mt-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            size === "md" ? "h-4 w-4" : "h-3 w-3",
            s <= filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
          )}
        />
      ))}
    </div>
  )
}
