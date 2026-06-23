import "@/styles/site-pages.css";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PageBackgroundShapes } from "@/components/landing/PageBackgroundShapes";
import { getSiteNavigation } from "@/lib/navigation-service";
import {
  applyProspectusToFooterColumns,
  applyProspectusToHeaderNav,
  getProspectusLink,
} from "@/lib/prospectus-service";

type SitePageShellProps = {
  children: React.ReactNode;
};

export async function SitePageShell({ children }: SitePageShellProps) {
  const [navigation, prospectus] = await Promise.all([getSiteNavigation(), getProspectusLink()]);
  const headerNavigation = applyProspectusToHeaderNav(navigation.header);
  const footerNavigation = applyProspectusToFooterColumns(navigation.footer, prospectus);

  return (
    <>
      <Header navigation={headerNavigation} prospectus={prospectus} />
      <div className="page-enter bihe-wrap">
        <PageBackgroundShapes />
        <main>{children}</main>
        <Footer navigation={footerNavigation} />
      </div>
    </>
  );
}
