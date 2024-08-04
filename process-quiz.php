<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$score = $data['score'];

// Lógica para processar o resultado do quiz e verificar o e-mail
$response = ['success' => true];

echo json_encode($response);
?>
