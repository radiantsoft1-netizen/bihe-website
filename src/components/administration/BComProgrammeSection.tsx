import { AcademicsProgrammeShowcase } from "@/components/academics/AcademicsProgrammeShowcase";
import { B_COM_PROGRAMME_SHOWCASE } from "@/lib/b-com-admin-content";

export function BComProgrammeSection() {
  return <AcademicsProgrammeShowcase config={B_COM_PROGRAMME_SHOWCASE} />;
}
