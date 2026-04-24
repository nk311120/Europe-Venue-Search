"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { inquirySchema, type InquiryInput } from "@/lib/schemas"
import { submitInquiry } from "@/server-actions/submit-inquiry"

interface InquiryFormProps {
  venueId: string
  venueName: string
  onSuccess?: () => void
}

export function InquiryForm({ venueId, venueName, onSuccess }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      venueId,
      dateFlexible: false,
      consent: false,
    },
  })

  const dateFlexible = watch("dateFlexible")

  async function onSubmit(data: InquiryInput) {
    const result = await submitInquiry(data)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    setSubmitted(true)
    onSuccess?.()
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="font-serif text-xl font-semibold">Your inquiry is on its way</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Most venues reply within 2–3 business days. We&apos;ve sent a confirmation to your email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        {...register("honeypot")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name <span className="text-destructive">*</span></Label>
          <Input
            id="fullName"
            placeholder="Your name"
            {...register("fullName")}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 555 000 0000"
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="dateFlexible"
            checked={dateFlexible}
            onCheckedChange={(checked) => setValue("dateFlexible", !!checked)}
          />
          <Label htmlFor="dateFlexible" className="cursor-pointer">Dates are flexible</Label>
        </div>

        {!dateFlexible && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="preferredDateFrom">From</Label>
              <Input
                id="preferredDateFrom"
                type="date"
                {...register("preferredDateFrom")}
                aria-invalid={!!errors.preferredDateFrom}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="preferredDateTo">To</Label>
              <Input
                id="preferredDateTo"
                type="date"
                {...register("preferredDateTo")}
              />
            </div>
          </div>
        )}
        {errors.preferredDateFrom && (
          <p className="text-destructive text-xs">{errors.preferredDateFrom.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="guestCount">Guest count <span className="text-destructive">*</span></Label>
          <Input
            id="guestCount"
            type="number"
            min={10}
            max={400}
            placeholder="e.g. 80"
            {...register("guestCount", { valueAsNumber: true })}
            aria-invalid={!!errors.guestCount}
          />
          {errors.guestCount && <p className="text-destructive text-xs">{errors.guestCount.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Budget band (optional)</Label>
          <Select onValueChange={(v) => setValue("budgetBand", v as InquiryInput["budgetBand"])}>
            <SelectTrigger>
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$">$ — Under €8,000</SelectItem>
              <SelectItem value="$$">$$ — €8,000–€20,000</SelectItem>
              <SelectItem value="$$$">$$$ — €20,000–€40,000</SelectItem>
              <SelectItem value="$$$$">$$$$ — €40,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Your message <span className="text-destructive">*</span></Label>
        <Textarea
          id="message"
          placeholder={`Tell ${venueName} about your vision — ceremony style, catering preferences, anything that matters most to you.`}
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="consent"
          onCheckedChange={(checked) => setValue("consent", !!checked)}
          aria-invalid={!!errors.consent}
        />
        <div>
          <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed">
            I agree to share my contact details with {venueName} so they can respond to my inquiry.{" "}
            <span className="text-destructive">*</span>
          </Label>
          {errors.consent && <p className="text-destructive text-xs mt-1">{errors.consent.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending inquiry…
          </>
        ) : (
          <>
            <CalendarDays className="h-4 w-4 mr-2" />
            Send inquiry to {venueName}
          </>
        )}
      </Button>
    </form>
  )
}
