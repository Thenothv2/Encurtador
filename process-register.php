<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$date = date('Y-m-d H:i:s');

// Verificar se o e-mail tem mais de 15 caracteres
if (strlen($email) > 15) {
    // Enviar aviso ao criador do site
    $to = 'thenoth23@gmail.com, thenothv2@gmail.com';
    $subject = 'AVISO - Novo cadastro de e-mail';
    $message = "E-mail: $email\nData: $date";
    $headers = 'From: no-reply@yourdomain.com' . "\r\n" .
               'Reply-To: no-reply@yourdomain.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    mail($to, $subject, $message, $headers);
}

$response = ['success' => true];

echo json_encode($response);
?>
