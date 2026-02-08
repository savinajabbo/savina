import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { ArrowLeft } from "lucide-react";

const galleryImages = [
  { src: "/img1.jpg", alt: "Memory 1" },
  { src: "/img2.jpg", alt: "Memory 2" },
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
          {galleryImages.map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        </div>
      </main>
    </>
  );
}
