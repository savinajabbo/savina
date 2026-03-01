import Link from "next/link";
import { Nav } from "@/components/nav";
import { ProjectsPreview } from "@/components/projects-preview";
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
            things i have built and shipped
          </p>
        </div>

        <div className="mt-12 animate-fade-in-delay-1">
          <ProjectsPreview />
        </div>

        </div>
      </main>
    </>
  );
}