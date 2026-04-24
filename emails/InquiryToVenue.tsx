import { Button, Section, Text } from "@react-email/components"
import { EmailLayout } from "./_layout"

interface InquiryToVenueProps {
  venueName: string
  guestFullName: string
  guestEmail: string
  guestPhone?: string | null
  preferredDateFrom?: string | null
  preferredDateTo?: string | null
  dateFlexible: boolean
  guestCount: number
  budgetBand?: string | null
  message: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function InquiryToVenue({
  venueName,
  guestFullName,
  guestEmail,
  guestPhone,
  preferredDateFrom,
  preferredDateTo,
  dateFlexible,
  guestCount,
  budgetBand,
  message,
}: InquiryToVenueProps) {
  const subject = `New wedding inquiry from ${guestFullName} (${guestCount} guests)`

  const dateRange = dateFlexible
    ? "Flexible"
    : preferredDateFrom && preferredDateTo
    ? `${preferredDateFrom} – ${preferredDateTo}`
    : "Not specified"

  return (
    <EmailLayout preview={subject}>
      <Text style={heading}>New Inquiry for {venueName}</Text>
      <Text style={intro}>
        A couple is interested in hosting their wedding at your venue. Their details are below.
        To reply, simply respond to this email — it will go directly to {guestFullName}.
      </Text>

      <Section style={detailsBox}>
        <Row label="Name" value={guestFullName} />
        <Row label="Email" value={guestEmail} />
        {guestPhone && <Row label="Phone" value={guestPhone} />}
        <Row label="Preferred dates" value={dateRange} />
        <Row label="Guest count" value={String(guestCount)} />
        {budgetBand && <Row label="Budget band" value={budgetBand} />}
      </Section>

      <Text style={messageLabel}>Their message</Text>
      <Text style={messageBody}>{message}</Text>

      <Button href={`${siteUrl}/admin/inquiries`} style={button}>
        View in Admin Dashboard
      </Button>
    </EmailLayout>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
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

const detailsBox: React.CSSProperties = {
  backgroundColor: "#FAF8F5",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
  border: "1px solid #E8E3DA",
}

const row: React.CSSProperties = {
  display: "flex",
  marginBottom: "8px",
}

const rowLabel: React.CSSProperties = {
  fontSize: "12px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#8A8070",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  width: "140px",
  margin: 0,
}

const rowValue: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#1C1A17",
  margin: 0,
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
  fontSize: "15px",
  color: "#333",
  lineHeight: "1.7",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  backgroundColor: "#FAF8F5",
  borderLeft: "3px solid #C17A4A",
  paddingLeft: "16px",
  margin: "0 0 32px",
}

const button: React.CSSProperties = {
  backgroundColor: "#1C1A17",
  color: "#FAF8F5",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  textDecoration: "none",
  display: "inline-block",
}
