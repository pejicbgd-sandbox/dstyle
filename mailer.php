<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    if(isset($_POST['action']) && $_POST['action'] == 'sendContactForm')
    {
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

        if($name && $email && $message) {
            $to      = 'office@dstyle.co.rs';
            $subject = 'Kontakt sa sajta';
            $message = $message;
            $headers = 'From: office@dstyle.co.rs' . "\r\n" .
                'Reply-To: office@dstyle.co.rs' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

            if(mail($to, $subject, $message, $headers)) {
                echo 1; die;
            }
        }
    }
    echo 0; die;
}