<?php

namespace App\Mail\Beflight;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendBeflightmostMail extends Mailable
{
    use Queueable, SerializesModels;

    public $phone;
    public $title;
    public $source = "trendpro";
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($title,$phone)
    {
        $this->phone = $phone;
        $this->title = $title;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from('support@trend-p.ru', 'Лидмагнит')
            ->subject("Новая Заявка")
            ->view('emails.email');
    }
}
