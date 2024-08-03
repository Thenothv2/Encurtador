<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['url'])) {
    echo json_encode(['error' => 'URL não fornecida']);
    exit;
}

require_once 'db.php';

$user_id = $_SESSION['user_id'];

// Verifica o número de URLs criadas pelo usuário
$query = $db->prepare("SELECT COUNT(*) AS url_count FROM urls WHERE user_id = ?");
$query->execute([$user_id]);
$result = $query->fetch(PDO::FETCH_ASSOC);

$max_urls = 100; // Limite de URLs criadas pelo usuário

if ($result['url_count'] >= $max_urls) {
    echo json_encode(['error' => 'Limite de URLs atingido']);
    exit;
}

$url = $data['url'];

$shortCode = substr(md5(uniqid(rand(), true)), 0, 6);

$query = $db->prepare("INSERT INTO urls (user_id, short_code, original_url) VALUES (?, ?, ?)");
$query->execute([$user_id, $shortCode, $url]);

$shortUrl = 'https://seu-dominio.vercel.app/' . $shortCode;

echo json_encode(['short_url' => $shortUrl]);
?>
