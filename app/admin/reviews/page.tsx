import type { Metadata } from "next"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/format"
import { Star } from "lucide-react"

export const metadata: Metadata = { title: "Admin — Reviews" }

async function approveReview(reviewId: string) {
  "use server"
  const supabase = await createServiceClient()
  await supabase.from("reviews").update({ status: "approved" }).eq("id", reviewId)
  revalidatePath("/admin/reviews")
}

async function rejectReview(reviewId: string) {
  "use server"
  const supabase = await createServiceClient()
  await supabase.from("reviews").update({ status: "rejected" }).eq("id", reviewId)
  revalidatePath("/admin/reviews")
}

export default async function AdminReviewsPage() {
  const supabase = await createClient()
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, venues(name, slug)")
    .order("created_at", { ascending: false })
    .limit(100)

  const pending = reviews?.filter((r) => r.status === "pending") ?? []
  const others = reviews?.filter((r) => r.status !== "pending") ?? []

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-6">
        Reviews — {pending.length} pending moderation
      </h2>

      {pending.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Pending</h3>
          <div className="space-y-3">
            {pending.map((review: any) => (
              <ReviewRow key={review.id} review={review} approveReview={approveReview} rejectReview={rejectReview} />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">Published / Rejected</h3>
          <div className="space-y-3">
            {others.map((review: any) => (
              <ReviewRow key={review.id} review={review} approveReview={approveReview} rejectReview={rejectReview} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ReviewRow({
  review,
  approveReview,
  rejectReview,
}: {
  review: any
  approveReview: (id: string) => Promise<void>
  rejectReview: (id: string) => Promise<void>
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating)

  return (
    <div className="border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.reviewer_name}</span>
            <span className="text-muted-foreground text-sm">on</span>
            <Link href={`/venues/${review.venues?.slug}`} className="font-medium hover:text-accent">
              {review.venues?.name}
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {stars.map((filled, i) => (
                <Star key={i} className={`h-3 w-3 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(review.created_at)}</span>
          </div>
        </div>
        <Badge variant={review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"}>
          {review.status}
        </Badge>
      </div>

      <h4 className="font-medium text-sm mt-2">{review.title}</h4>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{review.body}</p>

      {review.status === "pending" && (
        <div className="flex gap-2 mt-3">
          <form action={approveReview.bind(null, review.id)}>
            <Button type="submit" size="sm" variant="default">Approve</Button>
          </form>
          <form action={rejectReview.bind(null, review.id)}>
            <Button type="submit" size="sm" variant="outline" className="text-destructive">Reject</Button>
          </form>
        </div>
      )}
    </div>
  )
}
