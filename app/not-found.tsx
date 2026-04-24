import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4">
      <div className="max-w-md">
        <p className="font-serif text-8xl font-semibold text-muted-foreground/30 mb-4">404</p>
        <h1 className="font-serif text-3xl font-semibold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist, or the venue may have moved. Head back to browse all listings.
        </p>
        <Button asChild size="lg">
          <Link href="/venues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse venues
          </Link>
        </Button>
      </div>
    </div>
  )
}
