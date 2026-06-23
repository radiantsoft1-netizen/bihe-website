"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { AlumniProfile } from "@/lib/types/alumni";

type AlumniDirectoryProps = {
  profiles: AlumniProfile[];
};

function profileCardProfession(profile: AlumniProfile): string {
  return profile.currentRole?.trim() || profile.currentEmployer?.trim() || "";
}

export function AlumniDirectory({ profiles }: AlumniDirectoryProps) {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("all");
  const [batchYear, setBatchYear] = useState("all");

  const programs = useMemo(() => {
    const values = new Set(profiles.map((profile) => profile.program).filter(Boolean));
    return Array.from(values).sort();
  }, [profiles]);

  const batchYears = useMemo(() => {
    const values = new Set(
      profiles
        .map((profile) => profile.passoutYear ?? profile.batchYear)
        .filter((year): year is number => Boolean(year)),
    );
    return Array.from(values).sort((a, b) => b - a);
  }, [profiles]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return profiles.filter((profile) => {
      if (program !== "all" && profile.program !== program) {
        return false;
      }

      if (batchYear !== "all" && String(profile.passoutYear ?? profile.batchYear ?? "") !== batchYear) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        profile.name,
        profile.program,
        profile.currentRole,
        profile.currentEmployer,
        profile.currentLocation,
        profile.passoutYear ? String(profile.passoutYear) : "",
        profile.batchYear ? String(profile.batchYear) : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [profiles, query, program, batchYear]);

  return (
    <>
      <div className="alumni-directory__filters" role="search">
        <label className="alumni-directory__filter">
          <span className="alumni-directory__filter-label">Search</span>
          <input
            type="search"
            className="alumni-directory__input"
            placeholder="Name, employer, role, location…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="alumni-directory__filter">
          <span className="alumni-directory__filter-label">Program</span>
          <select
            className="alumni-directory__input alumni-directory__select"
            value={program}
            onChange={(event) => setProgram(event.target.value)}
            aria-label="Filter by program"
          >
            <option value="all">All programs</option>
            {programs.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="alumni-directory__filter">
          <span className="alumni-directory__filter-label">Batch</span>
          <select
            className="alumni-directory__input alumni-directory__select"
            value={batchYear}
            onChange={(event) => setBatchYear(event.target.value)}
            aria-label="Filter by batch year"
          >
            <option value="all">All batches</option>
            {batchYears.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="alumni-directory__count" aria-live="polite">
        Showing {filtered.length} of {profiles.length} alumni
      </p>

      {filtered.length === 0 ? (
        <p className="faculty-staff__empty">No alumni match your filters.</p>
      ) : (
        <ul className="faculty-staff__grid">
          {filtered.map((profile, index) => {
            const profession = profileCardProfession(profile);

            return (
              <Reveal
                key={profile.id}
                as="li"
                delay={index * 95}
                direction="scale"
                className="faculty-staff__item"
              >
                <article className="faculty-staff__card faculty-staff__card--alumni-static">
                  <Link
                    href={profile.href}
                    className="alumni-directory__card-link faculty-staff__card--link"
                    aria-label={`View ${profile.name}'s alumni profile`}
                  />
                  <div className="faculty-staff__media">
                    <div className="faculty-staff__photo-wrap">
                      {profile.photo ? (
                        <SmartImage
                          src={profile.photo}
                          alt={`${profile.name}, ${profile.program} alumni`}
                          fill
                          className="faculty-staff__photo"
                          sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 420px"
                          quality={90}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="faculty-staff__footer">
                    <div className="faculty-staff__footer-head">
                      <h3 className="faculty-staff__name" title={profile.name}>
                        {profile.name}
                      </h3>
                      {profession ? (
                        <p className="faculty-staff__designation alumni-directory__designation">
                          <span className="alumni-directory__designation-line">{profession}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      )}
    </>
  );
}
