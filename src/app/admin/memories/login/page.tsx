import Link from "next/link";
import { Nav } from "@/components/nav";
import { loginAction } from "../actions";

type Props = {
  searchParams: Promise<{ error?: string; setup?: string }>;
};

export default async function MemoriesAdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const showError = sp.error === "1";
  const showSetup = sp.setup === "1";

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-md space-y-6">
          <Link
            href="/memories"
            className="inline-flex text-sm text-muted transition-colors hover:text-foreground"
          >
            ← memories
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Memories admin</h1>
          {showSetup ? (
            <p className="text-sm leading-relaxed text-muted">
              Set <code className="rounded bg-muted/40 px-1 font-mono text-xs">MEMORIES_ADMIN_SECRET</code>{" "}
              in your environment (16+ random characters), then redeploy or restart{" "}
              <code className="rounded bg-muted/40 px-1 font-mono text-xs">next dev</code>.
            </p>
          ) : (
            <p className="text-sm text-muted">Sign in to upload or remove gallery images.</p>
          )}
          {showError ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              That passphrase did not match.
            </p>
          ) : null}
          <form action={loginAction} className="space-y-4 rounded-xl border border-border bg-card p-6">
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Admin passphrase</span>
              <input
                name="secret"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/30 focus:ring-2"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-foreground py-2 text-sm font-medium text-background"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
