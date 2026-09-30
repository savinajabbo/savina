import Link from "next/link";
import { Nav } from "@/components/nav";
import { MemoryUploadForm } from "@/components/memory-upload-form";
import { DeleteMemoryForm } from "@/components/delete-memory-form";
import { logoutAction } from "./actions";
import { getMemoriesGallery } from "@/lib/memories/get-gallery";
import { isBlobConfigured } from "@/lib/memories/blob-manifest";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function MemoriesAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const blobOn = isBlobConfigured();
  const items = await getMemoriesGallery();

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link
                href="/memories"
                className="mb-3 inline-flex text-sm text-muted transition-colors hover:text-foreground"
              >
                ← public gallery
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Memories admin</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {blobOn
                  ? "Images are stored on Vercel Blob and listed in a small JSON manifest. Uploads show on /memories after save."
                  : "Blob is not configured in this environment. The public page falls back to content/memories.json."}
              </p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>

          {sp.error === "blob" ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              Blob storage is not configured.
            </p>
          ) : null}
          {sp.error === "invalid" ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              Invalid item.
            </p>
          ) : null}

          {blobOn ? <MemoryUploadForm /> : null}

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Current items</h2>
            {items.length === 0 ? (
              <p className="text-sm text-muted">No items yet.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li
                    key={`${item.src}-${index}`}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-md bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element -- blob and remote URLs */}
                      <img src={item.src} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="font-medium text-foreground">{item.alt}</p>
                      <p className="truncate text-muted">{item.description}</p>
                      {item.date ? <p className="text-xs text-muted">{item.date}</p> : null}
                      {item.pathname ? (
                        <div className="mt-2">
                          <DeleteMemoryForm pathname={item.pathname} />
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
