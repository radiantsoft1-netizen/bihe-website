import { AboutSection } from "@/components/landing/AboutSection";
import { InfoCornerHomeScroller } from "@/components/landing/InfoCornerHomeScroller";
import { AccreditationSection } from "@/components/landing/AccreditationSection";
import { CoursesSection } from "@/components/landing/CoursesSection";
import { FacilitiesSection } from "@/components/landing/FacilitiesSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSlider } from "@/components/landing/HeroSlider";
import { GallerySection } from "@/components/landing/GallerySection";
import { NewsTicker } from "@/components/landing/NewsTicker";
import { RecruitersSection } from "@/components/landing/RecruitersSection";
import { PageBackgroundShapes } from "@/components/landing/PageBackgroundShapes";
import {
  getHeroSlides,
  getHomepageGallery,
  getRecruitingPartners,
} from "@/lib/api/homepage";
import { getInfoCornerHomeScrollerItems } from "@/lib/info-corner-items-service";
import { getNewsTickerItems } from "@/lib/news-service";
import { getSiteNavigation } from "@/lib/navigation-service";
import {
  applyProspectusToFooterColumns,
  applyProspectusToHeaderNav,
  getProspectusLink,
} from "@/lib/prospectus-service";

/**
 * Homepage content policy
 *
 * Dynamic (Laravel /api/v1/*): hero banners, info corner home scroller, news ticker,
 * gallery highlights, recruiters/partners logos.
 *
 * Static (hardcoded components / lib/*-content.ts): about, principal message,
 * statistics, academic/courses info, accreditation, facilities, and all other
 * informational sections — do not wire these to the API without explicit approval.
 */
export default async function HomePage() {
  const [heroSlides, infoCornerScroller, newsTicker, gallery, partners, navigation, prospectus] = await Promise.all([
    getHeroSlides(),
    getInfoCornerHomeScrollerItems(),
    getNewsTickerItems(),
    getHomepageGallery(),
    getRecruitingPartners(),
    getSiteNavigation(),
    getProspectusLink(),
  ]);
  const headerNavigation = applyProspectusToHeaderNav(navigation.header);
  const footerNavigation = applyProspectusToFooterColumns(navigation.footer, prospectus);

  const heroBackgroundImage = heroSlides.find((slide) => slide.image)?.image ?? undefined;

  return (
    <>
      <Header navigation={headerNavigation} prospectus={prospectus} />
      <div className="page-enter bihe-wrap">
        <PageBackgroundShapes />
        <main>
          {/* Dynamic — fetched from Laravel API with static fallbacks */}
          <div className="home-fold">
            <HeroSlider slides={heroSlides} backgroundImage={heroBackgroundImage} />
            <InfoCornerHomeScroller items={infoCornerScroller} />
            <NewsTicker items={newsTicker} />
          </div>
          {/* Static — about copy and inline statistics */}
          <AboutSection />
          <AccreditationSection />
          {/* Static — academic program cards from courses-content.ts */}
          <CoursesSection />
          {/* Static — campus facilities */}
          <FacilitiesSection />
          {/* Dynamic */}
          <RecruitersSection partners={partners} />
          <GallerySection items={gallery.items} tagStats={gallery.tagStats} />
        </main>
        <Footer navigation={footerNavigation} />
      </div>
    </>
  );
}
