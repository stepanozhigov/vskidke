<?php

namespace App\Mail\Koronateh;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendKoronatehMail extends Mailable
{
    use Queueable, SerializesModels;

    public $phone;
    public $tag;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($phone)
    {
        $this->phone = $phone;
        $this->tag = 'koronateh.vskidke.ru';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from('support@trend-p.ru', 'Лид Магнит')
            ->subject("Новая Заявка")
            ->view('emails.email');
    }
}
