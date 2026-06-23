<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class SiteNavigationSeeder extends Seeder
{
    public function run(): void
    {
        MenuItem::query()->delete();

        $this->seedHeaderMenu();
        $this->seedFooterMenu();
    }

    private function seedHeaderMenu(): void
    {
        $this->childGroup('header', 'Home', '/', 0);
        $this->childGroup('header', 'About the Institution', '/about-bihe', 1, [
            ['About BIHE', '/about-bihe'],
            ['Memorandum of Association', '/memorandum-of-association'],
            ['Institutional Development Plan', '/institutional-development-plan'],
            ['Affliation', '/constituent-units'],
            ['Recognition', '/recognition'],
            ['Annual Reports', '/annual-reports'],
            ['Audit Report', '/audit-report'],
        ]);
        $this->childGroup('header', 'Administration', '/governing-bodies', 2, [
            ['Governing Bodies', '/governing-bodies'],
            ['Principal', '/principal'],
            ['Controller of Examinations', '/controller-of-examination'],
            ['Ombudsperson', '/ombudsperson'],
            ['Finance Officer', '/finance-section'],
            ['Internal Complaint Committee', '/internal-complaint-committee'],
            ['Academic Leadership of BCA', '/bca'],
            ['Academic Leadership of B.com', '/b-com'],
        ]);
        $this->childGroup('header', 'Academics', '/academics/bca', 3, [
            ['BCA', '/academics/bca'],
            ['B.com', '/academics/b-com'],
            ['Academic Calendar', '/academics/academic-calendar'],
            ['Academic & Examination Statutes', '/academics/academics-and-examination'],
            ['BCA Faculty', '/academics/bca-faculty'],
            ['B.com Faculty', '/academics/b-com-faculty'],
            ['Non Teaching Staff', '/academics/non-teaching-staff'],
            ['Internal Quality Assurance Cell (IQAC)', '/academics/iqac'],
            ['Library', '/academics/library'],
        ]);
        $this->childGroup('header', 'Admissions & Fee', '/admissions/admission-process', 4, [
            ['Admission Process & Guidelines', '/admissions/admission-process'],
            ['Online Admission Format', '/admissions/online-admission-format'],
            ['Fee Refund Policy', '/admissions/fee-refund-policy'],
        ]);
        $this->childGroup('header', 'Research', '/research/research-and-development-cell', 5, [
            ['Research & Development Cell', '/research/research-and-development-cell'],
            ['Academic Projects', '/research/academic-projects'],
            ['Incubation Centre', '/research/incubation-centre'],
            ['Central Research Facilities', '/research/central-research-facilities'],
        ]);
        $this->childGroup('header', 'Student Life', '/student-life/sports-facilities', 6, [
            ['Sports Facilities', '/student-life/sports-facilities'],
            ['NSS Details', '/student-life/nss-details'],
            ['Hostel Facilities', '/student-life/hostel-facilities'],
            ['Placement Cell & Activities', '/student-life/placement-cell-and-activities'],
            ['Student Grievance Redressal Committee (SGRC)', '/student-life/student-grievance-redressal-committee'],
            ['Health Facilities', '/student-life/health-facilities'],
            ['Internal Complaint Committee', '/internal-complaint-committee'],
            ['Anti-Ragging Cell', '/student-life/anti-ragging-cell'],
            ['Equal Opportunity Cell', '/student-life/equal-opportunity-cell'],
            ['Socio-Economically Disadvantaged Groups (SEDG) Cell', '/student-life/socio-economically-disadvantaged-groups'],
            ['Facilities for Differently-Abled Students', '/student-life/facilities-for-differently-abled-students'],
            ['Computer Lab', '/student-life/computer-lab'],
            ['Auditorium', '/student-life/auditorium'],
            ['Canteen', '/student-life/canteen'],
            ['Youth Red Cross', '/student-life/youth-red-cross'],
        ]);
        $this->childGroup('header', 'Info - Corner', '/info-corner/announcements', 7, [
            ['RTI Details', '/info-corner/rti-details'],
            ['Announcements', '/info-corner/announcements'],
            ['Newsletters', '/info-corner/newsletters'],
            ['News, Events & Achievements', '/info-corner/news-events-achievements'],
            ['Circulars and Notices', '/info-corner/circulars-and-notices'],
            ['Job Openings', '/info-corner/job-openings'],
            [
                'Admission procedure and facilities provided to International Students.',
                '/info-corner/international-students-admission',
            ],
        ]);
        $this->childGroup('header', 'Contact Us', '/contact', 8);
    }

    private function seedFooterMenu(): void
    {
        $this->footerColumn('Admissions', 0, [
            ['Admission Process & Guidelines', '/admissions/admission-process'],
            ['Fee Refund Policy', '/admissions/fee-refund-policy'],
            ['Application', '/admissions/online-admission-format'],
        ]);
        $this->footerColumn('Gallery', 1, [
            ['Image Gallery', '/gallery'],
            ['Prospectus', '/admissions/admission-process'],
            ['Video Gallery', '/gallery#gallery'],
        ]);
        $this->footerColumn('Campus Life', 2, [
            ['Sports', '/student-life/sports-facilities'],
            ['Hostel', '/student-life/hostel-facilities'],
            ['Placement Cell', '/student-life/placement-cell-and-activities'],
            ['Anti-Ragging Cell', '/student-life/anti-ragging-cell'],
            ['Computer Lab', '/student-life/computer-lab'],
            ['Auditorium', '/student-life/auditorium'],
            ['Canteen', '/student-life/canteen'],
        ]);
        $this->footerColumn('About the Institution', 3, [
            ['About BEA', '/governing-bodies'],
            ['About BIHE', '/about-bihe'],
            ['Hon. Secretary', '/governing-bodies'],
            ['Hon. Joint Secretary', '/governing-bodies'],
            ['Chairman', '/governing-bodies'],
            ['Principal', '/principal'],
        ]);
        $this->footerColumn('Academics', 4, [
            ['Programs Offered', '/#courses'],
            ['Academic Calendar', '/academics/academic-calendar'],
            ['B.Com Faculty', '/academics/b-com-faculty'],
            ['BCA Faculty', '/academics/bca-faculty'],
            ['Non - Teaching Staff', '/academics/non-teaching-staff'],
            ['Library', '/academics/library'],
            ['Internal Quality Assurance Cell (IQAC)', '/academics/iqac'],
        ]);
        $this->footerColumn('Information Corner', 5, [
            ['RTI Details', '/info-corner/rti-details'],
            ['Announcements', '/info-corner/announcements'],
            ['Newsletters', '/info-corner/newsletters'],
            ['News, Events & Achievements', '/info-corner/news-events-achievements'],
            ['Circulars and Notices', '/info-corner/circulars-and-notices'],
            ['Job Openings', '/info-corner/job-openings'],
            [
                'Admission procedure and facilities provided to International Students.',
                '/info-corner/international-students-admission',
            ],
        ]);
    }

    /**
     * @param  list<array{0: string, 1: string}>  $children
     */
    private function childGroup(
        string $menuKey,
        string $label,
        string $href,
        int $sortOrder,
        array $children = [],
    ): void {
        $parent = MenuItem::create([
            'menu_key' => $menuKey,
            'parent_id' => null,
            'label' => $label,
            'href' => $href,
            'sort_order' => $sortOrder,
            'is_visible' => true,
        ]);

        foreach ($children as $index => [$childLabel, $childHref]) {
            MenuItem::create([
                'menu_key' => $menuKey,
                'parent_id' => $parent->id,
                'label' => $childLabel,
                'href' => $childHref,
                'sort_order' => $index,
                'is_visible' => true,
            ]);
        }
    }

    /**
     * @param  list<array{0: string, 1: string}>  $links
     */
    private function footerColumn(string $title, int $sortOrder, array $links): void
    {
        $parent = MenuItem::create([
            'menu_key' => 'footer',
            'parent_id' => null,
            'label' => $title,
            'href' => null,
            'sort_order' => $sortOrder,
            'is_visible' => true,
        ]);

        foreach ($links as $index => [$label, $href]) {
            MenuItem::create([
                'menu_key' => 'footer',
                'parent_id' => $parent->id,
                'label' => $label,
                'href' => $href,
                'sort_order' => $index,
                'is_visible' => true,
            ]);
        }
    }
}
