<?php

namespace App\Mail\Autoschool;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $phone;
    public $tag;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($phone, $tag)
    {
        $this->phone = $phone;
        $this->tag = $tag;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from(env('MAIL_FROM_ADDRESS_AUTOSCHOOL'), env('MAIL_FROM_NAME_AUTOSCHOOL'))
            ->subject(env('MAIL_SUBJECT_AUTOSCHOOL'))
            ->view('autoschool.emails.email');
    }
}
