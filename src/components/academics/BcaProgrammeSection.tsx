import { AcademicsProgrammeShowcase } from "@/components/academics/AcademicsProgrammeShowcase";
import { BCA_PROGRAMME_SHOWCASE } from "@/lib/bca-academics-content";

export function BcaProgrammeSection() {
  return <AcademicsProgrammeShowcase config={BCA_PROGRAMME_SHOWCASE} />;
}
