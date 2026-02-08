import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { ArrowLeft } from "lucide-react";
import { getWritingBySlug, getWritings } from "@/data/writings";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return getWritings()
    .filter((w) => !w.externalUrl)
    .map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) return { title: "Post — Savina Jabbo" };
  return { title: `${post.title} — Savina Jabbo` };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) notFound();
  if (post.externalUrl) {
    // Shouldn't land here if we only link on-site posts to this route
    notFound();
  }

  const paragraphs = (post.content ?? "")
    .split(/\n\n+/)
    .filter((p) => p.trim());

  return (
    <>
      <Nav />

      <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-24">
        <article className="mx-auto w-full max-w-2xl">
          <Link
            href="/writings"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            writings
          </Link>

          <header className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {post.title}
            </h1>
            <time
              dateTime={post.date}
              className="mt-2 block text-sm text-muted"
            >
              {formatDate(post.date)}
            </time>
          </header>

          <div className="prose prose-neutral max-w-none text-foreground">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className="mb-4 leading-relaxed last:mb-0">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-muted">No content yet.</p>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
