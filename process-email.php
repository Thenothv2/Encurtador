<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$action = $data['action'];

if ($action === 'approve') {
    // Lógica para aprovar o e-mail
    $response = ['success' => true];
} elseif ($action === 'reject') {
    // Lógica para rejeitar o e-mail
    $response = ['success' => true];
} else {
    $response = ['success' => false];
}

echo json_encode($response);
?>
