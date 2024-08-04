<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$date = date('Y-m-d H:i:s');

// Verificar o nome do e-mail (parte antes do '@')
list($emailNome, $emailDominio) = explode('@', $email);

if (strlen($emailNome) <= 20) {
    // Verificar se o e-mail contém palavras proibidas ou suspeitas
    $suspeitos = ['crime', 'ofensivo', 'link', 'proibido'];
    $isSuspeito = false;
    foreach ($suspeitos as $palavra) {
        if (strpos($email, $palavra) !== false) {
            $isSuspeito = true;
            break;
        }
    }

    if ($isSuspeito) {
        // Enviar aviso ao criador do site se o e-mail for suspeito
        $to = 'thenoth23@gmail.com, thenothv2@gmail.com';
        $subject = 'AVISO - E-mail suspeito';
        $message = "E-mail: $email\nData: $date\n\nE-mail suspeito detectado.";
        $headers = 'From: no-reply@yourdomain.com' . "\r\n" .
                   'Reply-To: no-reply@yourdomain.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);
        $response = ['success' => true, 'message' => 'E-mail suspeito detectado.'];
    } else {
        // Aprovar instantaneamente se não for suspeito
        $response = ['success' => true, 'message' => 'E-mail aprovado instantaneamente.'];
    }
} else {
    // Enviar aviso ao criador do site para e-mails com nome maior que 20 caracteres
    $to = 'thenoth23@gmail.com, thenothv2@gmail.com';
    $subject = 'AVISO - Novo cadastro de e-mail';
    $message = "E-mail: $email\nData: $date";
    $headers = 'From: no-reply@yourdomain.com' . "\r\n" .
               'Reply-To: no-reply@yourdomain.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
    $response = ['success' => true, 'message' => 'Aviso enviado ao criador do site.'];
}

echo json_encode($response);
?>
