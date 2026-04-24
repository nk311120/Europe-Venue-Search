import { Resend } from "resend"
import type { ReactElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  react,
  replyTo,
}: {
  to: string | string[]
  subject: string
  react: ReactElement
  replyTo?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const from = process.env.RESEND_FROM_EMAIL ?? "inquiries@example.com"
    const { error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
      ...(replyTo ? { replyTo } : {}),
    })

    if (error) {
      console.error("[email] Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[email] Send failed:", message)
    return { success: false, error: message }
  }
}
