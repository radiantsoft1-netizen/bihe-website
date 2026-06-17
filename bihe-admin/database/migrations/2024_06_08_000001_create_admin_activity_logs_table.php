<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action', 80);
            $table->string('action_type', 40)->nullable();
            $table->text('description')->nullable();
            $table->string('resource', 120)->nullable();
            $table->string('resource_id', 36)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('browser', 80)->nullable();
            $table->string('device', 80)->nullable();
            $table->string('platform', 80)->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();

            $table->index(['action', 'created_at']);
            $table->index(['action_type', 'created_at']);
            $table->index(['resource', 'created_at']);
            $table->index('user_id');
        });

        if (Schema::hasTable('activity_logs')) {
            DB::table('activity_logs')
                ->orderBy('id')
                ->chunk(100, function ($rows): void {
                    $inserts = [];

                    foreach ($rows as $row) {
                        $inserts[] = [
                            'user_id' => $row->user_id,
                            'action' => $row->action,
                            'action_type' => self::inferActionType((string) $row->action),
                            'description' => $row->description,
                            'resource' => $row->subject,
                            'resource_id' => null,
                            'ip_address' => $row->ip_address,
                            'user_agent' => $row->user_agent,
                            'browser' => null,
                            'device' => null,
                            'platform' => null,
                            'metadata' => $row->metadata,
                            'created_at' => $row->created_at,
                            'updated_at' => null,
                        ];
                    }

                    if ($inserts !== []) {
                        DB::table('admin_activity_logs')->insert($inserts);
                    }
                });

            Schema::drop('activity_logs');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_activity_logs');
    }

    private static function inferActionType(string $action): ?string
    {
        if (in_array($action, ['login', 'logout', 'login_failed', 'login_blocked', 'captcha_failed'], true)) {
            return 'auth';
        }

        if (str_contains($action, 'password') || str_contains($action, 'session')) {
            return 'security';
        }

        if (preg_match('/_(created|updated|deleted)$/', $action)) {
            return 'crud';
        }

        return null;
    }
};
