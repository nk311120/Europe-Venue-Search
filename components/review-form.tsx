"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { reviewSchema, type ReviewInput } from "@/lib/schemas"
import { submitReview } from "@/server-actions/submit-review"
import { cn } from "@/lib/utils"

interface ReviewFormProps {
  venueId: string
  venueName: string
  isAuthenticated: boolean
}

export function ReviewForm({ venueId, venueName, isAuthenticated }: ReviewFormProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { venueId, rating: 0 },
  })

  const rating = watch("rating")

  async function onSubmit(data: ReviewInput) {
    const result = await submitReview(data)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    setSubmitted(true)
    toast.success("Review submitted — pending moderation.")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => !isAuthenticated && toast.error("Please sign in to write a review.")}>
          Write a review
        </Button>
      </DialogTrigger>
      {isAuthenticated && (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Review {venueName}</DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <p className="font-medium">Thanks for your review!</p>
              <p className="text-sm text-muted-foreground">It will be published after a brief moderation check.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              {/* Star rating */}
              <div className="space-y-1.5">
                <Label>Your rating <span className="text-destructive">*</span></Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setValue("rating", star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={cn(
                          "h-7 w-7 transition-colors",
                          star <= (hoveredStar || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-destructive text-xs">{errors.rating.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="reviewerName">Your name <span className="text-destructive">*</span></Label>
                  <Input id="reviewerName" placeholder="Jane Smith" {...register("reviewerName")} />
                  {errors.reviewerName && <p className="text-destructive text-xs">{errors.reviewerName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reviewerLocation">Location (optional)</Label>
                  <Input id="reviewerLocation" placeholder="New York, NY" {...register("reviewerLocation")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="eventDate">Event date (optional)</Label>
                  <Input id="eventDate" type="date" {...register("eventDate")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="guestCount">Guest count (optional)</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="e.g. 80"
                    {...register("guestCount", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reviewTitle">Title <span className="text-destructive">*</span></Label>
                <Input id="reviewTitle" placeholder="A magical day in Tuscany" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reviewBody">Your review <span className="text-destructive">*</span></Label>
                <Textarea
                  id="reviewBody"
                  rows={5}
                  placeholder="Share the highlights — the setting, the service, the food, anything that stood out."
                  {...register("body")}
                />
                {errors.body && <p className="text-destructive text-xs">{errors.body.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>
                ) : "Submit review"}
              </Button>
            </form>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}
