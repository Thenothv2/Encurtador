<?php
header('Content-Type: application/json');

// Simulação de e-mails pendentes para exemplo
$pendingEmails = [
    'email1@example.com',
    'email2@example.com',
    'email3@example.com'
];

$response = ['emails' => $pendingEmails];

echo json_encode($response);
?>
