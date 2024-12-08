<?php

namespace App\Jobs;

use App\Models\Notification as ModelsNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;

class DeleteNotificationJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $notificationId;

    /**
     * Create a new job instance.
     */
    public function __construct($notificationId)
    {
        $this->notificationId = $notificationId;

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $notification = ModelsNotification::find($this->notificationId);

        if ($notification) {
            $notification->delete();
        }    
    }
}
