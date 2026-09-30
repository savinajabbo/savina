"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { appendManifestItem, deleteBlobPathname, isBlobConfigured, removeManifestItem } from "@/lib/memories/blob-manifest";
import { safeCompareSecret } from "@/lib/memories/auth-secret";
import { createMemoriesSessionToken, MEMORIES_SESSION_COOKIE, verifyMemoriesSessionToken } from "@/lib/memories/session";
import type { MemoryManifestItem } from "@/lib/memories/types";

const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

async function requireMemoriesSession() {
  const jar = await cookies();
  const token = jar.get(MEMORIES_SESSION_COOKIE)?.value;
  if (!token) {
    redirect("/admin/memories/login");
  }
  const ok = await verifyMemoriesSessionToken(token);
  if (!ok) {
    redirect("/admin/memories/login");
  }
}

export async function loginAction(formData: FormData) {
  const secret = formData.get("secret");
  const admin = process.env.MEMORIES_ADMIN_SECRET;
  if (
    typeof secret !== "string" ||
    typeof admin !== "string" ||
    admin.length < 16 ||
    !safeCompareSecret(secret, admin)
  ) {
    redirect("/admin/memories/login?error=1");
  }

  const token = await createMemoriesSessionToken();
  const jar = await cookies();
  jar.set(MEMORIES_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin/memories");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.set(MEMORIES_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
  redirect("/admin/memories/login");
}

export type UploadMemoryState = { error?: string; ok?: boolean };

export async function uploadMemoryAction(
  _prev: UploadMemoryState,
  formData: FormData
): Promise<UploadMemoryState> {
  await requireMemoriesSession();

  if (!isBlobConfigured()) {
    return { error: "BLOB_READ_WRITE_TOKEN is not set. Add it in Vercel project env." };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return { error: "Blob token missing." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image is too large (max 12 MB)." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Use JPEG, PNG, WebP, or GIF." };
  }

  const alt = String(formData.get("alt") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dateRaw = String(formData.get("date") ?? "").trim();

  if (!alt || !description) {
    return { error: "Alt text and description are required." };
  }

  const ext = EXT[file.type];
  const id = crypto.randomUUID();
  const pathname = `memories/${id}.${ext}`;

  const uploaded = await put(pathname, file, {
    access: "public",
    token,
    addRandomSuffix: false,
    contentType: file.type,
  });

  const item: MemoryManifestItem = {
    url: uploaded.url,
    pathname: uploaded.pathname,
    alt,
    description,
    date: dateRaw || undefined,
    createdAt: new Date().toISOString(),
  };

  await appendManifestItem(item);
  revalidatePath("/memories");
  revalidatePath("/admin/memories");
  return { ok: true };
}

export async function deleteMemoryAction(formData: FormData) {
  await requireMemoriesSession();

  if (!isBlobConfigured()) {
    redirect("/admin/memories?error=blob");
  }

  const pathname = formData.get("pathname");
  if (typeof pathname !== "string" || !pathname.startsWith("memories/")) {
    redirect("/admin/memories?error=invalid");
  }

  await removeManifestItem(pathname);
  await deleteBlobPathname(pathname);
  revalidatePath("/memories");
  revalidatePath("/admin/memories");
  redirect("/admin/memories");
}
