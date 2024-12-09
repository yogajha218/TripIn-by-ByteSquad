<?php

use App\Jobs\UpdateDayExpired;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('trips:update-expired', function () {
    UpdateDayExpired::dispatch();
    $this->comment('Expired trips updated successfully.');
})->purpose('Update expired trips');

Schedule::command('trips:update-expired')->everyMinute();
