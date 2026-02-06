import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Mail } from "lucide-react";

export const metadata = {
  title: "About — Savina Jabbo",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32 md:px-12">
        <div className="animate-fade-in space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            about
          </h1>
        </div>

        <div className="mt-12 animate-fade-in-delay-1 space-y-6">
          <Section title="Background">
            <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
              <p>
                Hi! I&apos;m Savina. Welcome to my personal site. This is
                where I share what I&apos;m working on, what I&apos;ve done,
                and a bit about who I am.
              </p>
              <p>
                I&apos;m passionate about building software, solving
                interesting problems, and always learning something new.
              </p>
            </div>
          </Section>
        </div>

        <div className="mt-12 animate-fade-in-delay-2">
          <Section title="Interests">
            <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>
                Outside of coding, I enjoy exploring new places, reading, and
                picking up creative hobbies.
              </p>
            </div>
          </Section>
        </div>

        <div className="mt-12 animate-fade-in-delay-3">
          <Section title="Get in touch">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mail size={14} />
              <a
                href="mailto:hello@example.com"
                className="link-underline text-foreground transition-colors hover:text-accent"
              >
                hello@example.com
              </a>
            </div>
            <p className="mt-2 text-sm text-muted">
              I&apos;m always open to chatting &mdash; don&apos;t hesitate to
              reach out!
            </p>
          </Section>
        </div>

        <footer className="mt-24 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted/60">
            &copy; {new Date().getFullYear()} savina jabbo
          </p>
        </footer>
      </main>
    </>
  );
}
