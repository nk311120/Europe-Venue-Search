"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { VenuePlaceholder } from "@/components/venue-placeholder"
import { cn } from "@/lib/utils"

interface VenueGalleryProps {
  heroUrl: string
  galleryUrls: string[]
  venueName: string
}

export function VenueGallery({ heroUrl, galleryUrls, venueName }: VenueGalleryProps) {
  const allImages = [heroUrl, ...galleryUrls].slice(0, 5)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const prev = useCallback(() =>
    setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length),
    [allImages.length]
  )
  const next = useCallback(() =>
    setActiveIndex((i) => (i + 1) % allImages.length),
    [allImages.length]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxOpen, prev, next])

  function openLightbox(index: number) {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Hero */}
        <button
          className="col-span-2 row-span-2 relative overflow-hidden group"
          onClick={() => openLightbox(0)}
          aria-label={`View ${venueName} main photo`}
        >
          {imgErrors[0] ? (
            <VenuePlaceholder className="absolute inset-0" label={venueName} />
          ) : (
            <Image
              src={allImages[0]}
              alt={`${venueName} — main photo`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgErrors((e) => ({ ...e, 0: true }))}
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 group-hover:opacity-80 h-8 w-8 transition-opacity" />
          </div>
        </button>

        {/* Thumbnails */}
        {allImages.slice(1, 5).map((url, i) => (
          <button
            key={i}
            className="relative overflow-hidden group"
            onClick={() => openLightbox(i + 1)}
            aria-label={`View ${venueName} photo ${i + 2}`}
          >
            {imgErrors[i + 1] ? (
              <VenuePlaceholder className="absolute inset-0" />
            ) : (
              <Image
                src={url}
                alt={`${venueName} — photo ${i + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgErrors((e) => ({ ...e, [i + 1]: true }))}
              />
            )}
            {i === 3 && galleryUrls.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  +{galleryUrls.length - 3} more
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-label="Photo gallery"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors"
            onClick={prev}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-5xl max-h-[85vh] mx-16">
            {imgErrors[activeIndex] ? (
              <VenuePlaceholder className="w-full h-96 rounded-xl" label={venueName} />
            ) : (
              <Image
                src={allImages[activeIndex]}
                alt={`${venueName} — photo ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                onError={() => setImgErrors((e) => ({ ...e, [activeIndex]: true }))}
              />
            )}
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors"
            onClick={next}
            aria-label="Next photo"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === activeIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                )}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          <p className="absolute bottom-6 right-6 text-white/50 text-sm">
            {activeIndex + 1} / {allImages.length}
          </p>
        </div>
      )}
    </>
  )
}
