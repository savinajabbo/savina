export type Writing = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  /** If set, this post lives on Substack (or another site). Link goes here. */
  externalUrl?: string;
  /** For on-site posts: body content. Use \n for paragraphs. */
  content?: string;
};

export const writings: Writing[] = [
  // On-site post — lives on your site at /writings/my-first-post
  {
    slug: "feelings-create-memories",
    title: "feelings create memories",
    excerpt: "A short teaser that shows in the list, like Substack.",
    date: "2025-02-07",
    content:
      "First paragraph here. This is an example of a post that lives on your site.\n\nSecond paragraph. You can add as many paragraphs as you want, separated by blank lines.",
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
