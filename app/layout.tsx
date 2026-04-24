import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vow & Venue",
    default: "Vow & Venue — European Destination Wedding Venues",
  },
  description:
    "Discover extraordinary destination wedding venues across Italy, France, Spain, Portugal, and the United Kingdom. Editorial, curated, and inquiry-ready.",
  openGraph: {
    siteName: "Vow & Venue",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let shortlistCount = 0;
  if (user) {
    const { count } = await supabase
      .from("shortlists")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    shortlistCount = count ?? 0;
  }

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header shortlistCount={shortlistCount} user={user} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
