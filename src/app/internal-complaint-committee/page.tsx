import type { Metadata } from "next";
import { InternalComplaintCommitteePage } from "@/components/administration/InternalComplaintCommitteePage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ICC_PAGE_LEAD } from "@/lib/internal-complaint-committee-content";

export const metadata: Metadata = {
  title: "Internal Complaints Committee (ICC) | Student Life | BIHE",
  description: ICC_PAGE_LEAD,
};

export default function InternalComplaintCommitteeRoutePage() {
  return (
    <SitePageShell>
      <InternalComplaintCommitteePage />
    </SitePageShell>
  );
}
