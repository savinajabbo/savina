import { del, list, put } from "@vercel/blob";
import type { MemoryManifest, MemoryManifestItem } from "./types";

const MANIFEST_PATH = "memories/_manifest.json";

function getToken() {
  return process.env.BLOB_READ_WRITE_TOKEN ?? "";
}

export function isBlobConfigured() {
  return Boolean(getToken());
}

export async function readManifest(): Promise<MemoryManifest> {
  const token = getToken();
  if (!token) {
    return { version: 1, items: [] };
  }

  try {
    const { blobs } = await list({ prefix: "memories/", token });
    const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifestBlob) {
      return { version: 1, items: [] };
    }

    const res = await fetch(manifestBlob.url, { next: { revalidate: 0 } });
    if (!res.ok) {
      return { version: 1, items: [] };
    }

    const data: unknown = await res.json();
    if (
      !data ||
      typeof data !== "object" ||
      (data as MemoryManifest).version !== 1 ||
      !Array.isArray((data as MemoryManifest).items)
    ) {
      return { version: 1, items: [] };
    }

    return data as MemoryManifest;
  } catch {
    return { version: 1, items: [] };
  }
}

export async function writeManifest(items: MemoryManifestItem[]) {
  const token = getToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  const body: MemoryManifest = {
    version: 1,
    items: items.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };

  await put(MANIFEST_PATH, JSON.stringify(body), {
    access: "public",
    token,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export async function appendManifestItem(item: MemoryManifestItem) {
  const manifest = await readManifest();
  const nextItems = [item, ...manifest.items];
  await writeManifest(nextItems);
}

export async function removeManifestItem(pathname: string) {
  const manifest = await readManifest();
  const nextItems = manifest.items.filter((i) => i.pathname !== pathname);
  await writeManifest(nextItems);
}

export async function deleteBlobPathname(pathname: string) {
  const token = getToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }
  if (pathname === MANIFEST_PATH || !pathname.startsWith("memories/")) {
    throw new Error("Invalid pathname.");
  }
  await del(pathname, { token });
}
