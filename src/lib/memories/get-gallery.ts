import memoriesData from "../../../content/memories.json";
import { isBlobConfigured, readManifest } from "./blob-manifest";
import type { MemoryEntry, MemoryManifestItem } from "./types";

function manifestItemToEntry(item: MemoryManifestItem): MemoryEntry {
  return {
    src: item.url,
    alt: item.alt,
    description: item.description,
    date: item.date,
    pathname: item.pathname,
  };
}

/**
 * Blob-backed memories when `BLOB_READ_WRITE_TOKEN` is set; otherwise
 * `content/memories.json` for local development without Blob.
 */
export async function getMemoriesGallery(): Promise<MemoryEntry[]> {
  if (!isBlobConfigured()) {
    return memoriesData.images as MemoryEntry[];
  }

  try {
    const manifest = await readManifest();
    if (manifest.items.length === 0) {
      return [];
    }
    return manifest.items.map(manifestItemToEntry);
  } catch {
    return memoriesData.images as MemoryEntry[];
  }
}
