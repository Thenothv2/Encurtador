<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['url'])) {
    echo json_encode(['error' => 'URL not provided']);
    exit;
}

require_once 'db.php';

$user_id = $_SESSION['user_id'];

$url = $data['url'];

if (empty($url)) {
    echo json_encode(['error' => 'URL is empty']);
    exit;
}

// Shorten URL logic
$shortCode = substr(md5(uniqid(rand(), true)), 0, 6);
$query = $db->prepare("INSERT INTO urls (user_id, short_code, original_url) VALUES (?, ?, ?)");
$query->execute([$user_id, $shortCode, $url]);

$shortUrl = 'https://your-domain.vercel.app/' . $shortCode;

echo json_encode(['short_url' => $shortUrl]);
?>
