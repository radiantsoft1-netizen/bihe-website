import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";

type FluxButtonProps = {
  href: string;
  label: string;
  className?: string;
  variant?: "primary" | "ghost";
};

export function FluxButton({
  href,
  label,
  className = "",
  variant = "primary",
}: FluxButtonProps) {
  const variantClass =
    variant === "ghost" ? "btn btn--ghost" : "btn btn--primary btn--shine";

  return (
    <Link
      href={href}
      className={`${variantClass}${className ? ` ${className}` : ""}`}
    >
      {label}
      <ArrowRightIcon />
    </Link>
  );
}
