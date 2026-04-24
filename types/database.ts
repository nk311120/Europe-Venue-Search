export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string
          slug: string
          name: string
          country: Database["public"]["Enums"]["country_code"]
          region: string
          nearest_city: string
          nearest_airport_code: string
          nearest_airport_name: string
          airport_drive_minutes: number
          lat: number
          lng: number
          venue_types: Database["public"]["Enums"]["venue_type"][]
          capacity_min: number
          capacity_max: number
          price_band: Database["public"]["Enums"]["price_band"]
          estimated_price_eur_min: number | null
          estimated_price_eur_max: number | null
          seasons: Database["public"]["Enums"]["season"][]
          onsite_accommodation: boolean
          onsite_beds: number | null
          in_house_catering: boolean
          ceremony_and_reception: boolean
          outdoor_ceremony: boolean
          indoor_backup: boolean
          exclusive_use: boolean
          pet_friendly: boolean
          accessibility_notes: string | null
          short_description: string
          long_description: string
          highlights: string[]
          tags: string[]
          website: string | null
          contact_email: string | null
          hero_image_url: string
          gallery_image_urls: string[]
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["venues"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["venues"]["Insert"]>
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          venue_id: string
          reviewer_name: string
          reviewer_location: string | null
          event_date: string | null
          guest_count: number | null
          rating: number
          title: string
          body: string
          status: Database["public"]["Enums"]["review_status"]
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          reviewer_name: string
          reviewer_location?: string | null
          event_date?: string | null
          guest_count?: number | null
          rating: number
          title: string
          body: string
          status?: Database["public"]["Enums"]["review_status"]
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "reviews_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      inquiries: {
        Row: {
          id: string
          venue_id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          preferred_date_from: string | null
          preferred_date_to: string | null
          date_flexible: boolean
          guest_count: number
          budget_band: Database["public"]["Enums"]["price_band"] | null
          message: string
          status: Database["public"]["Enums"]["inquiry_status"]
          venue_reply: string | null
          replied_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          user_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          preferred_date_from?: string | null
          preferred_date_to?: string | null
          date_flexible?: boolean
          guest_count: number
          budget_band?: Database["public"]["Enums"]["price_band"] | null
          message: string
          status?: Database["public"]["Enums"]["inquiry_status"]
          venue_reply?: string | null
          replied_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>
        Relationships: [
          {
            foreignKeyName: "inquiries_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      shortlists: {
        Row: {
          user_id: string
          venue_id: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["shortlists"]["Row"], "created_at">
        Update: Record<string, never>
        Relationships: [
          {
            foreignKeyName: "shortlists_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Enums: {
      country_code: "IT" | "FR" | "ES" | "PT" | "UK"
      venue_type: "chateau" | "villa" | "castle" | "vineyard" | "masia" | "farmhouse" | "coastal" | "country_estate" | "historic_manor" | "palazzo"
      season: "spring" | "summer" | "autumn" | "winter"
      price_band: "$" | "$$" | "$$$" | "$$$$"
      inquiry_status: "pending" | "sent" | "replied" | "closed"
      review_status: "pending" | "approved" | "rejected"
    }
    Functions: Record<string, never>
  }
}
