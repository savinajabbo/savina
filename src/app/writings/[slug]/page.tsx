import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { Nav } from "@/components/nav";
import { ArrowLeft } from "lucide-react";
import { getContentPath, getWritingBySlug, getWritings } from "@/data/writings";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
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
  if (post.externalUrl) notFound();

  let rawContent = "";
  try {
    const filePath = path.join(process.cwd(), getContentPath(slug));
    rawContent = await readFile(filePath, "utf-8");
  } catch {
    // File missing or unreadable
  }
  const content = rawContent.trim();

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

          {post.image && (
            <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/5">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
          )}

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
            {content ? (
              <div className="whitespace-pre-line">
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  components={{
                    em: ({ children }) => <em className="italic">{children}</em>,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted">No content yet.</p>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
