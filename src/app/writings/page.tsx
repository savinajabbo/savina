import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getWritings } from "@/data/writings";

export const metadata = {
  title: "Writings — Savina Jabbo",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function WritingsPage() {
  const posts = getWritings();

  return (
    <>
      <Nav />

      <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            back
          </Link>

          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
            writings
          </h1>
          <p className="mb-10 text-sm text-muted">
            Essays, updates, and things I&apos;m thinking about.
          </p>

          {posts.length === 0 ? (
            <p className="text-sm text-muted">
              Nothing here yet. Add your first piece when you&apos;re ready.
            </p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug} className="group">
                  {post.externalUrl ? (
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-2xl border border-foreground/10 bg-white/40 shadow-sm transition-all duration-200 hover:border-foreground/20 hover:bg-white/60 hover:shadow-md"
                    >
                      {post.image && (
                        <div className="relative aspect-[2/1] w-full bg-foreground/5 sm:aspect-[3/1]">
                          <Image
                            src={post.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 672px"
                          />
                        </div>
                      )}
                      <div className="p-5 sm:p-6">
                      <span className="inline-flex items-center gap-1.5 font-bold text-foreground transition-colors duration-200 group-hover:text-accent">
                        {post.title}
                        <ExternalLink size={14} className="shrink-0 opacity-70" />
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <time
                        dateTime={post.date}
                        className="mt-2 block text-xs text-muted"
                      >
                        {formatDate(post.date)}
                      </time>
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={`/writings/${post.slug}`}
                      className="block overflow-hidden rounded-2xl border border-foreground/10 bg-white/40 shadow-sm transition-all duration-200 hover:border-foreground/20 hover:bg-white/60 hover:shadow-md"
                    >
                      {post.image && (
                        <div className="relative aspect-[2/1] w-full bg-foreground/5 sm:aspect-[3/1]">
                          <Image
                            src={post.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 672px"
                          />
                        </div>
                      )}
                      <div className="p-5 sm:p-6">
                      <span className="font-bold text-foreground transition-colors duration-200 group-hover:text-accent">
                        {post.title}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <time
                        dateTime={post.date}
                        className="mt-2 block text-xs text-muted"
                      >
                        {formatDate(post.date)}
                      </time>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
