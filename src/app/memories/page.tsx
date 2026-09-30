import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { ArrowLeft } from "lucide-react";
import { getMemoriesGallery } from "@/lib/memories/get-gallery";
import { isBlobConfigured } from "@/lib/memories/blob-manifest";
import type { MemoryEntry } from "@/lib/memories/types";

export const metadata = {
  title: "Memories — Savina Jabbo",
};

export const dynamic = "force-dynamic";

function isRemoteSrc(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  if (isRemoteSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- blob URLs and arbitrary hosts without next.config allowlist
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 50vw"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, 50vw"
    />
  );
}

export default async function MemoriesPage() {
  const galleryImages: MemoryEntry[] = await getMemoriesGallery();
  const blobOn = isBlobConfigured();

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
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
            {blobOn
              ? "This gallery is backed by Vercel Blob. Add or remove images from the admin console (no code deploy needed for new photos)."
              : "Local preview uses entries in content/memories.json. In production, set BLOB_READ_WRITE_TOKEN on Vercel to enable the live blob gallery and admin uploads."}
          </p>

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {galleryImages.map(({ src, alt, description, date }, index) => (
                <div
                  key={`${src}-${index}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-card"
                >
                  <GalleryImage src={src} alt={alt} />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />
                  {date ? (
                    <div className="absolute right-0 top-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-medium text-white drop-shadow-lg sm:text-sm">
                        {date}
                      </p>
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white drop-shadow-lg sm:text-base">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              {blobOn
                ? "No memories uploaded yet. Use the admin console to add images."
                : "No entries in content/memories.json, or the blob manifest is empty."}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
