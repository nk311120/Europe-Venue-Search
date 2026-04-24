import { Text } from "@react-email/components"
import { EmailLayout } from "./_layout"

interface ReviewPendingConfirmationProps {
  venueName: string
  reviewerName: string
}

export default function ReviewPendingConfirmation({
  venueName,
  reviewerName,
}: ReviewPendingConfirmationProps) {
  const firstName = reviewerName.split(" ")[0]

  return (
    <EmailLayout preview={`Thanks for your review of ${venueName}`}>
      <Text style={heading}>Thanks for your review</Text>
      <Text style={intro}>
        Hi {firstName}, thank you for sharing your experience at <strong>{venueName}</strong>.
        Your review has been received and will be published after a brief moderation check —
        usually within 48 hours.
      </Text>
      <Text style={body}>
        Reviews like yours help other couples make confident decisions. We appreciate you
        taking the time to share your story.
      </Text>
      <Text style={body}>
        — The Vow &amp; Venue team
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
  lineHeight: "1.7",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "0 0 20px",
}

const body: React.CSSProperties = {
  fontSize: "15px",
  color: "#555",
  lineHeight: "1.7",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "0 0 16px",
}
