"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { ProjectCard } from "@/components/project-card";

type Project = {
  title: string;
  description: string;
  url?: string;
  tags?: string[];
  previewVideo?: string;
  previewCaption?: string;
};

const projects: Project[] = [
  {
    title: "rate my rizz",
    description:
      "real-time AI that analyzes microexpressions, voice, and confidence to generate a rizz profile.",
    url: "https://github.com/savinajabbo/rate-my-rizz",
    tags: ["Next.js", "TypeScript", "Python", "OpenCV", "Whisper", "OpenAI API"],
    previewVideo: "/videos/project-preview/rizz1.mp4",
    previewCaption: "quick look at the project vibe",
  },
];

export function ProjectsPreview() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPreview = useCallback((project: Project) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsClosing(false);
    setSelectedProject(project);
  }, []);

  const closePreview = useCallback(() => {
    if (!selectedProject || isClosing) return;
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 260);
  }, [isClosing, selectedProject]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePreview, selectedProject]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    },
    []
  );

  return (
    <>
      <div className="relative flex flex-wrap justify-center gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            url={project.url}
            tags={project.tags}
            index={index}
            onClick={() => openPreview(project)}
          />
        ))}
      </div>

      {selectedProject &&
        isMounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-foreground/35 p-4 backdrop-blur-[2px] transition-opacity duration-250 sm:p-6 ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
            onClick={closePreview}
            role="presentation"
          >
            <div
              className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl transition-all duration-250 ${
                isClosing
                  ? "translate-y-3 scale-[0.98] opacity-0"
                  : "translate-y-0 scale-100 opacity-100"
              }`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} preview`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {selectedProject.previewVideo ? (
                  <video
                    key={selectedProject.previewVideo}
                    src={selectedProject.previewVideo}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-background/80">
                    Preview unavailable
                  </div>
                )}
                <button
                  type="button"
                  onClick={closePreview}
                  className="absolute right-3 top-3 rounded-md bg-black/45 p-1.5 text-background transition-colors hover:bg-black/60"
                  aria-label="Close preview"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {selectedProject.title}
                  </h2>
                </div>

                {selectedProject.previewCaption && (
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {selectedProject.previewCaption}
                  </p>
                )}

                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {selectedProject.description}
                </p>

                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {selectedProject.url && (
                  <div>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-accent/10"
                    >
                      visit project
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
