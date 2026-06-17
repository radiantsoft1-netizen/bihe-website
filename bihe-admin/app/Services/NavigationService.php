<?php

namespace App\Services;

use App\Models\InfoCornerCategory;
use App\Models\MenuItem;

class NavigationService
{
    public function __construct(
        private ProspectusSettingService $prospectus,
    ) {
    }

    /** @var list<array{label: string, href: string, description: string|null, openInNewTab: bool}> */
    private const INFO_CORNER_DEDICATED_HEADER_CHILDREN = [
        [
            'label' => 'RTI Details',
            'href' => '/info-corner/rti-details',
            'description' => 'Right to Information Act details, public information officers, and disclosure procedures at BIHE.',
            'openInNewTab' => false,
        ],
        [
            'label' => 'Admission procedure and facilities provided to International Students.',
            'href' => '/info-corner/international-students-admission',
            'description' => 'Admission guidelines, eligibility, and campus facilities available for international students at BIHE.',
            'openInNewTab' => false,
        ],
    ];

    /** @var list<array{label: string, href: string, openInNewTab: bool}> */
    private const INFO_CORNER_DEDICATED_FOOTER_LINKS = [
        [
            'label' => 'RTI Details',
            'href' => '/info-corner/rti-details',
            'openInNewTab' => false,
        ],
        [
            'label' => 'Admission procedure and facilities provided to International Students.',
            'href' => '/info-corner/international-students-admission',
            'openInNewTab' => false,
        ],
    ];
    /** @return array{header: list<array<string, mixed>>, footer: list<array<string, mixed>>} */
    public function publicNavigation(): array
    {
        return [
            'header' => $this->buildHeaderMenu(),
            'footer' => $this->buildFooterMenu(),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function buildHeaderMenu(): array
    {
        $parents = MenuItem::query()
            ->forMenu('header')
            ->visible()
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->with(['children' => fn ($query) => $query->visible()->orderBy('sort_order')->orderBy('id')])
            ->get();

        return $parents->map(function (MenuItem $item) {
            $children = $this->isInfoCornerParent($item)
                ? $this->infoCornerCategoryChildren()
                : $item->children
                    ->reject(fn (MenuItem $child) => $this->isProspectusLabel($child->label))
                    ->map(fn (MenuItem $child) => [
                        'label' => $child->label,
                        'href' => $child->href ?? '/',
                        'description' => $child->description,
                        'openInNewTab' => $child->open_in_new_tab,
                    ])->values()->all();

            return [
                'label' => $item->label,
                'href' => $item->href ?? '/',
                'openInNewTab' => $item->open_in_new_tab,
                'children' => $children,
            ];
        })->values()->all();
    }

    /** @return list<array<string, mixed>> */
    private function buildFooterMenu(): array
    {
        $columns = MenuItem::query()
            ->forMenu('footer')
            ->visible()
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->with(['children' => fn ($query) => $query->visible()->orderBy('sort_order')->orderBy('id')])
            ->get();

        return $columns->map(function (MenuItem $column) {
            $links = $this->isInfoCornerFooterColumn($column)
                ? $this->infoCornerCategoryFooterLinks()
                : $column->children->map(fn (MenuItem $link) => $this->mapFooterLink($link))->values()->all();

            return [
                'title' => $column->label,
                'links' => $links,
            ];
        })->values()->all();
    }

    /** @return array{label: string, href: string, openInNewTab: bool} */
    private function mapFooterLink(MenuItem $link): array
    {
        if ($this->isProspectusLabel($link->label)) {
            $payload = $this->prospectus->publicPayload();
            if ($payload) {
                return [
                    'label' => $payload['label'],
                    'href' => $payload['pdfUrl'],
                    'openInNewTab' => true,
                ];
            }
        }

        return [
            'label' => $link->label,
            'href' => $link->href ?? '/',
            'openInNewTab' => $link->open_in_new_tab,
        ];
    }

    private function isProspectusLabel(string $label): bool
    {
        return str_contains(strtolower($label), 'prospectus');
    }

    private function isInfoCornerParent(MenuItem $item): bool
    {
        $label = strtolower($item->label);
        $href = strtolower($item->href ?? '');

        return str_contains($label, 'info') && str_contains($href, 'info-corner');
    }

    private function isInfoCornerFooterColumn(MenuItem $column): bool
    {
        return str_contains(strtolower($column->label), 'information corner');
    }

    /** @return list<array<string, mixed>> */
    private function infoCornerCategoryChildren(): array
    {
        $categories = InfoCornerCategory::published()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (InfoCornerCategory $category) => [
                'label' => $category->name,
                'href' => '/info-corner/'.$category->slug,
                'description' => $category->description,
                'openInNewTab' => false,
            ])
            ->values()
            ->all();

        return array_merge(
            [self::INFO_CORNER_DEDICATED_HEADER_CHILDREN[0]],
            $categories,
            [self::INFO_CORNER_DEDICATED_HEADER_CHILDREN[1]],
        );
    }

    /** @return list<array<string, mixed>> */
    private function infoCornerCategoryFooterLinks(): array
    {
        $categories = InfoCornerCategory::published()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (InfoCornerCategory $category) => [
                'label' => $category->name,
                'href' => '/info-corner/'.$category->slug,
                'openInNewTab' => false,
            ])
            ->values()
            ->all();

        return array_merge(
            [self::INFO_CORNER_DEDICATED_FOOTER_LINKS[0]],
            $categories,
            [self::INFO_CORNER_DEDICATED_FOOTER_LINKS[1]],
        );
    }
}
