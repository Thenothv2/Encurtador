<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Usuário não autenticado']);
    exit;
}

require_once 'db.php';

$user_id = $_SESSION['user_id'];

$query = $db->prepare("SELECT is_premium FROM users WHERE id = ?");
$query->execute([$user_id]);
$user = $query->fetch(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'is_premium' => $user['is_premium']]);
?>
