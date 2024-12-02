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
                'name' => 'Hotel Arya Duta',
                'address' => 'Jl. Prajurit KKO Usman dan Harun No.44-48, Kota Jakarta Pusat, DKI Jakarta',
                'type' => 'Hotel',
                'city' => 'Jakarta'
            ], [
                'name' => 'Bandara YIA',
                'address' => 'Area Kebun, Palihan, Kec. Temon, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta',
                'type' => 'Bandara',
                'city' => 'Yogyakarta',
            ], [
                'name' => 'Bandar Udara Internasional Husein Sastranegara',
                'address' => 'Jl. Pajajaran Dalam, Husen Sastranegara, Kota Bandung, Jawa Barat',
                'type' => 'Bandara',
                'city' => 'Bandung',
            ], [
                'name' => 'Verona Palace Hotel',
                'address' => 'Jl. Surya Sumantri, Sukagalih, Kota Bandung, Jawa Barat ',
                'type' => 'Hotel',
                'city' => 'Bandung',
            ], [
                'name' => 'Bandara Internasional I Gusti Ngurah Rai',
                'address' => 'Jalan Raya Gusti Ngurah Rai, Kec. Kuta, Kabupaten Badung, Bali',
                'type' => 'Bandara',
                'city' => 'Bali',
            ], [
                'name' => 'Bandara Adisucipto',
                'address' => 'Jl. Adisucipto',
                'type' => 'Bandara',
                'city' => 'Yogyakarta',
            ], [
                'name' => 'Hotel Ambarukmo',
                'address' => 'Jl. Adisucipto',
                'type' => 'Hotel',
                'city' => 'Yogyakarta',
            ], [
                'name' => 'Platinum Adisucipto Hotel',
                'address' => 'Maguwoharjo, Kabupaten Sleman, Yogyakarta',
                'type' => 'Hotel',
                'city' => 'Yogyakarta',
            ], [
                'name' => 'Grand Diamond Hotel Yogyakarta',
                'address' => 'Jl. Laksda Adisucipto, Maguwoharjo, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
                'type' => 'Hotel',
                'city' => 'Yogyakarta',
            ], [
                'name' => 'Platinum Hotel Jimbaran Beach Bali',
                'address' => 'Jimbaran, Jl. Pantai Kedonganan, Kedonganan, Bali',
                'type' => 'Hotel',
                'city' => 'Bali',
            ], [
                'name' => 'Aryaduta Bali',
                'address' => 'Jl. Kartika Plaza, Lingkungan Segara, Kuta, Kabupaten Badung, Bali',
                'type' => 'Hotel',
                'city' => 'Bali',
            ], [
                'name' => 'Ibis Yogyakarta International Airport Kulon Progo',
                'address' => 'Jl. Wates - Purworejo , Seling, Kulon Progo, Daerah Istimewa Yogyakarta ',
                'type' => 'Hotel',
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
        // Jakarta
        [
            'location_id' => 1,  // Bandara Soekarno Hatta
            'vehicle_id' => 1,
            'price' => 200000,
            'departure_time' => '10:40:00',
            'arrival_time' => '13:30:00'
        ], [
            'location_id' => 2,  // Hotel Paragon
            'vehicle_id' => 2,
            'price' => 180000,
            'departure_time' => '10:40:00',
            'arrival_time' => '13:30:00'
        ], [
            'location_id' => 3,  // Hotel Arya Duta
            'vehicle_id' => 3,
            'price' => 150000,
            'departure_time' => '10:40:00',
            'arrival_time' => '13:30:00'
        ],

        // Yogyakarta (new entries)
        [
            'location_id' => 4,  // Bandara YIA
            'vehicle_id' => 1,
            'price' => 200000,
            'departure_time' => '11:00:00',
            'arrival_time' => '14:00:00'
        ], [
            'location_id' => 9,  // Platinum Adistujipto hotel
            'vehicle_id' => 2,
            'price' => 180000,
            'departure_time' => '12:00:00',
            'arrival_time' => '16:00:00'
        ], [
            'location_id' => 8,  //Bandara Adistujipto
            'vehicle_id' => 3,
            'price' => 150000,
            'departure_time' => '09:00:00',
            'arrival_time' => '11:00:00'
        ], [
            'location_id' => 10,  //Platinum Aditsujipto Hotel
            'vehicle_id' => 3,
            'price' => 200000,
            'departure_time' => '09:00:00',
            'arrival_time' => '11:00:00'
        ], [
            'location_id' => 13,  //Ibis Yogyakarta International Airport Kulon Progo
            'vehicle_id' => 3,
            'price' => 300000,
            'departure_time' => '09:00:00',
            'arrival_time' => '11:00:00'
        ],

        // Bandung (new entries)
        [
            'location_id' => 5,  // Bandar Udara Internasional Husein Sastranegara
            'vehicle_id' => 1,
            'price' => 200000,
            'departure_time' => '11:00:00',
            'arrival_time' => '14:00:00'
        ], [
            'location_id' => 6,  // Verona Palace Hotel
            'vehicle_id' => 2,
            'price' => 180000,
            'departure_time' => '12:00:00',
            'arrival_time' => '16:00:00'
        ],

        // Bali (new entries)
        [
            'location_id' => 7,  // Bandara Internasional I Gusti Ngurah Rai
            'vehicle_id' => 1,
            'price' => 200000,
            'departure_time' => '11:00:00',
            'arrival_time' => '14:00:00'
        ], [
            'location_id' => 11,  // Platinum Hotel Jimbaran Beach Bali
            'vehicle_id' => 2,
            'price' => 180000,
            'departure_time' => '12:00:00',
            'arrival_time' => '16:00:00'
        ], [
            'location_id' => 7,  // Bandara YIA
            'vehicle_id' => 3,
            'price' => 150000,
            'departure_time' => '09:00:00',
            'arrival_time' => '11:00:00'
        ], [
            'location_id' => 8,  // Ambarukmo
            'vehicle_id' => 1,
            'price' => 210000,
            'departure_time' => '10:00:00',
            'arrival_time' => '12:00:00'
        ]
    ]);
    }
}
