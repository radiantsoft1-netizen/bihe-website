<?php

namespace Database\Seeders;

use App\Models\InfoCornerCategory;
use App\Models\InfoCornerItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class InfoCornerSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'announcements',
                'name' => 'Announcements',
                'description' => 'Official college announcements, notices, and updates for students, faculty, and stakeholders.',
                'sort_order' => 1,
            ],
            [
                'slug' => 'newsletters',
                'name' => 'Newsletters',
                'description' => 'Institutional newsletters highlighting campus news, academic updates, and community activities.',
                'sort_order' => 2,
            ],
            [
                'slug' => 'news-events-achievements',
                'name' => 'News, Events & Achievements',
                'description' => 'Latest news, campus events, student achievements, and institutional milestones at BIHE.',
                'sort_order' => 3,
            ],
            [
                'slug' => 'circulars-and-notices',
                'name' => 'Circulars and Notices',
                'description' => 'Official circulars, administrative notices, and compliance-related communications from the institution.',
                'sort_order' => 4,
            ],
            [
                'slug' => 'job-openings',
                'name' => 'Job Openings',
                'description' => 'Current faculty and staff recruitment opportunities at Bapuji Institute of Hi-Tech Education.',
                'sort_order' => 5,
            ],
        ];

        $categoryIds = [];

        foreach ($categories as $category) {
            $record = InfoCornerCategory::updateOrCreate(
                ['slug' => $category['slug']],
                array_merge($category, ['published' => true])
            );
            $categoryIds[$category['slug']] = $record->id;
        }

        $imagePath = $this->seedNoticeImage();

        $items = [
            [
                'category' => 'announcements',
                'slug' => 'admission-update-2025',
                'title' => 'Admission Update 2025–26',
                'excerpt' => 'Important admission-related announcement for prospective students and parents.',
                'body' => "Admission enquiries and application support for the academic year 2025–26 are handled through the college office during working hours.\n\nPlease verify programme-specific eligibility and document requirements before submission.",
                'published_date' => '2025-06-01',
                'show_in_home_scroller' => true,
                'sort_order' => 0,
            ],
            [
                'category' => 'circulars-and-notices',
                'slug' => 'admission-circular',
                'title' => 'Circular',
                'excerpt' => 'Official institutional circular for students, faculty, and affiliated bodies regarding administrative directions for the notified academic period.',
                'body' => "This circular is issued by Bapuji Institute of Hi-Tech Education for students, faculty, and affiliated bodies. It contains official administrative directions and institutional communications that must be followed for the notified academic period.\n\nStudents are advised to read the full notice carefully and comply with the instructions mentioned. For clarifications, contact the college office during working hours.",
                'published_date' => '2025-05-19',
                'image_alt' => 'Official institutional circular published by Bapuji Institute of Hi-Tech Education.',
                'show_in_home_scroller' => true,
                'sort_order' => 0,
            ],
            [
                'category' => 'circulars-and-notices',
                'slug' => 'exam-notice',
                'title' => 'IA Instructions',
                'excerpt' => 'Internal assessment instructions and guidelines for BCA and B.Com students, including reporting requirements and conduct during examinations.',
                'body' => "Internal assessment instructions and guidelines for BCA and B.Com students at Bapuji Institute of Hi-Tech Education. This notice outlines the rules, reporting requirements, and conduct expected during internal assessment examinations.\n\nStudents must report to the examination hall on time with the required stationery and identity documents. Mobile phones and unauthorized materials are not permitted inside the assessment venue.",
                'published_date' => '2025-12-04',
                'image_alt' => 'Internal assessment instructions and guidelines for students at Bapuji Institute of Hi-Tech Education.',
                'show_in_home_scroller' => false,
                'sort_order' => 1,
            ],
            [
                'category' => 'circulars-and-notices',
                'slug' => 'holiday-notice',
                'title' => 'IA Time-Table',
                'subtitle' => '1st & 2nd Internal Assessment — 2024–25',
                'excerpt' => 'Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25.',
                'body' => "Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25 at Bapuji Institute of Hi-Tech Education.\n\nStudents should verify programme-specific dates, session timings, and subject schedules shown in the notice. Any change communicated by the examination section will supersede earlier timings.",
                'published_date' => '2024-11-18',
                'image_alt' => 'IA time-table for 1st and 2nd internal assessment 2024–25.',
                'show_in_home_scroller' => false,
                'sort_order' => 2,
            ],
            [
                'category' => 'news-events-achievements',
                'slug' => 'campus-achievement-highlight',
                'title' => 'Campus Achievement Highlight',
                'excerpt' => 'Student and institutional achievements published for the BIHE community.',
                'body' => "Bapuji Institute of Hi-Tech Education continues to celebrate academic, cultural, and placement-related milestones achieved by students and faculty.\n\nDetailed coverage of recent events and achievements will be published in this section.",
                'published_date' => '2025-03-15',
                'show_in_home_scroller' => true,
                'sort_order' => 0,
            ],
            [
                'category' => 'news-events-achievements',
                'slug' => 'mega-placement-drive-2025',
                'title' => 'Mega Placement Drive 2025',
                'excerpt' => 'Leading recruiters visited BIHE for on-campus interviews, career guidance sessions, and offer letter distribution for BCA and B.Com students.',
                'body' => "Bapuji Institute of Hi-Tech Education hosted a mega placement drive bringing together company HR teams, training partners, and graduating students from BCA and B.Com programmes.\n\nThe event included inaugural sessions, interview rounds, and offer letter distribution, reflecting the institution's focus on career readiness and industry engagement.",
                'published_date' => '2025-04-18',
                'image_alt' => 'Inaugural ceremony at the BIHE mega placement drive',
                'show_in_home_scroller' => false,
                'sort_order' => 1,
            ],
            [
                'category' => 'news-events-achievements',
                'slug' => 'graduation-day-2025',
                'title' => 'Graduation Day 2025',
                'excerpt' => 'Graduating students were honoured at the institutional graduation ceremony with faculty, parents, and dignitaries celebrating academic milestones.',
                'body' => "Graduation Day at Bapuji Institute of Hi-Tech Education marked the completion of academic journeys for outgoing BCA and B.Com batches.\n\nThe ceremony recognised student achievement, faculty mentorship, and the support of parents and institutional leadership.",
                'published_date' => '2025-03-22',
                'image_alt' => 'Graduation day celebrations at BIHE',
                'show_in_home_scroller' => false,
                'sort_order' => 2,
            ],
            [
                'category' => 'news-events-achievements',
                'slug' => 'annual-day-cultural-celebrations',
                'title' => 'Annual Day & Cultural Celebrations',
                'excerpt' => 'Students showcased talent through cultural performances, prize distributions, and stage programmes during the institutional annual day event.',
                'body' => "The annual day programme brought together academic recognition and cultural expression, highlighting student participation across departments.\n\nPerformances, awards, and community gatherings reflected the vibrant campus life at Bapuji Institute of Hi-Tech Education.",
                'published_date' => '2025-02-14',
                'image_alt' => 'Annual day cultural celebrations at BIHE',
                'show_in_home_scroller' => false,
                'sort_order' => 3,
            ],
            [
                'category' => 'news-events-achievements',
                'slug' => 'pragna-commerce-fest',
                'title' => 'Pragna Commerce Fest',
                'excerpt' => 'The B.Com department organised Pragna, a commerce fest featuring academic competitions, business presentations, and student-led activities.',
                'body' => "Pragna is a signature commerce fest at BIHE that encourages B.Com students to apply classroom learning through competitions and collaborative events.\n\nThe fest strengthens professional skills, teamwork, and department-level engagement within the commerce programme.",
                'published_date' => '2025-01-20',
                'image_alt' => 'Pragna commerce fest at BIHE',
                'show_in_home_scroller' => false,
                'sort_order' => 4,
            ],
            [
                'category' => 'newsletters',
                'slug' => 'beacon-2023',
                'title' => 'B.com - 2023',
                'subtitle' => 'B.com newsletter',
                'excerpt' => 'The B.com 2023 newsletter edition highlights academic milestones, campus events, student achievements, and programme updates from Bapuji Institute of Hi-Tech Education.',
                'body' => "The B.com newsletter captures department-level academic developments, campus activities, and community initiatives for the B.Com programme at Bapuji Institute of Hi-Tech Education.\n\nThe 2023 edition documents key events, student participation, faculty contributions, and programme milestones for students, alumni, and stakeholders.",
                'published_date' => '2024-03-01',
                'image_alt' => 'B.com 2023 newsletter cover preview',
                'show_in_home_scroller' => false,
                'sort_order' => 0,
            ],
            [
                'category' => 'newsletters',
                'slug' => 'bcom-2022',
                'title' => 'B.com - 2022',
                'subtitle' => 'B.com newsletter',
                'excerpt' => 'The B.com 2022 newsletter edition features department activities, academic highlights, and student engagement at BIHE.',
                'body' => "This B.com newsletter edition presents department-level updates, student activities, and academic highlights from the 2022 academic period.\n\nReaders can explore programme-related events, faculty notes, and campus participation documented for the B.Com community at BIHE.",
                'published_date' => '2023-08-11',
                'image_alt' => 'B.com 2022 newsletter cover preview',
                'show_in_home_scroller' => false,
                'sort_order' => 1,
            ],
            [
                'category' => 'newsletters',
                'slug' => 'bcom-2021',
                'title' => 'B.com - 2021',
                'subtitle' => 'B.com newsletter',
                'excerpt' => 'The B.com 2021 newsletter archives department news, student initiatives, and academic updates from BIHE.',
                'body' => "The B.com 2021 newsletter edition records departmental activities, student participation, and institutional communications for the academic year.\n\nThis archive supports students, faculty, and alumni in reviewing past B.Com programme highlights at Bapuji Institute of Hi-Tech Education.",
                'published_date' => '2023-08-11',
                'image_alt' => 'B.com 2021 newsletter cover preview',
                'show_in_home_scroller' => false,
                'sort_order' => 2,
            ],
            [
                'category' => 'newsletters',
                'slug' => 'bcom-2020',
                'title' => 'B.com - 2020',
                'subtitle' => 'B.com newsletter',
                'excerpt' => 'The B.com 2020 newsletter edition documents campus news, academic updates, and student activities from BIHE.',
                'body' => "The B.com 2020 newsletter captures departmental updates, student engagement, and institutional news from the corresponding academic period.\n\nThis edition is preserved as part of the BIHE newsletter archive for reference by students, parents, and faculty.",
                'published_date' => '2023-08-11',
                'image_alt' => 'B.com 2020 newsletter cover preview',
                'show_in_home_scroller' => false,
                'sort_order' => 3,
            ],
            [
                'category' => 'job-openings',
                'slug' => 'assistant-professor-computer-applications',
                'title' => 'Assistant Professor — Computer Applications',
                'subtitle' => 'BCA Department · 1 Post',
                'excerpt' => 'Applications are invited for the post of Assistant Professor in Computer Applications. Candidates should hold a relevant postgraduate qualification with NET/SET as applicable and demonstrate teaching aptitude in BCA programmes.',
                'body' => "Bapuji Institute of Hi-Tech Education invites applications for the post of Assistant Professor in the Computer Applications (BCA) department.\n\nEligible candidates should possess a Master's degree in Computer Applications, Computer Science, or a related discipline with NET/SET qualification where applicable. Prior teaching experience in undergraduate programmes is preferred.\n\nInterested applicants may submit their résumé along with supporting documents to the college office during working hours or email principal@bihedvg.org with the subject line “Application — Assistant Professor (BCA)”.",
                'published_date' => '2025-05-10',
                'show_in_home_scroller' => false,
                'sort_order' => 0,
            ],
            [
                'category' => 'job-openings',
                'slug' => 'lecturer-commerce',
                'title' => 'Lecturer — Commerce',
                'subtitle' => 'B.Com Department · 1 Post',
                'excerpt' => 'Recruitment notice for Lecturer in Commerce. Suitable candidates with postgraduate qualification in Commerce or related disciplines and commitment to undergraduate teaching may apply.',
                'body' => "Applications are invited for the post of Lecturer in the B.Com department at Bapuji Institute of Hi-Tech Education.\n\nCandidates should hold an M.Com or equivalent postgraduate qualification with a strong academic record. Experience in teaching commerce subjects at the undergraduate level will be an advantage.\n\nApplications with complete biodata and copies of certificates may be submitted to the college office or sent to principal@bihedvg.org mentioning “Application — Lecturer (B.Com)”.",
                'published_date' => '2025-04-22',
                'show_in_home_scroller' => false,
                'sort_order' => 1,
            ],
            [
                'category' => 'job-openings',
                'slug' => 'librarian',
                'title' => 'Librarian',
                'subtitle' => 'Library Section · 1 Post',
                'excerpt' => 'Vacancy for Librarian to manage library operations, catalogue maintenance, reader services, and support for students and faculty at BIHE.',
                'body' => "Bapuji Institute of Hi-Tech Education invites applications for the post of Librarian.\n\nThe role includes managing library resources, assisting students and faculty, maintaining records, and supporting academic reference services. A degree in Library Science (B.Lib / M.Lib) or equivalent qualification is required.\n\nInterested candidates may apply in person at the college office or contact principal@bihedvg.org for application guidelines.",
                'published_date' => '2025-03-18',
                'show_in_home_scroller' => false,
                'sort_order' => 2,
            ],
            [
                'category' => 'job-openings',
                'slug' => 'lab-instructor-computer-applications',
                'title' => 'Lab Instructor — Computer Applications',
                'subtitle' => 'BCA Computer Lab · 1 Post',
                'excerpt' => 'Recruitment for Lab Instructor to support practical sessions, lab maintenance, and software setup for BCA computer laboratory activities.',
                'body' => "Applications are invited for the post of Lab Instructor in the Computer Applications laboratory at BIHE.\n\nThe candidate should be proficient in computer systems, networking basics, and common programming environments used in BCA practical courses. Diploma or degree in Computer Applications / Computer Science is preferred.\n\nSubmit applications to the college office with relevant experience details or email principal@bihedvg.org with the subject “Application — Lab Instructor (BCA)”.",
                'published_date' => '2025-02-28',
                'show_in_home_scroller' => false,
                'sort_order' => 3,
            ],
            [
                'category' => 'job-openings',
                'slug' => 'office-assistant-administration',
                'title' => 'Office Assistant — Administration',
                'subtitle' => 'College Office · 1 Post',
                'excerpt' => 'Vacancy for Office Assistant in the college administration section for record keeping, front-desk support, and coordination with departments.',
                'body' => "Bapuji Institute of Hi-Tech Education invites applications for the post of Office Assistant in the administration section.\n\nThe role involves office documentation, correspondence support, data entry, and assisting students and visitors at the college office. Graduates with computer literacy and good communication skills in English and Kannada are eligible to apply.\n\nApplications may be submitted in person during office hours (Monday to Saturday) or sent to principal@bihedvg.org with the subject “Application — Office Assistant”.",
                'published_date' => '2025-01-15',
                'show_in_home_scroller' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($items as $item) {
            $record = InfoCornerItem::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'info_corner_category_id' => $categoryIds[$item['category']],
                    'title' => $item['title'],
                    'subtitle' => $item['subtitle'] ?? null,
                    'excerpt' => $item['excerpt'],
                    'body' => $item['body'],
                    'published_date' => $item['published_date'],
                    'image_path' => isset($item['image_alt']) ? $imagePath : null,
                    'image_alt' => $item['image_alt'] ?? null,
                    'show_in_home_scroller' => $item['show_in_home_scroller'],
                    'published' => true,
                    'sort_order' => $item['sort_order'],
                ]
            );

            $record->categories()->sync([$categoryIds[$item['category']]]);
        }
    }

    protected function seedNoticeImage(): ?string
    {
        $source = dirname(base_path()).'/public/images/circulars/notice-preview.jpg';

        if (! File::exists($source)) {
            return null;
        }

        $storagePath = 'info-corner/images/notice-preview.jpg';
        Storage::disk('public')->put($storagePath, File::get($source));

        return $storagePath;
    }
}
