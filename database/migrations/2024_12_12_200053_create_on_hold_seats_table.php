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
        Schema::create('on_hold_seats', function (Blueprint $table) {
            $table->id('on_hold_seat_id')->autoIncrement();
            $table->unsignedBigInteger('route_id');
            $table->json('seat_number');

            $table->foreign('route_id')->references('route_id')->on('location_vehicle');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('on_hold_seats');
    }
};
