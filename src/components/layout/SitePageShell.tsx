import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PageBackgroundShapes } from "@/components/landing/PageBackgroundShapes";

type SitePageShellProps = {
  children: React.ReactNode;
};

export function SitePageShell({ children }: SitePageShellProps) {
  return (
    <>
      <Header />
      <div className="page-enter bihe-wrap">
        <PageBackgroundShapes />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
