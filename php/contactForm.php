<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = $data["name"];
    $email = $data["email"];
    $subject = $data["subject"];
    $msg = $data["msg"];
    $to = "patelparth4655@gmail.com";

    if (!empty($email) && !empty($name) && !empty($msg)) {
        $email_subject = "$name sent you a message via YOUR SITE NAME";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
        $headers .= "From: " . $name . " <" . $email . ">\r\n" . "Reply-To: " . $email . "\r\n";
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
