type SectionHeaderProps = {
  badge: string;
  title: string;
  align?: "center" | "left";
  showIcon?: boolean;
  titleId?: string;
};

export function SectionHeader({
  badge,
  title,
  align = "center",
  showIcon = false,
  titleId,
}: SectionHeaderProps) {
  return (
    <div
      className={`section-header${align === "left" ? " section-header--left" : ""}`}
    >
      <span className="section-badge">
        {!showIcon ? <span className="section-badge__dot" aria-hidden /> : null}
        {badge}
      </span>
      <h2
        id={titleId}
        className={`section-title${align === "center" ? " section-title--center" : ""}`}
      >
        {title}
      </h2>
    </div>
  );
}
