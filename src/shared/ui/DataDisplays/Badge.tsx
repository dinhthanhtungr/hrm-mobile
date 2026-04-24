type BadgeTone = "primary" | "success" | "muted" | "warning" | "danger";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: BadgeTone;
};

export function Badge({
  children,
  className = "",
  tone = "muted",
}: BadgeProps) {
  const toneClass =
    tone === "primary"
      ? "ui-pill-primary"
      : tone === "success"
        ? "ui-pill-success"
        : tone === "warning"
          ? "ui-pill-warning"
          : tone === "danger"
            ? "ui-pill-danger"
            : "ui-pill-muted";

  return <span className={`ui-pill ${toneClass} ${className}`}>{children}</span>;
}
