<?php

namespace App\Mail\Vsyanedvizhimost;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendVsyanedvizhimostMail extends Mailable
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
        $this->tag = 'вся-недвижимость.рус';
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
