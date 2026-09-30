"use client";

import { useActionState, useEffect, useRef } from "react";
import type { UploadMemoryState } from "@/app/admin/memories/actions";
import { uploadMemoryAction } from "@/app/admin/memories/actions";

export function MemoryUploadForm() {
  const [state, action, pending] = useActionState(uploadMemoryAction, {} as UploadMemoryState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="space-y-4 rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Add memory</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-muted">Image</span>
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="w-full text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Alt text</span>
          <input
            name="alt"
            type="text"
            required
            placeholder="Short description for screen readers"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Date (optional)</span>
          <input
            name="date"
            type="text"
            placeholder="May 1, 2026"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-muted">Caption</span>
          <textarea
            name="description"
            required
            rows={2}
            placeholder="Shown on hover"
            className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-accent/30 focus:ring-2"
          />
        </label>
      </div>
      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-green-700 dark:text-green-400" role="status">
          Uploaded. It should appear on /memories within a moment.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
