<?php
/**
 * PrintPro 3D - Quote Request Form Handler
 * For use with GoDaddy or any PHP hosting
 */

// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /index.html");
    exit;
}

// Sanitize input data
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get form data
$name = clean_input($_POST['name'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$phone = clean_input($_POST['phone'] ?? '');
$projectType = clean_input($_POST['projectType'] ?? '');
$material = clean_input($_POST['material'] ?? '');
$quantity = clean_input($_POST['quantity'] ?? '');
$description = clean_input($_POST['description'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($projectType) || empty($description)) {
    header("Location: /index.html?error=missing_fields");
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /index.html?error=invalid_email");
    exit;
}

// Your email address (where form submissions will be sent)
$to = "3d@bdecors.com";

// Email subject
$subject = "New 3D Printing Quote Request from " . $name;

// Build email body
$email_body = "=== New Quote Request ===\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Project Type: $projectType\n";
$email_body .= "Material: $material\n";
$email_body .= "Quantity: $quantity\n\n";
$email_body .= "Description:\n$description\n\n";
$email_body .= "---\n";
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Handle file uploads (basic info only - files won't be attached)
$file_info = "";
if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
    $file_info = "\n\nFiles uploaded:\n";
    foreach ($_FILES['files']['name'] as $key => $filename) {
        if ($_FILES['files']['error'][$key] === UPLOAD_ERR_OK) {
            $file_info .= "- " . $filename . " (" . round($_FILES['files']['size'][$key] / 1024, 2) . " KB)\n";
        }
    }
    $email_body .= $file_info;
    $email_body .= "\nNote: Files were uploaded but not attached. Customer should email files separately.\n";
}

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    // Success - redirect to thank you page
    header("Location: /thank-you.html");
    exit;
} else {
    // Failed - redirect back with error
    header("Location: /index.html?error=send_failed");
    exit;
}
?>
