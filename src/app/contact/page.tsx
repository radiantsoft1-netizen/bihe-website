import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { CONTACT_PAGE_LEAD } from "@/lib/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us | Bapuji Institute of Hi-Tech Education",
  description: CONTACT_PAGE_LEAD,
};

export default function ContactRoutePage() {
  return (
    <SitePageShell>
      <ContactPage />
    </SitePageShell>
  );
}
