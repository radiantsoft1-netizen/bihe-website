"use client";

import { Reveal } from "@/components/ui/Reveal";

type FacultyStaffIntroProps = {
  title: string;
  id: string;
};

export function FacultyStaffIntro({ title, id }: FacultyStaffIntroProps) {
  return (
    <div className="b-com-admin__faculty-intro">
      <Reveal direction="up" delay={0}>
        <h2 className="b-com-admin__faculty-title" id={id}>
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
