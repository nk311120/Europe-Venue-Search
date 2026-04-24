import { Button, Section, Text } from "@react-email/components"
import { EmailLayout } from "./_layout"

interface InquiryConfirmationProps {
  venueName: string
  guestFullName: string
  preferredDateFrom?: string | null
  preferredDateTo?: string | null
  dateFlexible: boolean
  guestCount: number
  message: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function InquiryConfirmation({
  venueName,
  guestFullName,
  preferredDateFrom,
  preferredDateTo,
  dateFlexible,
  guestCount,
  message,
}: InquiryConfirmationProps) {
  const firstName = guestFullName.split(" ")[0]

  const dateRange = dateFlexible
    ? "Flexible"
    : preferredDateFrom && preferredDateTo
    ? `${preferredDateFrom} – ${preferredDateTo}`
    : "Not specified"

  return (
    <EmailLayout preview={`Your inquiry to ${venueName} is on its way`}>
      <Text style={heading}>Your inquiry is on its way</Text>
      <Text style={intro}>
        Hi {firstName}, we&apos;ve sent your inquiry to <strong>{venueName}</strong>. The team will
        review your details and get back to you shortly.
      </Text>

      <Section style={timelineBox}>
        <Text style={timelineText}>
          ⏱ Most venues reply within <strong>2–3 business days</strong>.
        </Text>
      </Section>

      <Text style={summaryLabel}>Your inquiry summary</Text>
      <Section style={detailsBox}>
        <Text style={detailRow}><span style={label}>Venue</span> {venueName}</Text>
        <Text style={detailRow}><span style={label}>Dates</span> {dateRange}</Text>
        <Text style={detailRow}><span style={label}>Guests</span> {guestCount}</Text>
      </Section>

      <Text style={messageLabel}>Your message</Text>
      <Text style={messageBody}>{message}</Text>

      <Button href={`${siteUrl}/inquiries`} style={button}>
        View your inquiries
      </Button>

      <Text style={footer}>
        If you have questions, reply directly to this email and we&apos;ll be happy to help.
      </Text>
    </EmailLayout>
  )
}

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#1C1A17",
  margin: "0 0 16px",
}

const intro: React.CSSProperties = {
  fontSize: "15px",
  color: "#444",
  lineHeight: "1.6",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "0 0 24px",
}

const timelineBox: React.CSSProperties = {
  backgroundColor: "#FFF5EE",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "28px",
  border: "1px solid #F0DDD0",
}

const timelineText: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#7A4A1A",
  margin: 0,
}

const summaryLabel: React.CSSProperties = {
  fontSize: "12px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#8A8070",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0 0 8px",
}

const detailsBox: React.CSSProperties = {
  backgroundColor: "#FAF8F5",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "24px",
  border: "1px solid #E8E3DA",
}

const detailRow: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#1C1A17",
  margin: "0 0 6px",
}

const label: React.CSSProperties = {
  color: "#8A8070",
  minWidth: "80px",
  display: "inline-block",
}

const messageLabel: React.CSSProperties = {
  fontSize: "12px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#8A8070",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0 0 8px",
}

const messageBody: React.CSSProperties = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.7",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  backgroundColor: "#FAF8F5",
  borderLeft: "3px solid #C17A4A",
  paddingLeft: "16px",
  margin: "0 0 32px",
}

const button: React.CSSProperties = {
  backgroundColor: "#C17A4A",
  color: "#FFFFFF",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "24px",
}

const footer: React.CSSProperties = {
  fontSize: "13px",
  color: "#8A8070",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "24px 0 0",
}
