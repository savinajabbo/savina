"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
      >
        
      </Link>

      <div className="flex items-center gap-4">
          <a
            href="https://github.com/savinajabbo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/savina-jabbo-169143259/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://instagram.com/savina.xo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://youtube.com/@savinacodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="YouTube"
          >
            <Youtube size={16} />
          </a>
      </div>
    </nav>
  );
}
