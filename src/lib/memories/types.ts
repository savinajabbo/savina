export type MemoryEntry = {
  src: string;
  alt: string;
  description: string;
  date?: string;
  /** Present when stored in Vercel Blob (used for delete). */
  pathname?: string;
};

export type MemoryManifest = {
  version: 1;
  items: MemoryManifestItem[];
};

export type MemoryManifestItem = {
  url: string;
  pathname: string;
  alt: string;
  description: string;
  date?: string;
  createdAt: string;
};
