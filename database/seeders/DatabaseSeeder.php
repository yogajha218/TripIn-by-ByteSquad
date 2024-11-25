<?php

namespace Database\Seeders;

use App\Models\Location;
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
                'type' => 'Bandara'
            ], [
                'name' => 'Hotel Paragon',
                'address' => 'Jl. K.H. Wahid Hasyim, Kota Jakarta Pusat, DKI Jakarta',
                'type' => 'Hotel'
            ], [
                'name' => 'Bandara YIA',
                'address' => 'Area Kebun, Palihan, Kec. Temon, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta',
                'type' => 'Bandara'
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
    }
}
