import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { Nav } from "@/components/nav";
import { HeroVideoCarousel } from "@/components/hero-video-carousel";

const heroClips = [
  { src: "/videos/c.mp4", alt: "Hero clip 1" },
  { src: "/videos/c2.mp4", alt: "Hero clip 2" },
  { src: "/videos/c8.mp4", alt: "Hero clip 3" },
  { src: "/videos/c3.mp4", alt: "Hero clip 2" },
  { src: "/videos/clip10.mp4", alt: "Hero clip 4" },
  { src: "/videos/c5.mp4", alt: "Hero clip 5" },
  { src: "/videos/c7.mp4", alt: "Hero clip 6" },
  // src: "/videos/clip1.mp4", alt: "Hero clip 2" },
  { src: "/videos/c6.mp4", alt: "Hero clip 6" },
  { src: "/videos/c9.mp4", alt: "Hero clip 5" },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main className="px-6 pb-24 sm:px-10 md:px-12 lg:px-24">
        {/* Hero — video clips, rounded corners on bottom only — fixed height, wider max-width */}
        <div className="relative mx-auto h-[49.5rem] max-h-[75vh] w-full max-w-7xl overflow-hidden rounded-b-4xl">
          <HeroVideoCarousel clips={heroClips} intervalSeconds={6} />

          {/* Name overlay — on top of video */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute bottom-[25%] right-32 text-right sm:right-40 md:right-56 lg:right-64">
              <h1 className="text-[18vw] font-bold uppercase leading-[0.85] tracking-tighter text-background sm:text-[15vw] md:text-[12vw] lg:text-[10rem]">
                SAVINA
              </h1>
            </div>
            <div className="absolute bottom-[6%] left-24 sm:left-32 md:left-44">
              <h2 className="text-[18vw] font-bold uppercase leading-[0.85] tracking-tighter text-background sm:text-[15vw] md:text-[12vw] lg:text-[10rem]">
                JABBO
              </h2>
            </div>
          </div>

        </div>

        <div className="mx-auto mt-6 w-full max-w-7xl space-y-6">
          <p className="text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
          Making the most of my high school senior year. Organized hackathons with SpaceX, Snapchat, and Hack Club.
          San Diego is home. Stanford '30. Chaldean. Frequently side questing. I like long conversations and ambitious projects.
          </p>
          <p className="text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
            Reach me at <a href="mailto:savinaa@stanford.edu" className="text-foreground hover:text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">savinaa@stanford.edu</a>.
          </p>

          <section className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wider text-muted">
              Directory
            </p>
            <ul className="list-none space-y-1 text-base text-foreground sm:text-lg md:text-xl">
              <li>
                <Link
                  href="/projects"
                  className="link-underline inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <FolderOpen size={18} className="shrink-0 text-muted" aria-hidden />
                  projects
                </Link>
              </li>
              <li>
                <Link
                  href="/memories"
                  className="link-underline inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <FolderOpen size={18} className="shrink-0 text-muted" aria-hidden />
                  memories
                </Link>
              </li>
              <li>
                <Link
                  href="/writings"
                  className="link-underline inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <FolderOpen size={18} className="shrink-0 text-muted" aria-hidden />
                  writings
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
