<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\Location;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Vehicle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Location::insert([
            [
                'name' => 'Bandara Soekarno Hatta',
                'address' => 'Pajang, Kota Tangerang, Banten',
                'type' => 'Bandara',
                'city' => 'Jakarta'
            ], [
                'name' => 'Hotel Paragon',
                'address' => 'Jl. K.H. Wahid Hasyim, Kota Jakarta Pusat, DKI Jakarta',
                'type' => 'Hotel',
                'city' => 'Jakarta'
            ], [
                'name' => 'Bandara YIA',
                'address' => 'Area Kebun, Palihan, Kec. Temon, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta',
                'type' => 'Bandara',
                'city' => 'Yogyakarta',
            ]
        ]);

        Vehicle::insert([
            [
                'license_plate' => 'B 1234 BX',
                'seats' => 20,
                'status' => 'Tersedia', 
            ], [
                'license_plate' => 'B 2255 RD',
                'seats' => 22,
                'status' => 'Tersedia', 
            ], [
                'license_plate' => 'B 6565 VC',
                'seats' => 20,
                'status' => 'Tersedia', 
            ],  
        ]);

        Driver::insert([
            [
                'name' => 'Joko',
                'vehicle_id' => 1,
            ],
            [
                'name' => 'Sumiyem',
                'vehicle_id' => 2,
            ]
        ]);

        Schedule::insert([
            [
                'location_id' => 1,
                'vehicle_id' => 1,
                'price' => 200000,
                'departure_time' => '10:40:00',
                'arrival_time' => '13:30:00'
            ], [
                'location_id' => 2,
                'vehicle_id' => 2,
                'price' => 180000,
                'departure_time' => '10:40:00',
                'arrival_time' => '13:30:00'
            ], [
                'location_id' => 1,
                'vehicle_id' => 3,
                'price' => 150000,
                'departure_time' => '10:40:00',
                'arrival_time' => '13:30:00'
            ]
        ]);
    }
}
