import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { ArrowLeft } from "lucide-react";

const galleryImages = [
  { src: "/imposter.png", alt: "Memory 2", description: "Playing imposter after school in the ASB room", date: "January 22, 2026" },
  { src: "/img1.jpg", alt: "Memory 1", description: "Solenn and I at Knott's Berry Farm", date: "January 18, 2026" },
  { src: "/senior.jpg", alt: "Memory 2", description: "Homecoming assembly picture", date: "October 10, 2025" },
  { src: "/sunrise1.jpg", alt: "Memory 2", description: "Senior sunrise!!", date: "September 17, 2025" },
];

export const metadata = {
  title: "Memories — Savina Jabbo",
};

export default function MemoriesPage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          back
        </Link>

        <h1 className="mb-10 text-2xl font-semibold tracking-tight text-foreground">
          memories
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {galleryImages.map(({ src, alt, description, date }) => (
            <div
              key={src}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-card"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              {/* Dark overlay + date (top-right) + description (bottom) on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />
              {date && (
                <div className="absolute right-0 top-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs font-medium text-white drop-shadow-lg sm:text-sm">
                    {date}
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-medium text-white drop-shadow-lg sm:text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>
    </>
  );
}
