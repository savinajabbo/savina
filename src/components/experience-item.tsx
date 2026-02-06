interface ExperienceItemProps {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description?: string;
}

export function ExperienceItem({
  role,
  company,
  companyUrl,
  period,
  description,
}: ExperienceItemProps) {
  return (
    <div className="group flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm text-foreground">
          {role}{" "}
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-accent"
            >
              @ {company}
            </a>
          ) : (
            <span className="text-muted">@ {company}</span>
          )}
        </p>
        {description && (
          <p className="text-sm text-muted">{description}</p>
        )}
      </div>
      <span className="shrink-0 font-mono text-xs text-muted">{period}</span>
    </div>
  );
}
