import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url?: string;
  tags?: string[];
  index?: number;
}

export function ProjectCard({
  title,
  description,
  url,
  tags,
  index = 0,
}: ProjectCardProps) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Create a fan effect with alternating rotations
  const rotation = index % 2 === 0 ? -2 : 2;
  const offsetX = index * 8 - 12;
  const zIndex = 10 - index;

  return (
    <Wrapper
      {...wrapperProps}
      style={{
        transform: `rotate(${rotation}deg) translateX(${offsetX}px)`,
        zIndex: zIndex,
      }}
      className="group relative block w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-lg transition-all duration-300 hover:z-50 hover:rotate-0 hover:translate-x-0 hover:-translate-y-2 hover:border-foreground/20 hover:shadow-xl"
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
