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
        Schema::create('trips', function (Blueprint $table) {
            $table->id('trip_id')->autoIncrement();
            $table->string('city');
            $table->string('origin');
            $table->date('selected_day');
            $table->unsignedBigInteger('booking_id');
            $table->unsignedBigInteger('route_id');
            $table->boolean('is_expired')->default(false);

            $table->foreign('route_id')->references('route_id')->on('location_vehicle');
            $table->foreign('booking_id')->references('booking_id')->on('bookings');     
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
