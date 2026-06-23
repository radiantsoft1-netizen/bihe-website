<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->index(['published', 'event_date'], 'news_events_published_event_date_index');
            $table->index(['published', 'show_in_ticker'], 'news_events_published_ticker_index');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->index(['published', 'sort_order'], 'documents_published_sort_index');
        });
    }

    public function down(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->dropIndex('news_events_published_event_date_index');
            $table->dropIndex('news_events_published_ticker_index');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->dropIndex('documents_published_sort_index');
        });
    }
};
