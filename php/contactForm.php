<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $msg = $_POST["msg"];
    $to = "patelparth4655@gmail.com"; // Your email address

    if (isset($email) && isset($name) && isset($msg)) {
        $email_subject = "$name sent you a message via YOUR SITE NAME"; // Your email subject
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
        $headers .= "From: ".$name." <".$email.">\r\n"."Reply-To: ".$email."\r\n";
        $message = "From: $name<br/> Email: $email <br/> Subject: $subject <br/> Message: $msg";

        if (mail($to, $email_subject, $message, $headers)) {
            echo 'success';
        } else {
            echo 'failed';
        }
    } else {
        echo 'failed';
    }
}
?>
