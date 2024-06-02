<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['msg']);

    if (empty($name) || empty($email) || empty($message)) {
        echo 'error';
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'error';
        exit;
    }

    $to = 'patelparth4655@gmail.com';
    $email_subject = "Contact form submission: $subject";
    $email_body = "You have received a new message from $name.\n\n".
                  "Here are the details:\n\n".
                  "Name: $name\n\n".
                  "Email: $email\n\n".
                  "Message:\n$message";

    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}
?>
