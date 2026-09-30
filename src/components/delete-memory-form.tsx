"use client";

import { deleteMemoryAction } from "@/app/admin/memories/actions";

type Props = {
  pathname: string;
};

export function DeleteMemoryForm({ pathname }: Props) {
  return (
    <form
      action={deleteMemoryAction}
      onSubmit={(event) => {
        if (!confirm("Delete this memory from the gallery?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="pathname" value={pathname} />
      <button
        type="submit"
        className="text-xs font-medium text-red-600 underline-offset-2 hover:underline dark:text-red-400"
      >
        Delete
      </button>
    </form>
  );
}
