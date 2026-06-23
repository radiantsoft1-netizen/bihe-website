<?php

namespace Database\Seeders;

use App\Models\AlumniEvent;
use App\Models\AlumniProfile;
use Illuminate\Database\Seeder;

class AlumniSeeder extends Seeder
{
    public function run(): void
    {
        $profiles = [
            [
                'slug' => 'priya-sharma',
                'name' => 'Priya Sharma',
                'batch_year' => 2018,
                'passout_year' => 2018,
                'program' => 'BCA',
                'current_role' => 'Software Engineer',
                'current_employer' => 'Infosys',
                'current_location' => 'Bengaluru',
                'bio' => "Priya graduated from BIHE with a BCA degree and built a strong foundation in application development.\n\nShe credits the faculty mentorship and practical lab sessions for preparing her to succeed in the IT industry.",
                'testimonial' => 'BIHE gave me the confidence and skills to launch my career in software development.',
                'is_featured' => true,
                'published' => true,
                'approval_status' => 'approved',
                'source' => 'admin',
                'sort_order' => 0,
            ],
            [
                'slug' => 'rahul-patil',
                'name' => 'Rahul Patil',
                'batch_year' => 2019,
                'passout_year' => 2019,
                'program' => 'B.Com',
                'current_role' => 'Accounts Manager',
                'current_employer' => 'HDFC Bank',
                'current_location' => 'Davangere',
                'bio' => "Rahul completed his B.Com at BIHE and pursued professional certification in banking and finance.\n\nHe now leads a regional accounts team and regularly mentors current students on career planning.",
                'testimonial' => 'The commerce faculty at BIHE shaped my analytical thinking and professional discipline.',
                'is_featured' => true,
                'published' => true,
                'approval_status' => 'approved',
                'source' => 'admin',
                'sort_order' => 1,
            ],
            [
                'slug' => 'ananya-reddy',
                'name' => 'Ananya Reddy',
                'batch_year' => 2020,
                'passout_year' => 2020,
                'program' => 'BCA',
                'current_role' => 'Product Analyst',
                'current_employer' => 'Wipro',
                'current_location' => 'Hyderabad',
                'bio' => "Ananya was an active participant in campus placement activities and alumni networking sessions.\n\nShe transitioned into product analytics after gaining experience in business intelligence roles.",
                'testimonial' => null,
                'is_featured' => false,
                'published' => true,
                'approval_status' => 'approved',
                'source' => 'admin',
                'sort_order' => 2,
            ],
            [
                'slug' => 'kiran-kumar',
                'name' => 'Kiran Kumar',
                'batch_year' => 2017,
                'passout_year' => 2017,
                'program' => 'B.Com',
                'current_role' => 'Entrepreneur',
                'current_employer' => 'Kiran Retail Solutions',
                'current_location' => 'Davangere',
                'bio' => "Kiran founded a retail solutions startup after working in supply chain management.\n\nHe remains connected with BIHE through guest lectures and internship opportunities for students.",
                'testimonial' => 'BIHE encouraged me to think beyond textbooks and explore real business challenges.',
                'is_featured' => false,
                'published' => true,
                'approval_status' => 'approved',
                'source' => 'admin',
                'sort_order' => 3,
            ],
        ];

        foreach ($profiles as $profile) {
            AlumniProfile::query()->updateOrCreate(
                ['slug' => $profile['slug']],
                $profile,
            );
        }

        $events = [
            [
                'slug' => 'annual-alumni-meet-2025',
                'title' => 'Annual Alumni Meet 2025',
                'summary' => 'Reconnect with classmates, faculty, and the BIHE campus community.',
                'body' => "The Annual Alumni Meet 2025 brings together graduates from across batches for networking, campus tours, and interactive sessions with current students.\n\nAlumni are invited to share career experiences and contribute to mentorship initiatives for the next generation of BIHE graduates.",
                'event_date' => '2025-12-20',
                'venue' => 'BIHE Campus, Davangere',
                'published' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'alumni-career-guidance-2025',
                'title' => 'Alumni Career Guidance Session 2025',
                'summary' => 'Industry alumni share insights on placements, higher studies, and career growth.',
                'body' => "Senior alumni from IT, banking, and entrepreneurship backgrounds will conduct panel discussions and one-on-one guidance for final-year students.\n\nThe session covers resume building, interview preparation, and long-term career planning.",
                'event_date' => '2025-08-15',
                'venue' => 'BIHE Auditorium',
                'published' => true,
                'sort_order' => 1,
            ],
        ];

        foreach ($events as $event) {
            AlumniEvent::query()->updateOrCreate(
                ['slug' => $event['slug']],
                $event,
            );
        }
    }
}
