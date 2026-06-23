export type FacultyDepartmentId = "bca" | "b-com" | "non-teaching-staff";

export type FacultyMember = {
  id: string;
  name: string;
  photo: string | null;
  designation: string;
  qualification: string | null;
  experience: string | null;
  seminarWorkshop: string | null;
  subjectTeaching: string | null;
  resume: string | null;
  resumeName: string | null;
  department: FacultyDepartmentId;
  departments?: FacultyDepartmentId[];
  sortOrder: number;
};

export type FacultySection = {
  id: FacultyDepartmentId;
  title: string;
  members: FacultyMember[];
};
