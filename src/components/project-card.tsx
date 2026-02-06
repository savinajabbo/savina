import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url?: string;
  tags?: string[];
}

export function ProjectCard({
  title,
  description,
  url,
  tags,
}: ProjectCardProps) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block rounded-lg border border-border bg-card/50 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-card"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {url && (
          <ArrowUpRight
            size={14}
            className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
