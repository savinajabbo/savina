import { Nav } from "@/components/nav";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Projects — Savina Jabbo",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />

      <main className="min-h-screen px-6 pb-24 pt-32 sm:px-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
        <div className="animate-fade-in space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            projects
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            Things I&apos;ve built, contributed to, or am currently working on.
          </p>
        </div>

        <div className="mt-12 animate-fade-in-delay-1">
          <div className="grid gap-3 sm:grid-cols-2">
            <ProjectCard
              title="Project One"
              description="A brief description of what this project does and why it matters."
              url="https://github.com"
              tags={["Next.js", "TypeScript"]}
            />
            <ProjectCard
              title="Project Two"
              description="Another cool project with a short and clear description."
              url="https://github.com"
              tags={["React", "Tailwind"]}
            />
            <ProjectCard
              title="Project Three"
              description="Something interesting you've built or contributed to."
              tags={["Python", "ML"]}
            />
            <ProjectCard
              title="Project Four"
              description="Yet another project to showcase your skills and interests."
              url="https://github.com"
              tags={["Go", "API"]}
            />
          </div>
        </div>

        <footer className="mt-24 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted/60">
            &copy; {new Date().getFullYear()} savina jabbo
          </p>
        </footer>
        </div>
      </main>
    </>
  );
}
