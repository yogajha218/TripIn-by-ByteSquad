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
            $table->string('origin');
            $table->timestamp('departure_time');
            $table->timestamp('arrival_time')->nullable();
            $table->decimal('price', 10, 2);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('booking_id');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('vehicle_id');

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');            
            $table->foreign('booking_id')->references('booking_id')->on('bookings')->onDelete('cascade');            
            $table->foreign('location_id')->references('location_id')->on('locations')->onDelete('cascade');            
            $table->foreign('vehicle_id')->references('vehicle_id')->on('vehicles')->onDelete('cascade');            
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
