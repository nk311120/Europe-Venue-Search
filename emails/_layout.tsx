import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { ReactNode } from "react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export function EmailLayout({
  preview,
  children,
}: {
  preview: string
  children: ReactNode
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>Lieu</Text>
            <Text style={tagline}>European Destination Wedding Venues</Text>
          </Section>
          <Section style={content}>{children}</Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Lieu · Helping couples discover extraordinary venues across Europe
            </Text>
            <Text style={footerText}>
              <a href={siteUrl} style={link}>{siteUrl.replace("https://", "").replace("http://", "")}</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: "#FAF8F5",
  fontFamily: "'Georgia', 'Times New Roman', serif",
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "32px auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #E8E3DA",
}

const header: React.CSSProperties = {
  backgroundColor: "#1C1A17",
  padding: "32px 40px",
  textAlign: "center",
}

const logo: React.CSSProperties = {
  color: "#FAF8F5",
  fontSize: "24px",
  fontWeight: "600",
  letterSpacing: "0.05em",
  margin: "0 0 4px",
}

const tagline: React.CSSProperties = {
  color: "#C17A4A",
  fontSize: "12px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  margin: 0,
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
}

const content: React.CSSProperties = {
  padding: "40px",
}

const divider: React.CSSProperties = {
  borderColor: "#E8E3DA",
  margin: "0 40px",
}

const footer: React.CSSProperties = {
  padding: "24px 40px",
  textAlign: "center",
}

const footerText: React.CSSProperties = {
  color: "#8A8070",
  fontSize: "12px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "4px 0",
}

const link: React.CSSProperties = {
  color: "#C17A4A",
  textDecoration: "none",
}
