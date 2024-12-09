<?php

namespace App\Console\Commands;

use App\Jobs\UpdateDayExpired;
use Illuminate\Console\Command;

class UpdateExpiredTrips extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trips:update-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update expired trips';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        UpdateDayExpired::dispatch();
        $this->info('Expired trips updated successfully.');
    }
}
