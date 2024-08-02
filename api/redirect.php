<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'error' => 'Campos obrigatórios não fornecidos.']);
    exit;
}

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

require_once 'db.php';

$query = $db->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$success = $query->execute([$username, $email, $password]);

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Erro ao registrar usuário.']);
}
?>
