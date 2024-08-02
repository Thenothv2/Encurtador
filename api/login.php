<?php
header('Content-Type: application/json');
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'error' => 'Campos obrigatórios não fornecidos.']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

require_once 'db.php';

$query = $db->prepare("SELECT id, password FROM users WHERE email = ?");
$query->execute([$email]);
$user = $query->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Credenciais inválidas.']);
}
?>
