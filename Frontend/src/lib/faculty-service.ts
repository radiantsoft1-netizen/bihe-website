import "server-only";

import { fetchApiList } from "@/lib/api/client";
import facultyMembersFallback from "@/lib/faculty-members-fallback.json";
import { toPublicStoragePath, images } from "@/lib/images";
import { FACULTY_DEPARTMENT_TITLES } from "@/lib/faculty-pages";
import type { FacultyDepartmentId, FacultyMember, FacultySection } from "@/lib/types/faculty";

type ApiFacultyMember = {
  id: string;
  name: string;
  photo?: string | null;
  designation: string;
  qualification?: string | null;
  experience?: string | null;
  seminarWorkshop?: string | null;
  subjectTeaching?: string | null;
  resume?: string | null;
  resumeName?: string | null;
  department: FacultyDepartmentId;
  departments?: FacultyDepartmentId[];
  sortOrder?: number;
};

type ApiFacultySection = {
  id: FacultyDepartmentId;
  title: string;
  members: ApiFacultyMember[];
};

type FacultyMemberJson = {
  name: string;
  designation: string;
  qualification?: string | null;
  experience?: string | null;
  seminar_workshop?: string | null;
  subject_teaching?: string | null;
  photo_path?: string | null;
  resume_path?: string | null;
  resume_name?: string | null;
  sort_order?: number;
  published?: boolean;
  departments: FacultyDepartmentId[];
};

let cachedFallbackMembers: FacultyMember[] | null = null;

function hasFacultyMembers(sections: FacultySection[]): boolean {
  return sections.some((section) => section.members.length > 0);
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(value: string | null | undefined): string | null {
  if (!value?.trim()) {
    return null;
  }

  if (!value.includes("<")) {
    return value.trim();
  }

  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function fallbackPhoto(department: FacultyDepartmentId): string {
  if (department === "b-com") return images.bcomProgrammeStudent1;
  if (department === "bca") return images.aboutMain;
  return images.admissionProcessStaff;
}

function resolveStorageUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath?.trim()) {
    return null;
  }

  const path = relativePath.startsWith("/storage/")
    ? relativePath
    : `/storage/${relativePath.replace(/^\/+/, "")}`;

  return toPublicStoragePath(path) ?? path;
}

/** Static copy of admin uploads — see scripts/sync-faculty-images.sh */
function localFacultyPhotoPath(photo: string | null | undefined): string | null {
  if (!photo?.trim()) {
    return null;
  }

  const match = photo.match(/faculty\/photos\/([^?#]+)/i);
  if (!match?.[1]) {
    return null;
  }

  const filename = decodeURIComponent(match[1]);
  return `/images/faculty/${encodeURIComponent(filename)}`;
}

function loadFallbackMembersFromFile(): FacultyMember[] {
  if (cachedFallbackMembers) {
    return cachedFallbackMembers;
  }

  const raw = facultyMembersFallback as FacultyMemberJson[];

  cachedFallbackMembers = raw
    .filter((member) => member.published !== false)
    .map((member, index) => {
      const departments = (member.departments?.length ? member.departments : ["b-com"]) as FacultyDepartmentId[];
      const primaryDepartment = departments[0];

      return {
        id: `fallback-${slugifyName(member.name)}`,
        name: member.name,
        photo:
          localFacultyPhotoPath(member.photo_path) ??
          resolveStorageUrl(member.photo_path) ??
          fallbackPhoto(primaryDepartment),
        designation: member.designation,
        qualification: member.qualification ?? null,
        experience: member.experience ?? null,
        seminarWorkshop: stripHtml(member.seminar_workshop),
        subjectTeaching: stripHtml(member.subject_teaching),
        resume: resolveStorageUrl(member.resume_path),
        resumeName: member.resume_name ?? null,
        department: primaryDepartment,
        departments,
        sortOrder: member.sort_order ?? index,
      };
    });

  return cachedFallbackMembers;
}

function memberBelongsToDepartment(
  member: FacultyMember,
  department: FacultyDepartmentId,
): boolean {
  return member.departments?.includes(department) ?? member.department === department;
}

function normalizeMemberPhoto(
  photo: string | null | undefined,
  department: FacultyDepartmentId,
  fallback?: FacultyMember,
): string {
  if (photo?.trim()) {
    // Live admin storage first — avoids stale copies in public/images/faculty/
    const proxied = toPublicStoragePath(photo);
    if (proxied) {
      return proxied;
    }

    const relative = resolveStorageUrl(photo);
    if (relative) {
      return relative;
    }

    const local = localFacultyPhotoPath(photo);
    if (local) {
      return local;
    }

    if (photo.startsWith("/i/") || photo.startsWith("/images/")) {
      return photo;
    }
  }

  return fallback?.photo ?? fallbackPhoto(department);
}

function mapMember(item: ApiFacultyMember, index = 0): FacultyMember {
  const departments = item.departments?.length ? item.departments : [item.department];
  const fallbackMembers = loadFallbackMembersFromFile();
  const fallback = fallbackMembers.find((member) => member.name === item.name);

  return {
    id: item.id,
    name: item.name,
    photo: normalizeMemberPhoto(item.photo, item.department, fallback),
    designation: item.designation,
    qualification: item.qualification ?? null,
    experience: item.experience ?? null,
    seminarWorkshop: stripHtml(item.seminarWorkshop),
    subjectTeaching: stripHtml(item.subjectTeaching),
    resume: item.resume ?? null,
    resumeName: item.resumeName ?? null,
    department: item.department,
    departments,
    sortOrder: item.sortOrder ?? index,
  };
}

function buildFallbackSections(): FacultySection[] {
  const members = loadFallbackMembersFromFile();

  return (Object.keys(FACULTY_DEPARTMENT_TITLES) as FacultyDepartmentId[]).map((id) => ({
    id,
    title: FACULTY_DEPARTMENT_TITLES[id],
    members: members
      .filter((member) => memberBelongsToDepartment(member, id))
      .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)),
  }));
}

export async function getFacultyByDepartment(department: FacultyDepartmentId): Promise<FacultyMember[]> {
  const data = await fetchApiList<ApiFacultyMember>("/api/v1/faculty", { department });

  if (!data || data.length === 0) {
    return loadFallbackMembersFromFile()
      .filter((member) => memberBelongsToDepartment(member, department))
      .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
  }

  return data.map(mapMember);
}

export async function getFacultySections(): Promise<FacultySection[]> {
  const fallback = buildFallbackSections();
  const data = await fetchApiList<ApiFacultySection>("/api/v1/faculty/sections");

  if (!data || data.length === 0) {
    return fallback;
  }

  const sections = data.map((section) => ({
    id: section.id,
    title: section.title,
    members: section.members.map(mapMember),
  }));

  return hasFacultyMembers(sections) ? sections : fallback;
}

export const FACULTY_AND_STAFF_PAGE_LEAD =
  "Academic faculty and departmental staff supporting BCA and B.Com programmes at Bapuji Institute of Hi-Tech Education.";
