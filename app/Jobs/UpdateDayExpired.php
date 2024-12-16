<?php

namespace App\Jobs;

use App\Models\Trip;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log as FacadesLog;

class UpdateDayExpired implements ShouldQueue
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
            $currentDate = now()->toDateString();

            $trip = Trip::where('selected_day', '<', $currentDate)
                ->update(['is_expired' => true]);


            if(!$trip){
                FacadesLog::info('No Trips Expired');
            }else{
                CreateLog::dispatch();
            }

        }catch(\Exception $e){
            FacadesLog::info('Error update the expired' . $e->getMessage());
        }
        
    }
}
