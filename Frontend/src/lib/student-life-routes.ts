import { STUDENT_LIFE_SUBMENU } from "@/lib/student-life-submenu";

export const STUDENT_LIFE_PAGE_PATHS = STUDENT_LIFE_SUBMENU.map(
  (item) => item.href,
) as readonly string[];

export const STUDENT_LIFE_BASE_PATH = "/student-life/sports-facilities";

export function isStudentLifePath(pathname: string): boolean {
  return STUDENT_LIFE_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
