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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id('vehicle_id')->autoIncrement();
            $table->string('license_plate');
            $table->integer('seat');
            $table->string('status');
            $table->unsignedBigInteger('booking_id');

            $table->timestamps();
            $table->foreign('booking_id')->references('booking_id')->on('bookings')->onDelete('cascade');            

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
