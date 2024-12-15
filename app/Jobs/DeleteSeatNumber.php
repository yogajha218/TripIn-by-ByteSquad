<?php

namespace App\Jobs;

use App\Models\Log;
use App\Models\SeatBooking;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log as FacadesLog;

class DeleteSeatNumber implements ShouldQueue
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
        try {
            // Fetch all log entries where delete_seat is false
            $logs = Log::where('delete_seat', false)->get(); // Use get() to retrieve a collection of logs

            if ($logs->isEmpty()) {
                throw new Exception('No log entries found.');
            }

            foreach ($logs as $log) {
                // Fetch the seat booking for the current log's trip_id
                $seat = SeatBooking::where('trip_id', $log->trip_id)->first();
                if (!$seat) {
                    FacadesLog::info('No seat booking found for Trip ID: ' . $log->trip_id);
                    continue; // Skip to the next log if no seat booking is found
                }

                // Ensure both seat_number properties are arrays
                $currentSeatNumbers = is_array($seat->seat_number) ? $seat->seat_number : json_decode($seat->seat_number, true);
                $bookingSeatNumbers = is_array($log->trip->booking->seat_number) ? $log->trip->booking->seat_number : json_decode($log->trip->booking->seat_number, true);

                // Remove booked seats from available seats
                $seat->seat_number = array_diff($currentSeatNumbers, $bookingSeatNumbers);
                $seat->seat_available += $log->trip->booking->seat_total;
                // Save the updated seat numbers
                $seat->save();

                // Set delete_seat to true for the current log entry
                $log->delete_seat = true;
                $log->save(); // Save the updated log entry
            }
        } catch (Exception $e) {
            FacadesLog::info('Error Delete Seat Number : ' . $e->getMessage());
        }
    }
}
