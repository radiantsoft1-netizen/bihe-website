import type { Metadata } from "next";
import { ControllerOfExaminationPage } from "@/components/administration/ControllerOfExaminationPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { CONTROLLER_OF_EXAMINATION_PAGE_LEAD } from "@/lib/controller-of-examination-content";

export const metadata: Metadata = {
  title: "Controller of Examination | Administration | BIHE",
  description: CONTROLLER_OF_EXAMINATION_PAGE_LEAD,
};

export default function ControllerOfExaminationRoutePage() {
  return (
    <SitePageShell>
      <ControllerOfExaminationPage />
    </SitePageShell>
  );
}
