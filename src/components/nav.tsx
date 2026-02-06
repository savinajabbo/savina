"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
      >
        savina jabbo
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          projects
        </Link>
        <Link
          href="/about"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          about
        </Link>

        <div className="ml-2 flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
