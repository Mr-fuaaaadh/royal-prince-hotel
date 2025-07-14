<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $comments = htmlspecialchars(trim($_POST['comments']));

    // Validate inputs
    if (empty($name) || empty($email) || empty($comments)) {
        echo "<script>alert('All fields are required.'); window.history.back();</script>";
        exit;
    }

    // Setup mail details
    $to = "contact@royalprincehotels.com"; // Replace with your actual email
    $subject = "New Booking Message from Website";
    $message = "Name: $name\nEmail: $email\n\nMessage:\n$comments";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href='thank-you.html';</script>";
    } else {
        echo "<script>alert('Message sending failed. Your server may not support PHP mail().'); window.history.back();</script>";
    }
} else {
    echo "Invalid request.";
}
?>
