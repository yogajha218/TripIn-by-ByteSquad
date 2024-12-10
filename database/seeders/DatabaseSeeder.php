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
            [ //ID 1
                'license_plate' => 'B 1234 BX',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 2
                'license_plate' => 'B 2255 RD',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 3
                'license_plate' => 'B 6565 VC',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 4
                'license_plate' => 'AB 7643 AO',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 5
                'license_plate' => 'AB 3408 RA',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 6
                'license_plate' => 'AB 1280 AP',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 7
                'license_plate' => 'DK 9832 FP',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 8
                'license_plate' => 'DK 7521 AS',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 9
                'license_plate' => 'D 9082 PO',
                'seats' => 19,
                'status' => 'Tersedia',
            ], [ //ID 10
                'license_plate' => 'D 6859 AQ',
                'seats' => 19,
                'status' => 'Tersedia',
            ],
        ]);

        Driver::insert([
            [
                'name' => 'Joko',
                'vehicle_id' => 1,
            ],
            [
                'name' => 'Budiyanto',
                'vehicle_id' => 2,
            ],
            [
                'name' => 'Budi',
                'vehicle_id' => 3,
            ],
            [
                'name' => 'Sutrisno',
                'vehicle_id' => 4,
            ],
            [
                'name' => 'Sutono',
                'vehicle_id' => 5,
            ],
            [
                'name' => 'Sutejo',
                'vehicle_id' => 6,
            ],
            [
                'name' => 'Rudi',
                'vehicle_id' => 7,
            ],
            [
                'name' => 'Bagas',
                'vehicle_id' => 8,
            ],
            [
                'name' => 'Dayat',
                'vehicle_id' => 9,
            ], [
                'name' => 'Asep',
                'vehicle_id' => 10,
            ],
        ]);

        Schedule::insert([
        // Jakarta
        [
            'location_id' => 1,  // Bandara Soekarno Hatta
            'vehicle_id' => 1,
            'price' => 45000,
            'departure_time' => '10:00:00',
            'arrival_time' => '12:00:00'
        ], [
            'location_id' => 2,  // Hotel Paragon
            'vehicle_id' => 2,
            'price' => 45000,
            'departure_time' => '10:30:00',
            'arrival_time' => '13:00:00'
        ], [
            'location_id' => 3,  // Hotel Arya Duta
            'vehicle_id' => 3,
            'price' => 45000,
            'departure_time' => '11:00:00',
            'arrival_time' => '13:30:00'
        ],

        // Yogyakarta (new entries)
        [
            'location_id' => 4,  // Bandara YIA
            'vehicle_id' => 4,
            'price' => 45000,
            'departure_time' => '11:30:00',
            'arrival_time' => '14:30:00'
        ], [
            'location_id' => 10,  // Platinum Adistujipto hotel
            'vehicle_id' => 5,
            'price' => 45000,
            'departure_time' => '12:15:00',
            'arrival_time' => '16:15:00'
        ], [
            'location_id' => 8,  // Bandara Adistujipto
            'vehicle_id' => 6,
            'price' => 45000,
            'departure_time' => '09:30:00',
            'arrival_time' => '11:30:00'
        ], [
            'location_id' => 11,  // Grand Diamond Hotel Yogyakarta
            'vehicle_id' => 5,
            'price' => 45000,
            'departure_time' => '10:00:00',
            'arrival_time' => '12:00:00'
        ], [
            'location_id' => 14,  // Ibis Yogyakarta International Airport Kulon Progo
            'vehicle_id' => 4,
            'price' => 45000,
            'departure_time' => '10:45:00',
            'arrival_time' => '12:45:00'
        ], [
            'location_id' => 4,  // Bandara YIA
            'vehicle_id' => 4,
            'price' => 45000,
            'departure_time' => '11:15:00',
            'arrival_time' => '13:15:00'
        ], [
            'location_id' => 9,  // Ambarukmo
            'vehicle_id' => 6,
            'price' => 45000,
            'departure_time' => '10:20:00',
            'arrival_time' => '12:20:00'
        ],

        // Bandung (new entries)
        [
            'location_id' => 5,  // Bandar Udara Internasional Husein Sastranegara
            'vehicle_id' => 9,
            'price' => 50000,
            'departure_time' => '11:10:00',
            'arrival_time' => '14:10:00'
        ], [
            'location_id' => 6,  // Verona Palace Hotel
            'vehicle_id' => 10,
            'price' => 50000,
            'departure_time' => '12:30:00',
            'arrival_time' => '16:30:00'
        ],

        // Bali (new entries)
        [
            'location_id' => 7,  // Bandara Internasional I Gusti Ngurah Rai
            'vehicle_id' => 7,
            'price' => 45000,
            'departure_time' => '11:45:00',
            'arrival_time' => '14:45:00'
        ], [
            'location_id' => 12,  // Platinum Hotel Jimbaran Beach Bali
            'vehicle_id' => 8,
            'price' => 45000,
            'departure_time' => '12:50:00',
            'arrival_time' => '16:50:00'
        ], [
            'location_id' => 13,  // Arya Duta Bali
            'vehicle_id' => 7,
            'price' => 45000,
            'departure_time' => '09:15:00',
            'arrival_time' => '11:15:00'
        ]
    ]);
    }
}
