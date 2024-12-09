<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id('log_id')->autoIncrement();
            $table->unsignedBigInteger('trip_id');
            $table->string('departure');
            $table->string('arrival');
            $table->date('departure_date');
            $table->boolean('delete_seat')->default(false);

            $table->foreign('trip_id')->references('trip_id')->on('trips')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
