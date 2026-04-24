import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { replySchema } from "@/lib/schemas"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Protect with shared admin token
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!process.env.ADMIN_API_TOKEN || token !== process.env.ADMIN_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = replySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 })
  }

  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from("inquiries")
    .update({
      venue_reply: parsed.data.venueReply,
      status: "replied",
      replied_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Inquiry not found or update failed" }, { status: 404 })
  }

  return NextResponse.json({ success: true, inquiryId: id })
}
