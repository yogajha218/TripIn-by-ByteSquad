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
        Schema::create('location_vehicle', function (Blueprint $table) {
            $table->id('route_id')->autoIncrement();
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('vehicle_id');
            $table->decimal('price', 10, 2);
            $table->time('departure_time')->nullable();
            $table->time('arrival_time')->nullable();

            $table->foreign('location_id')->references('location_id')->on('locations')->onDelete('cascade');            
            $table->foreign('vehicle_id')->references('vehicle_id')->on('vehicles')->onDelete('cascade');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_vehicle');
    }
};
