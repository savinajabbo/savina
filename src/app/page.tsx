import Link from "next/link";
import { Folder, FolderOpen } from "lucide-react";
import { Nav } from "@/components/nav";
import { HeroVideoCarousel } from "@/components/hero-video-carousel";

const heroClips = [
  { src: "/videos/c.mp4", alt: "Hero clip 1" },
  { src: "/videos/c2.mp4", alt: "Hero clip 2" },
  { src: "/videos/c8.mp4", alt: "Hero clip 3" },
  { src: "/videos/c11.mp4", alt: "Hero clip 6" },
  { src: "/videos/c3.mp4", alt: "Hero clip 2" },
  { src: "/videos/clip10.mp4", alt: "Hero clip 4" },
  { src: "/videos/c5.mp4", alt: "Hero clip 5" },
  { src: "/videos/c17.mp4", alt: "Hero clip 5" },
  { src: "/videos/c15.mp4", alt: "Hero clip 6" },
  { src: "/videos/c13.mp4", alt: "Hero clip 5" },
  { src: "/videos/c6.mp4", alt: "Hero clip 6" },
  { src: "/videos/c16.mp4", alt: "Hero clip 5" },
  { src: "/videos/c9.mp4", alt: "Hero clip 5" },
  { src: "/videos/c14.mp4", alt: "Hero clip 5" },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main className="px-6 pb-24 sm:px-10 md:px-12 lg:px-24">
        <div className="relative mx-auto h-[49.5rem] max-h-[75vh] w-full max-w-7xl overflow-hidden rounded-b-4xl">
          <HeroVideoCarousel clips={heroClips} intervalSeconds={6} />

          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2">
              <h1 className="ml-[20%] text-left text-[clamp(2.5rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter text-background">
                SAVINA
              </h1>
              <h2 className="-ml-[30%] text-left text-[clamp(2.5rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter text-background">
                JABBO
              </h2>
            </div>
          </div>

        </div>

        <div className="mx-auto mt-6 w-full max-w-7xl space-y-6">
          <p className="text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
          Making the most of my high school senior year. Organized hackathons with teams at SpaceX, Snapchat, ClickUp, and Hack Club.
          San Diego is home. Stanford '30. Chaldean. Frequently side questing. I'd rather talk for two hours than text for two weeks. If it's ambitious, I'm in.
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
                  className="group inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <span className="relative inline-flex h-[18px] w-[18px] shrink-0">
                    <Folder size={18} className="absolute inset-0 text-muted opacity-100 transition-opacity group-hover:opacity-0" aria-hidden />
                    <FolderOpen size={18} className="absolute inset-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  projects
                </Link>
              </li>
              <li>
                <Link
                  href="/memories"
                  className="group inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <span className="relative inline-flex h-[18px] w-[18px] shrink-0">
                    <Folder size={18} className="absolute inset-0 text-muted opacity-100 transition-opacity group-hover:opacity-0" aria-hidden />
                    <FolderOpen size={18} className="absolute inset-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  memories
                </Link>
              </li>
              <li>
                <Link
                  href="/writings"
                  className="group inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  <span className="relative inline-flex h-[18px] w-[18px] shrink-0">
                    <Folder size={18} className="absolute inset-0 text-muted opacity-100 transition-opacity group-hover:opacity-0" aria-hidden />
                    <FolderOpen size={18} className="absolute inset-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  writings
                </Link>
              </li>
            </ul>
          </section>
{/* 
          <p className="pt-4 text-sm text-muted">
            <a
              href="https://load-core-66920386.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent/30 underline-offset-2 hover:text-foreground hover:decoration-accent"
            >
              special shout out to ruby for making this 18th birthday card. (and shout out to everyone who wrote in it <3)
            </a>
          </p> */}
        </div>
      </main>
    </>
  );
}
