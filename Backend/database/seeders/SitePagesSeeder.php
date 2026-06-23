<?php

namespace Database\Seeders;

use App\Models\SitePage;
use App\Services\SitePageContentImportService;
use Illuminate\Database\Seeder;

class SitePagesSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            ...$this->aboutPages(),
            ...$this->administrationPages(),
            ...$this->academicsPages(),
            ...$this->admissionsPages(),
            ...$this->researchPages(),
            ...$this->studentLifePages(),
            ...$this->infoCornerPages(),
        ];

        foreach ($pages as $page) {
            SitePage::updateOrCreate(
                ['path' => $page['path']],
                array_merge($page, ['published' => true]),
            );
        }

        app(SitePageContentImportService::class)->import(onlyEmpty: true);
    }

    /** @return list<array<string, mixed>> */
    private function aboutPages(): array
    {
        return [
            $this->page('/about-bihe', 'about-bihe', 'about', 'about-bihe', 'About BIHE', 'Institutional overview of BIHE Davangere.'),
            $this->page('/memorandum-of-association', 'memorandum-of-association', 'about', 'memorandum', 'Memorandum of Association', 'Governance framework and constitutional documents.'),
            $this->page('/institutional-development-plan', 'institutional-development-plan', 'about', 'idp', 'Institutional Development Plan', 'Strategic roadmap for academic growth.'),
            $this->page('/constituent-units', 'constituent-units', 'about', 'constituent-units', 'Affliation', 'Affiliation and university recognition documents.'),
            $this->page('/recognition', 'recognition', 'about', 'about-document', 'Recognition', 'AICTE approval and accreditation milestones.'),
            $this->page('/annual-reports', 'annual-reports', 'about', 'about-document', 'Annual Reports', 'Year-wise institutional reports.'),
            $this->page('/audit-report', 'audit-report', 'about', 'about-document', 'Audit Report', 'Financial and compliance audit disclosures.'),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function administrationPages(): array
    {
        return [
            $this->page('/principal', 'principal', 'administration', 'principal', 'Principal', 'Leadership and academic vision at BIHE.'),
            $this->page('/finance-section', 'finance-section', 'administration', 'finance-section', 'Finance Section', 'Financial planning and fee administration.'),
            $this->page('/controller-of-examination', 'controller-of-examination', 'administration', 'controller-of-examination', 'Controller of Examination', 'Examination schedules and academic records.'),
            $this->page('/ombudsperson', 'ombudsperson', 'administration', 'ombudsperson', 'Ombudsperson', 'Independent grievance redressal support.'),
            $this->page('/governing-bodies', 'governing-bodies', 'administration', 'governing-bodies', 'Governing Bodies', 'Governance structure and institutional accountability.'),
            $this->page('/internal-complaint-committee', 'internal-complaint-committee', 'administration', 'internal-complaint-committee', 'Internal Complaint Committee', 'Campus safety and complaints compliance.'),
            $this->page('/bca', 'bca', 'administration', 'bca-leadership', 'Academic Leadership of BCA', 'BCA department leadership at BIHE.'),
            $this->page('/b-com', 'b-com', 'administration', 'b-com-leadership', 'Academic Leadership of B.Com', 'B.Com department leadership at BIHE.'),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function academicsPages(): array
    {
        return [
            $this->page('/academics/b-com', 'b-com', 'academics', 'b-com-academics', 'Bachelor of Commerce', 'B.Com programme at BIHE.'),
            $this->page('/academics/bca', 'bca', 'academics', 'bca-academics', 'Bachelor of Computer Applications', 'BCA programme at BIHE.'),
            $this->page('/academics/academic-calendar', 'academic-calendar', 'academics', 'academic-calendar', 'Academic Calendar', 'Semester schedules and academic dates.'),
            $this->page('/academics/academics-and-examination', 'academics-and-examination', 'academics', 'academics-examination', 'Academics & Examination', 'Examination conduct and academic regulations.'),
            $this->page('/academics/b-com-faculty', 'b-com-faculty', 'academics', 'faculty-department', 'B.Com Faculty', 'Faculty profiles for B.Com.'),
            $this->page('/academics/bca-faculty', 'bca-faculty', 'academics', 'faculty-department', 'BCA Faculty', 'Faculty profiles for BCA.'),
            $this->page('/academics/non-teaching-staff', 'non-teaching-staff', 'academics', 'faculty-department', 'Non Teaching Staff', 'Administrative and support staff.'),
            $this->page('/academics/faculty-and-staff', 'faculty-and-staff', 'academics', 'faculty-and-staff', 'Faculty And Staff Details', 'Academic faculty and departmental staff.'),
            $this->page('/academics/iqac', 'iqac', 'academics', 'iqac', 'Internal Quality Assurance Cell', 'Quality assurance at BIHE.'),
            $this->page('/academics/library', 'library', 'academics', 'library', 'Library', 'Library and learning resources.'),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function admissionsPages(): array
    {
        return [
            $this->page('/admissions/admission-process', 'admission-process', 'admissions', 'admission-process', 'Admission Process', 'Admission procedure and guidelines.'),
            $this->page('/admissions/fee-refund-policy', 'fee-refund-policy', 'admissions', 'fee-refund-policy', 'Fee Refund Policy', 'Fee refund guidelines.'),
            $this->page('/admissions/online-admission-format', 'online-admission-format', 'admissions', 'online-admission-format', 'Online Admission Format', 'Online application format.'),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function researchPages(): array
    {
        return [
            $this->page('/research/incubation-centre', 'incubation-centre', 'research', 'incubation-centre', 'Incubation Centre', 'Startup incubation and innovation support.'),
            $this->page('/research/central-research-facilities', 'central-research-facilities', 'research', 'central-research-facilities', 'Central Research Facilities', 'Shared laboratories and research infrastructure.'),
            $this->page('/research/research-and-development-cell', 'research-and-development-cell', 'research', 'research-development-cell', 'Research and Development Cell', 'Institutional R&D initiatives.'),
            $this->page('/research/academic-projects', 'academic-projects', 'research', 'academic-projects', 'Academic Projects', 'Undergraduate and faculty-led projects.'),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function studentLifePages(): array
    {
        $slugs = [
            'sports-facilities', 'nss-details', 'hostel-facilities', 'placement-cell-and-activities',
            'student-grievance-redressal-committee', 'health-facilities', 'anti-ragging-cell',
            'equal-opportunity-cell', 'socio-economically-disadvantaged-groups',
            'facilities-for-differently-abled-students', 'computer-lab', 'auditorium', 'canteen', 'youth-red-cross',
        ];

        return array_map(
            fn (string $slug) => $this->page(
                '/student-life/'.$slug,
                $slug,
                'student-life',
                'student-life',
                str_replace('-', ' ', ucwords($slug, '-')),
                'Student life and campus facilities at BIHE.',
            ),
            $slugs,
        );
    }

    /** @return list<array<string, mixed>> */
    private function infoCornerPages(): array
    {
        $slugs = [
            'rti-details', 'announcements', 'newsletters', 'news-events-achievements',
            'international-students-admission', 'circulars-and-notices', 'job-openings',
        ];

        return array_map(
            fn (string $slug) => $this->page(
                '/info-corner/'.$slug,
                $slug,
                'info-corner',
                'info-corner',
                str_replace('-', ' ', ucwords($slug, '-')),
                'Information corner resources at BIHE.',
            ),
            $slugs,
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function page(
        string $path,
        string $slug,
        string $section,
        string $templateKey,
        string $title,
        string $metaDescription,
    ): array {
        return [
            'path' => $path,
            'slug' => $slug,
            'section' => $section,
            'template_key' => $templateKey,
            'title' => $title,
            'meta_description' => $metaDescription,
            'content' => [
                'title' => $title,
                'lead' => $metaDescription,
            ],
            'sort_order' => 0,
        ];
    }
}
