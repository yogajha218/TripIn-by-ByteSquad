<?php

namespace App\Jobs;

use App\Models\Log;
use App\Models\Trip;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log as FacadesLog;

class CreateLog implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try{
            $expiredTrips = Trip::where('is_expired', true)->get();

            FacadesLog::info('Expired Trips Count: ' . $expiredTrips->count()); // Log the count of expired trips

            foreach ($expiredTrips as $trip) {
                // Check if a log entry with the same trip_id already exists
                $logExists = Log::where('trip_id', $trip->trip_id)->exists();

                if (!$logExists) {
                    // Create a new log entry if it doesn't exist
                    Log::create([
                        'trip_id' => $trip->trip_id,
                        'departure' => $trip->origin,
                        'arrival' => $trip->schedule->location->name,
                        'departure_date' => $trip->selected_day,
                    ]);
                    FacadesLog::info('Log created for Trip ID: ' . $trip->trip_id); // Log the creation of the log entry
                } else {
                    FacadesLog::info('Log already exists for Trip ID: ' . $trip->trip_id); // Log if the log entry already exists
                }
            }
            
            DeleteSeatNumber::dispatch();
            
        }catch(\Exception $e){
            FacadesLog::info('Error or Creating Log : ' . $e->getMessage());
        }
    }
}
