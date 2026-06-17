import type { Metadata } from "next";
import { NewsListingPage } from "@/components/news/NewsListingPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { NEWS_PAGE_LEAD } from "@/lib/news-service";

export const metadata: Metadata = {
  title: "News & Events | BIHE",
  description: NEWS_PAGE_LEAD,
};

export default function NewsRoutePage() {
  return (
    <SitePageShell>
      <NewsListingPage />
    </SitePageShell>
  );
}
