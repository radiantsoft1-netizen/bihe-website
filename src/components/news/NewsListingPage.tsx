import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { NewsPageGrid } from "@/components/news/NewsPageGrid";
import { NEWS_PAGE_LEAD, getNewsCategories, getNewsList } from "@/lib/news-service";
import { SITE_LINKS } from "@/lib/site-links";

export async function NewsListingPage() {
  const [items, categories] = await Promise.all([getNewsList(), getNewsCategories()]);

  return (
    <article className="news-page about-bihe-page">
      <AboutInnerHero
        currentPage="News & Events"
        title="News & Events"
        lead={NEWS_PAGE_LEAD}
        eyebrow="News & Events"
        sectionLabel="News & Events"
        sectionHref={SITE_LINKS.news}
      />

      <NewsPageGrid initialItems={items} categories={categories} />
    </article>
  );
}
