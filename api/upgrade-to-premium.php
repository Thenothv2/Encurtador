<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Usuário não autenticado']);
    exit;
}

require_once 'db.php';

$user_id = $_SESSION['user_id'];

$query = $db->prepare("UPDATE users SET is_premium = 1 WHERE id = ?");
$success = $query->execute([$user_id]);

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Erro ao fazer upgrade para premium.']);
}
?>
