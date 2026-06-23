<?php

namespace Database\Seeders;

use App\Models\PlacementDrive;
use Illuminate\Database\Seeder;

class PlacementDriveSeeder extends Seeder
{
    public function run(): void
    {
        $introParagraphs = [
            'Date: 26th September 2025',
            'Theme: "Campus to Corporate – Batch 1"',
            'Venue: BIHE Campus, Davangere',
            'Bapuji Institute of Hi-Tech Education, Davangere, organized a grand Mega Placement Drive 2025 under the banner "Campus to Corporate – Batch 1" on 26th September 2025. The event was designed to provide students of various disciplines with opportunities to connect directly with leading companies and step confidently into the corporate world.',
            'The Mega Placement Drive 2025 was open to students from multiple streams, including BCA, B.Com, BBA, B.Sc., and MBA. The main objective of the event was to bridge the gap between academic learning and the demands of the modern workplace, helping students gain exposure and confidence in real-world recruitment processes.',
            'A dedicated registration counter was arranged for each course, ensuring a smooth and organized registration process. Students from all departments actively participated, representing their respective courses with enthusiasm and professionalism. A beautifully designed welcome board at the entrance greeted all the participants, company representatives, and guests, setting a positive tone for the day.',
        ];

        $section2Paragraphs = [
            'The inaugural function concluded with a vote of thanks from the Placement Cell, acknowledging the contributions of all departments and coordinators. The Mega Placement Drive 2025 attracted over 500+ students from various colleges across Davangere, Shivamogga, Haveri, Ranebennur, and Chitradurga districts and taluks.',
            'A total of 13 companies, comprising both IT and Non-IT sectors, took part in the recruitment process. Each company conducted pre-placement talks, aptitude assessments, group discussions, and personal interviews throughout the day.',
            'Several companies offered on-the-spot offer letters to selected candidates, marking a significant achievement for the institution.',
        ];

        PlacementDrive::query()->updateOrCreate(
            ['slug' => 'mega-placement-drive-2025'],
            [
                'title' => 'Mega Placement Drive 2025',
                'eyebrow' => 'Campus to Corporate · Batch 1',
                'description' => '26th September 2025 · BIHE Campus, Davangere',
                'hero_lead' => "Campus to Corporate – Batch 1: BIHE's Mega Placement Drive 2025 connecting students with leading recruiters.",
                'event_date' => '2025-09-26',
                'date_label' => '26 SEP',
                'year_label' => '2025',
                'intro_body' => implode("\n\n", $introParagraphs),
                'section2_title' => 'HR Interview Process',
                'section2_body' => implode("\n\n", $section2Paragraphs),
                'gallery_images' => [],
                'published' => true,
                'sort_order' => 0,
            ]
        );
    }
}
