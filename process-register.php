<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$date = date('Y-m-d H:i:s');

// Verificar se o e-mail tem mais de 15 caracteres
if (strlen($email) > 15) {
    // Verificar se o e-mail contém palavras proibidas ou suspeitas
    $suspeitos = ['crime', 'ofensivo', 'link', 'proibido'];
    $isSuspeito = false;
    foreach ($suspeitos as $palavra) {
        if (strpos($email, $palavra) !== false) {
            $isSuspeito = true;
            break;
        }
    }

    // Enviar aviso ao criador do site se o e-mail for suspeito
    if ($isSuspeito) {
        $to = 'thenoth23@gmail.com, thenothv2@gmail.com';
        $subject = 'AVISO - E-mail suspeito';
        $message = "E-mail: $email\nData: $date\n\nE-mail suspeito detectado.";
        $headers = 'From: no-reply@yourdomain.com' . "\r\n" .
                   'Reply-To: no-reply@yourdomain.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);
    }
}

$response = ['success' => true];

echo json_encode($response);
?>
