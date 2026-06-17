<?php

namespace Database\Seeders;

use App\Enums\GalleryMediaType;
use App\Models\CircularNotice;
use App\Models\Announcement;
use App\Models\GoverningBody;
use App\Models\GalleryAlbum;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use App\Models\HeroBanner;
use App\Models\NewsCategory;
use App\Models\NewsEvent;
use App\Models\Program;
use App\Models\RecruitingPartner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        Announcement::updateOrCreate(
            ['id' => 1],
            [
                'message' => 'Bapuji Institute of Hi-Tech Education (BIHE) Established in 2000. offers UG Programs. Known for its academic Excellence and Extensive campus, focusing on student placement, leadership and ethical values with AICTE approval and Davangere University affiliation.',
                'link' => null,
                'active' => true,
            ]
        );

        Program::updateOrCreate(
            ['id' => 1],
            [
                'level' => 'UG',
                'program_name' => 'B.Com',
                'duration' => '3 Years',
                'intake' => '180',
                'department' => 'b-com',
                'sort_order' => 0,
            ]
        );

        $categories = [
            ['name' => 'Academics', 'slug' => 'academics', 'sort_order' => 0],
            ['name' => 'Campus Life', 'slug' => 'campus-life', 'sort_order' => 1],
            ['name' => 'Events', 'slug' => 'events', 'sort_order' => 2],
            ['name' => 'Student Life', 'slug' => 'student-life', 'sort_order' => 3],
        ];

        foreach ($categories as $index => $category) {
            NewsCategory::updateOrCreate(
                ['id' => $index + 1],
                array_merge($category, ['is_active' => true])
            );
        }

        $newsItems = [
            [
                'title' => 'Academic Excellence & Intellectual Development',
                'summary' => 'Stay updated with campus programs, celebrations, and student achievements.',
                'body' => 'BIHE continues to strengthen academic rigor through seminars, workshops, and faculty-led mentoring that help students build confidence and intellectual depth.',
                'event_date' => '2026-03-01',
                'category_id' => 1,
                'is_featured' => true,
                'show_in_ticker' => true,
            ],
            [
                'title' => 'Annual Day & Cultural Celebrations',
                'summary' => 'Annual Day brings together performances, awards, and addresses.',
                'body' => 'The Annual Day celebration showcases student talent, institutional achievements, and cultural performances that reflect the vibrant spirit of BIHE.',
                'event_date' => '2026-02-01',
                'category_id' => 3,
                'is_featured' => true,
                'show_in_ticker' => true,
            ],
            [
                'title' => 'National Festival & Community Outreach',
                'summary' => 'Community outreach and national festival celebrations at BIHE.',
                'body' => 'Students and faculty participate in national festival observances and outreach initiatives that connect the campus with the wider Davangere community.',
                'event_date' => '2026-01-01',
                'category_id' => 2,
                'is_featured' => false,
                'show_in_ticker' => true,
            ],
            [
                'title' => 'Student Leadership & Orientation Program',
                'summary' => 'Orientation programs for new student leaders at BIHE Davangere.',
                'body' => 'Leadership orientation sessions prepare student representatives to support peers, coordinate activities, and uphold institutional values throughout the academic year.',
                'event_date' => '2025-12-01',
                'category_id' => 4,
                'is_featured' => false,
                'show_in_ticker' => false,
            ],
        ];

        foreach ($newsItems as $index => $item) {
            $newsEvent = NewsEvent::updateOrCreate(
                ['id' => $index + 1],
                [
                    'news_category_id' => $item['category_id'],
                    'title' => $item['title'],
                    'slug' => Str::slug($item['title']),
                    'summary' => $item['summary'],
                    'body' => $item['body'],
                    'event_date' => $item['event_date'],
                    'published' => true,
                    'is_featured' => $item['is_featured'],
                    'show_in_ticker' => $item['show_in_ticker'],
                    'sort_order' => $index,
                ]
            );

            if (blank($newsEvent->seo_title)) {
                app(\App\Services\NewsSeoService::class)->apply($newsEvent);
                $newsEvent->save();
            }
        }

        $galleryCategories = [
            ['name' => 'Campus', 'slug' => 'campus', 'sort_order' => 0],
            ['name' => 'Academics', 'slug' => 'academics', 'sort_order' => 1],
            ['name' => 'Events', 'slug' => 'events', 'sort_order' => 2],
            ['name' => 'Facilities', 'slug' => 'facilities', 'sort_order' => 3],
        ];

        foreach ($galleryCategories as $index => $category) {
            GalleryCategory::updateOrCreate(
                ['slug' => $category['slug']],
                array_merge($category, ['is_active' => true])
            );
        }

        if (GalleryAlbum::count() === 0) {
            $galleryAlbums = [
                ['title' => 'BIHE Campus Overview', 'category' => 'campus', 'description' => 'Main campus overview at BIHE Davangere.', 'featured' => true],
                ['title' => 'Student Life at BIHE', 'category' => 'campus', 'description' => 'Students on the BIHE campus.', 'featured' => true],
                ['title' => 'Library Reading Hall', 'category' => 'facilities', 'description' => 'Central library reading hall.', 'featured' => true],
                ['title' => 'Computer Laboratories', 'category' => 'academics', 'description' => 'BCA computer lab facilities.', 'featured' => true],
                ['title' => 'Annual Day Celebrations', 'category' => 'events', 'description' => 'Annual Day in the auditorium.', 'featured' => true],
                ['title' => 'Mega Placement Drive 2025', 'category' => 'events', 'description' => 'Placement drive inaugural ceremony.', 'featured' => false],
            ];

            foreach ($galleryAlbums as $index => $albumData) {
                $category = GalleryCategory::where('slug', $albumData['category'])->first();

                GalleryAlbum::create([
                    'gallery_category_id' => $category?->id,
                    'title' => $albumData['title'],
                    'slug' => Str::slug($albumData['title']),
                    'description' => $albumData['description'],
                    'published' => true,
                    'is_featured' => $albumData['featured'],
                    'sort_order' => $index,
                ]);
            }
        }

        if (GalleryMedia::count() === 0) {
            $album = GalleryAlbum::orderBy('sort_order')->first();

            if ($album) {
                $featuredImage = GalleryMedia::create([
                    'gallery_album_id' => $album->id,
                    'type' => GalleryMediaType::Image,
                    'title' => 'Campus entrance',
                    'image_path' => null,
                    'sort_order' => 0,
                ]);

                GalleryMedia::create([
                    'gallery_album_id' => $album->id,
                    'type' => GalleryMediaType::Youtube,
                    'title' => 'BIHE campus tour',
                    'youtube_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                    'youtube_id' => 'ysz5S6PUM-U',
                    'sort_order' => 1,
                ]);

                $album->update(['featured_media_id' => $featuredImage->id]);
            }
        }

        $heroSlides = [
            [
                'eyebrow' => 'Your journey to success starts here',
                'title' => 'Bapuji Institute of Hi-Tech Education',
                'subtitle' => 'BCA & B.Com programs with industry-ready learning, expert faculty, and a vibrant campus in Davangere.',
            ],
            [
                'eyebrow' => 'Excellence in education & innovation',
                'title' => 'Building brighter futures together',
                'subtitle' => 'Hands-on labs, placement support, and a community focused on real-world skills and growth.',
            ],
            [
                'eyebrow' => 'AICTE approved · Davangere University affiliated',
                'title' => 'Quality education since 2000',
                'subtitle' => 'Trusted programs backed by accreditation, modern infrastructure, and decades of academic excellence.',
            ],
        ];

        foreach ($heroSlides as $index => $slide) {
            HeroBanner::updateOrCreate(
                ['id' => $index + 1],
                array_merge($slide, ['active' => true, 'sort_order' => $index])
            );
        }

        $recruiters = [
            'IonIdea',
            'Tech Mahindra',
            'Mahindra',
            'Flipkart',
            'Amazon',
            'Larsen & Toubro',
            'Honeywell',
            'Wipro',
            'TCS',
            'Deloitte',
            'Capgemini',
            'Cognizant',
        ];

        foreach ($recruiters as $index => $name) {
            $logoPath = $this->seedRecruiterLogo($index);

            RecruitingPartner::updateOrCreate(
                ['id' => $index + 1],
                ['name' => $name, 'active' => true, 'sort_order' => $index, 'logo_path' => $logoPath]
            );
        }

        $governingBodies = [
            [
                'slug' => 'institutional-governance',
                'name' => 'Dr Shamanur Shivashankarappa',
                'title_line' => 'Hon. Secretary & MLA, Bapuji Educational Association',
                'qualifications' => 'Member, BIHE Governing Body',
                'badge' => 'Message from the Hon. Secretary & MLA',
                'title_lead' => 'Ordinary things done in an extraordinary way',
                'title_accent' => 'make people Great',
                'paragraphs' => [
                    ['text' => 'As education has become the key to promote participation in today\'s global knowledge economy, more and more people are seeking innovations using digital technologies that would facilitate a paradigm shift in education process and outcomes. To this end, educated people need to create a dynamic academic environment that will provide its learners the opportunities to explore the potentials of Information and Communications Technology (ICT) and acquire the core competencies required in the 21st century.', 'emphasis' => false],
                    ['text' => 'We at Bapuji Educational Association, believe that education is a serious thing for you and for us. On our part, we are committed to quality in every aspect of the process of imparting education. Our curriculum, teaching methods and infrastructure are benchmarked on par with the best Educational Institutes in India. Continuous improvements are being made to take the Association to be one of the premier associations in the country. This is reflected in the quality of placements our students are getting.', 'emphasis' => true],
                    ['text' => 'We seek to develop you to be successful education leaders of tomorrow. But we need your commitment to learn, to imbibe and contribute to the process. We believe that achievement is high when each member of the association does everything they can, going above and beyond to do so. We believe that your success and the achievements of the Institute synergize in an environment of mutual acceptance, support goodwill and working together.', 'emphasis' => false],
                ],
                'image_alt' => 'Dr Shamanur Shivashankarappa, Hon. Secretary & MLA',
                'reverse_layout' => false,
                'photo_file' => 'governing-bodies-hon-secretary.png',
            ],
            [
                'slug' => 'educational-association',
                'name' => 'Sri S S Mallikarjuna',
                'title_line' => 'Joint Secretary & Minister, Bapuji Educational Association',
                'qualifications' => 'Member, BIHE Governing Body',
                'badge' => 'Message from the Joint Secretary & Minister',
                'title_lead' => 'The Computer Technology could be a very positive step towards',
                'title_accent' => 'education, organization and participation in a meaning society',
                'paragraphs' => [
                    ['text' => 'Providing the knowledge and framework to meet the diverse challenges is the purpose of our BCA program. The program has great relevance today when "competition" is the "buzzword" of the day.', 'emphasis' => false],
                    ['text' => 'Just as computer technology and the Internet created whole new industries and extraordinary benefits for people that extend into almost every realm of human endeavour from education to transportation to medicine, genetics will undoubtedly benefit people, everywhere in ways we can\'t even imagine but know will surely occur.', 'emphasis' => true],
                ],
                'image_alt' => 'Sri S S Mallikarjuna, Joint Secretary & Minister',
                'reverse_layout' => true,
                'photo_file' => 'governing-bodies-joint-secretary.png',
            ],
            [
                'slug' => 'chairman-message',
                'name' => 'Dr Athani S Veeranna',
                'title_line' => 'Chairman, BIHE Governing Body',
                'qualifications' => 'President, Bapuji Educational Association',
                'badge' => 'Message from the Chairman',
                'title_lead' => 'Excellence is not a names,',
                'title_accent' => 'it is an end itself',
                'paragraphs' => [
                    ['text' => 'In today\'s society every young man and woman dreams of becoming an Information Technology Professional. With about 200 institutes offering BCA or similar programs, one often find themselves in a state of confusion while deciding which institution to choose. People look at Information Technology colleges from multiple perspectives.', 'emphasis' => false],
                    ['text' => 'With the environment getting increasingly more turbulent every moment in BIHE, learning to learn and adapting to change have become critical elements for success. Experienced IT professionals know that Education is not about earning another degree or a diploma. It is about broadening the scope of thinking to identify possible challenges and understanding of various issues surrounding any given situation. Students are not only made conscious of these but are also helped to build these abilities in them. Last but not least, a sense of entrepreneurship is also developed in the students of BIHE as it gives the courage to plunge into the uncertain future of risks and opportunities.', 'emphasis' => true],
                    ['text' => 'Whatever may be the individual\'s goals and aspirations, the bottom line always is, good education. Good education in Institute would mean a system of education that effectively and pragmatically combines theory and practice in order to ensure both rigor as well as relevance, in all of what it accomplished inside the classrooms.', 'emphasis' => false],
                    ['text' => 'The selection process is transparent, fair and ensures that outstanding young people from among the brightest are selected. The students are provided with a good grounding in the socio -economic-political realities of India and outside world to make them worthy and productive global citizens.', 'emphasis' => false],
                ],
                'image_alt' => 'Dr Athani S Veeranna, Chairman of BIHE Governing Body',
                'reverse_layout' => false,
                'photo_file' => 'governing-bodies-chairman.png',
            ],
        ];

        foreach ($governingBodies as $index => $member) {
            $photoFile = $member['photo_file'];
            unset($member['photo_file']);

            GoverningBody::updateOrCreate(
                ['slug' => $member['slug']],
                array_merge($member, [
                    'published' => true,
                    'sort_order' => $index,
                    'photo_path' => $this->seedGoverningBodyPhoto($photoFile, $index),
                ])
            );
        }

        $this->seedCircularNotices();
    }

    protected function seedCircularNotices(): void
    {
        $notices = [
            [
                'slug' => 'admission-circular',
                'title' => 'Circular',
                'excerpt' => 'Official institutional circular for students, faculty, and affiliated bodies regarding administrative directions for the notified academic period.',
                'body' => "This circular is issued by Bapuji Institute of Hi-Tech Education for students, faculty, and affiliated bodies. It contains official administrative directions and institutional communications that must be followed for the notified academic period.\n\nStudents are advised to read the full notice carefully and comply with the instructions mentioned. For clarifications, contact the college office during working hours.",
                'published_date' => '2025-05-19',
                'image_alt' => 'Official institutional circular published by Bapuji Institute of Hi-Tech Education.',
                'sort_order' => 0,
            ],
            [
                'slug' => 'exam-notice',
                'title' => 'IA Instructions',
                'excerpt' => 'Internal assessment instructions and guidelines for BCA and B.Com students, including reporting requirements and conduct during examinations.',
                'body' => "Internal assessment instructions and guidelines for BCA and B.Com students at Bapuji Institute of Hi-Tech Education. This notice outlines the rules, reporting requirements, and conduct expected during internal assessment examinations.\n\nStudents must report to the examination hall on time with the required stationery and identity documents. Mobile phones and unauthorized materials are not permitted inside the assessment venue.",
                'published_date' => '2025-12-04',
                'image_alt' => 'Internal assessment instructions and guidelines for students at Bapuji Institute of Hi-Tech Education.',
                'sort_order' => 1,
            ],
            [
                'slug' => 'holiday-notice',
                'title' => 'IA Time-Table',
                'subtitle' => '1st & 2nd Internal Assessment — 2024–25',
                'excerpt' => 'Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25.',
                'body' => "Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25 at Bapuji Institute of Hi-Tech Education.\n\nStudents should verify programme-specific dates, session timings, and subject schedules shown in the notice. Any change communicated by the examination section will supersede earlier timings.",
                'published_date' => '2024-11-18',
                'image_alt' => 'IA time-table for 1st and 2nd internal assessment 2024–25.',
                'sort_order' => 2,
            ],
        ];

        foreach ($notices as $notice) {
            CircularNotice::updateOrCreate(
                ['slug' => $notice['slug']],
                array_merge($notice, [
                    'published' => true,
                    'image_path' => $this->seedCircularNoticeImage(),
                ])
            );
        }
    }

    protected function seedCircularNoticeImage(): ?string
    {
        $source = dirname(base_path()).'/public/images/circulars/notice-preview.jpg';

        if (! File::exists($source)) {
            return null;
        }

        $storagePath = 'circular-notices/images/notice-preview.jpg';
        Storage::disk('public')->put($storagePath, File::get($source));

        return $storagePath;
    }

    protected function seedRecruiterLogo(int $index): ?string
    {
        $source = dirname(base_path()).'/public/images/recruiter-'.($index + 1).'.webp';

        if (! File::exists($source)) {
            return null;
        }

        $storagePath = 'recruiting-partners/recruiter-'.($index + 1).'.webp';
        Storage::disk('public')->put($storagePath, File::get($source));

        return $storagePath;
    }

    protected function seedGoverningBodyPhoto(string $filename, int $index): ?string
    {
        $source = dirname(base_path()).'/public/images/'.$filename;

        if (! File::exists($source)) {
            return null;
        }

        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $storagePath = 'governing-bodies/governing-body-'.($index + 1).'.'.$extension;
        Storage::disk('public')->put($storagePath, File::get($source));

        return $storagePath;
    }
}
