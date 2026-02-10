import Link from "next/link";
import { Nav } from "@/components/nav";
import { ProjectCard } from "@/components/project-card";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Projects — Savina Jabbo",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen px-6 pb-24 pt-32 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          back
        </Link>

        <div className="animate-fade-in space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            projects
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            coming soon...lol
          </p>
        </div>
{/* 
        <div className="mt-12 animate-fade-in-delay-1">
          <div className="relative flex flex-wrap justify-center gap-4 sm:gap-6">
            <ProjectCard
              title="rate my rizz"
              description="turn a 30-second video into an ai-powered roast of your rizz."
              url="https://github.com/savinajabbo/rate-my-rizz"
              tags={["Next.js", "TypeScript"]}
              index={0}
            />
            <ProjectCard
              title="Project Two"
              description="Another cool project with a short and clear description."
              url="https://github.com"
              tags={["React", "Tailwind"]}
              index={1}
            />
            <ProjectCard
              title="Project Three"
              description="Something interesting you've built or contributed to."
              tags={["Python", "ML"]}
              index={2}
            />
            <ProjectCard
              title="Project Four"
              description="Yet another project to showcase your skills and interests."
              url="https://github.com"
              tags={["Go", "API"]}
              index={3}
            />
          </div>
        </div> */}

        </div>
      </main>
    </>
  );
}
