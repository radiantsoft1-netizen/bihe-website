import { AboutSection } from "@/components/landing/AboutSection";
import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { AccreditationSection } from "@/components/landing/AccreditationSection";
import { CoursesSection } from "@/components/landing/CoursesSection";
import { FacilitiesSection } from "@/components/landing/FacilitiesSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSlider } from "@/components/landing/HeroSlider";
import { GallerySection } from "@/components/landing/GallerySection";
import { RecruitersSection } from "@/components/landing/RecruitersSection";
import { PageBackgroundShapes } from "@/components/landing/PageBackgroundShapes";
export default function HomePage() {
  return (
    <>
      <Header />
      <div className="page-enter bihe-wrap">
        <PageBackgroundShapes />
        <main>
        <div className="home-fold">
          <HeroSlider />
          <AnnouncementBar />
        </div>
        <AboutSection />
        <AccreditationSection />
        <CoursesSection />
        <FacilitiesSection />
        <RecruitersSection />
        <GallerySection />
        </main>
        <Footer />
      </div>
    </>
  );
}
