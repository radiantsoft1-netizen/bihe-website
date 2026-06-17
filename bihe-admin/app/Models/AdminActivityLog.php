<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminActivityLog extends Model
{
    protected $table = 'admin_activity_logs';

    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'action',
        'action_type',
        'description',
        'resource',
        'resource_id',
        'ip_address',
        'user_agent',
        'browser',
        'device',
        'platform',
        'metadata',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function actionLabel(): string
    {
        return str_replace('_', ' ', $this->action);
    }

    public function deviceSummary(): string
    {
        $parts = array_filter([$this->browser, $this->platform, $this->device]);

        return $parts !== [] ? implode(' · ', $parts) : '—';
    }
}
