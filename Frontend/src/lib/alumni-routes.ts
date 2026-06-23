const ALUMNI_RESERVED_SLUGS = new Set(["events", "register", "home", "about", "gallery"]);

export function isAlumniReservedSlug(slug: string): boolean {
  return ALUMNI_RESERVED_SLUGS.has(slug);
}

export function isAlumniPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === "/alumni" || path.startsWith("/alumni/");
}
