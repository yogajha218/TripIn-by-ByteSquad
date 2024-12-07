<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class paymentCompleted extends Notification
{
    use Queueable;

    private $ticketDetails;


    /**
     * Create a new notification instance.
     */
    public function __construct($ticketDetails)
    {
        $this->ticketDetails = $ticketDetails;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase(object $notifiable)
    {
        return [
            'title' => 'Payment Successful',
            'message' => 'You successfully purchased ticket from TripIn. Enjoy your Trip!',
            'ticket_id' => $this->ticketDetails['ticket_id'],
            'amount' => $this->ticketDetails['amount'],
            'date' => now()->toDateTimeString(),
            'expires_at' => now()->addMinutes(5), // Expiry time

        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
