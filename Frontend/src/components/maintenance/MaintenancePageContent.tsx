import type { SiteMaintenanceStatus } from "@/lib/maintenance-status";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

type MaintenancePageContentProps = {
  status: SiteMaintenanceStatus;
  preview?: boolean;
};

export function MaintenancePageContent({ status, preview = false }: MaintenancePageContentProps) {
  const badgeLabel = status.mode === "staging" ? "Staging preview" : "Under construction";

  return (
    <main className="maintenance-page">
      <div className="maintenance-page__card">
        <span
          className={`maintenance-page__badge${
            status.mode === "staging" ? " maintenance-page__badge--staging" : ""
          }`}
        >
          {badgeLabel}
        </span>

        <SmartImage
          src={images.logo}
          alt="BIHE logo"
          width={72}
          height={72}
          className="maintenance-page__logo"
          priority
        />

        <h1 className="maintenance-page__title">{status.headline}</h1>
        <p className="maintenance-page__message">{status.message}</p>

        {status.contactEmail ? (
          <p className="maintenance-page__contact">
            For enquiries, email{" "}
            <a href={`mailto:${status.contactEmail}`}>{status.contactEmail}</a>
          </p>
        ) : null}

        {preview && !status.enabled ? (
          <p className="maintenance-page__preview">
            Preview only — the public website is currently live for visitors.
          </p>
        ) : null}
      </div>
    </main>
  );
}
