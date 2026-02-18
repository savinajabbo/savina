export type Writing = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  /** If set, this post lives on Substack (or another site). Link goes here. */
  externalUrl?: string;
  /** Optional featured image. Path from public folder, e.g. "/writings/my-post.jpg" */
  image?: string;
};

/** Path to the .txt file for an on-site post (relative to project root). */
export function getContentPath(slug: string): string {
  return `content/writings/${slug}.txt`;
}

export const writings: Writing[] = [
  // On-site post — lives on your site at /writings/fear-that-you-can-belief-that-you%27re-not-enough
  {
    slug: "belief-that-you-can-fear-that-you're-not-enough",
    title: "belief that you can, fear that you're not enough",
    excerpt:
      "a stressful tension",
    date: "2026-02-16",
    image: "/writings/success.PNG",
  },
  // On-site post — lives on your site at /writings/my-first-post
  {
    slug: "take-that-side-quest",
    title: "take that side quest",
    excerpt: "because I almost didn't even go",
    date: "2026-01-18",
    image: "/writings/side-quest.jpg", // optional: add image to public/writings/
  },
  // Substack (or any external) post — link opens in new tab
  // {
  //   slug: "on-substack",
  //   title: "Why I write in public",
  //   excerpt: "Thoughts on sharing ideas and building in public.",
  //   date: "2025-02-01",
  //   externalUrl: "https://yoursubstack.substack.com/p/your-post",
  // },
];

/** Get all writings, newest first */
export function getWritings(): Writing[] {
  return [...writings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getWritingBySlug(slug: string): Writing | undefined {
  return writings.find((w) => w.slug === slug);
}
