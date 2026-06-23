import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import {
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT,
  FOOTER_DESCRIPTION,
  FOOTER_INSTITUTE_NAME_EN,
  FOOTER_INSTITUTE_NAME_KN,
} from "@/lib/footer-content";
import { images } from "@/lib/images";
import { STATIC_FOOTER_NAV, type FooterNavColumn, type FooterNavLink } from "@/lib/static-navigation";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function FooterNavAnchor({ link }: { link: FooterNavLink }) {
  if (link.openInNewTab || isExternalHref(link.href)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return <Link href={link.href}>{link.label}</Link>;
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://bihedvg.org/",
    icon: <FacebookIcon size={17} />,
  },
  {
    label: "LinkedIn",
    href: "https://bihedvg.org/",
    icon: <LinkedInIcon size={17} />,
  },
  {
    label: "YouTube",
    href: "https://bihedvg.org/",
    icon: <YouTubeIcon size={17} />,
  },
  {
    label: "Instagram",
    href: "https://bihedvg.org/",
    icon: <InstagramIcon size={17} />,
  },
];

type FooterProps = {
  navigation?: FooterNavColumn[];
};

export function Footer({ navigation }: FooterProps = {}) {
  const linkColumns = navigation ?? STATIC_FOOTER_NAV;

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__top">
          <Link href="/" className="footer__brand-head">
            <span className="footer__logo-wrap">
              <SmartImage
                src={images.logo}
                alt="BIHE"
                width={96}
                height={80}
                className="footer__logo"
              />
            </span>
            <div className="footer__institute-name">
              <span className="footer__institute-name-kn" lang="kn">
                {FOOTER_INSTITUTE_NAME_KN}
              </span>
              <span className="footer__institute-name-en" lang="en">
                {FOOTER_INSTITUTE_NAME_EN}
              </span>
            </div>
          </Link>
        </div>

        <div className="footer__main">
          <div className="footer__brand-col">
            <p className="footer__institute-desc">{FOOTER_DESCRIPTION}</p>

            <address className="footer__contact">
              <p className="footer__contact-item">
                <a href={FOOTER_CONTACT.phoneHref}>{FOOTER_CONTACT.phone}</a>
              </p>
              <p className="footer__contact-item">
                <a href={FOOTER_CONTACT.emailHref}>{FOOTER_CONTACT.email}</a>
              </p>
            </address>
          </div>

          <nav className="footer__columns" aria-label="Footer navigation">
            {linkColumns.map((col) => (
              <div key={col.title} className="footer__col">
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span className="footer__bar-label">Follow Us :</span>
            <div className="footer__social-icons">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer__social-btn"
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <p className="footer__copyright">{FOOTER_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
