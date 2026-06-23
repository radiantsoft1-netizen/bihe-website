"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { NewsCategory, NewsItem } from "@/lib/types/news";
import { newsItemHref } from "@/lib/site-links";

type NewsPageGridProps = {
  initialItems: NewsItem[];
  categories: NewsCategory[];
};

export function NewsPageGrid({ initialItems, categories }: NewsPageGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") return initialItems;
    return initialItems.filter((item) => item.category?.slug === activeCategory);
  }, [activeCategory, initialItems]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of initialItems) {
      const slug = item.category?.slug;
      if (!slug) continue;
      map.set(slug, (map.get(slug) ?? 0) + 1);
    }
    return map;
  }, [initialItems]);

  return (
    <section className="news news-page__listing" aria-labelledby="news-page-grid-title">
      <div className="news__decor" aria-hidden>
        <span className="news__decor-ring" />
        <span className="news__decor-dot" />
      </div>

      <div className="container news__inner news-page__inner">
        <Reveal delay={60}>
          <div
            className="news-page__filters"
            role="tablist"
            aria-label="Filter news and events"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              className={`news-page__filter${activeCategory === "all" ? " news-page__filter--active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span className="news-page__filter-label">All</span>
              <span className="news-page__filter-count" aria-hidden>
                {initialItems.length}
              </span>
            </button>
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;
              const count = counts.get(category.slug) ?? 0;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`news-page__filter${isActive ? " news-page__filter--active" : ""}`}
                  onClick={() => setActiveCategory(category.slug)}
                >
                  <span className="news-page__filter-label">{category.name}</span>
                  <span className="news-page__filter-count" aria-hidden>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="news__grid news-page__grid" key={activeCategory}>
          {visibleItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 90} direction="up">
              <article className="news-card">
                <Link href={newsItemHref(item.slug)} className="news-card__media media-card__media">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="news-card__img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <MediaBadge label={item.tag} />
                  <span className="news-card__date">{item.date}</span>
                </Link>
                <div className="news-card__body">
                  <h3 className="news-card__title">{item.title}</h3>
                  {item.description ? (
                    <p className="news-page__excerpt">{item.description}</p>
                  ) : null}
                  <Link href={newsItemHref(item.slug)} className="news-card__link">
                    Read more
                    <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
