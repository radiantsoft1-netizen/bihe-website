<?php

namespace App\Services;

use HTMLPurifier;
use HTMLPurifier_Config;

class RichHtmlSanitizer
{
    private static ?HTMLPurifier $purifier = null;

    public function clean(?string $html): string
    {
        if ($html === null) {
            return '';
        }

        $html = trim($html);

        if ($html === '') {
            return '';
        }

        return $this->purifier()->purify($html);
    }

    /**
     * @param  array<string, mixed>  $data
     * @param  list<string>  $fields
     * @return array<string, mixed>
     */
    public function cleanFields(array $data, array $fields): array
    {
        foreach ($fields as $field) {
            if (array_key_exists($field, $data) && is_string($data[$field])) {
                $data[$field] = $this->clean($data[$field]);
            }
        }

        return $data;
    }

    /**
     * @param  list<array{text?: string, emphasis?: bool}>  $paragraphs
     * @return list<array{text: string, emphasis: bool}>
     */
    public function cleanParagraphs(array $paragraphs): array
    {
        return collect($paragraphs)
            ->map(function (array $paragraph): array {
                $text = $this->clean((string) ($paragraph['text'] ?? ''));

                return [
                    'text' => $text,
                    'emphasis' => (bool) ($paragraph['emphasis'] ?? false),
                ];
            })
            ->filter(fn (array $paragraph) => $paragraph['text'] !== '')
            ->values()
            ->all();
    }

    /**
     * @param  list<string>  $paragraphs
     * @return list<string>
     */
    public function cleanParagraphList(array $paragraphs): array
    {
        return collect($paragraphs)
            ->map(fn ($paragraph) => $this->clean((string) $paragraph))
            ->filter(fn (string $paragraph) => $paragraph !== '')
            ->values()
            ->all();
    }

    /**
     * @param  array<string, mixed>  $content
     * @return array<string, mixed>
     */
    public function cleanContentArray(array $content): array
    {
        foreach ($content as $key => $value) {
            if ($key === 'paragraphs' && is_array($value)) {
                $content[$key] = $this->cleanParagraphList(
                    collect($value)
                        ->map(fn ($paragraph) => is_string($paragraph) ? $paragraph : '')
                        ->all()
                );

                continue;
            }

            if (is_string($value) && in_array($key, ['lead', 'intro', 'body', 'html', 'summary'], true)) {
                $content[$key] = $this->clean($value);

                continue;
            }

            if (is_array($value)) {
                $content[$key] = $this->cleanContentArray($value);
            }
        }

        return $content;
    }

    private function purifier(): HTMLPurifier
    {
        if (self::$purifier !== null) {
            return self::$purifier;
        }

        $cachePath = storage_path('app/htmlpurifier');

        if (! is_dir($cachePath)) {
            mkdir($cachePath, 0755, true);
        }

        $config = HTMLPurifier_Config::createDefault();
        $config->set('HTML.Allowed', 'h1,h2,h3,h4,h5,h6,p,br,strong,b,em,i,u,s,strike,sub,sup,ul,ol,li,a[href|title|target|rel],blockquote,hr,table,thead,tbody,tfoot,tr,th,td[colspan|rowspan],img[src|alt|width|height|class]');
        $config->set('HTML.TargetBlank', true);
        $config->set('Attr.AllowedFrameTargets', ['_blank']);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);
        $config->set('URI.DisableExternalResources', true);
        $config->set('URI.DisableResources', false);
        $config->set('AutoFormat.AutoParagraph', true);
        $config->set('AutoFormat.RemoveEmpty', true);
        $config->set('Cache.SerializerPath', $cachePath);

        self::$purifier = new HTMLPurifier($config);

        return self::$purifier;
    }
}
