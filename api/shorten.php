<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['url'])) {
    echo json_encode(['error' => 'URL não fornecida']);
    exit;
}

$url = $data['url'];
$shortCode = substr(md5(uniqid(rand(), true)), 0, 6);

$file = fopen('urls.txt', 'a');
fwrite($file, $shortCode . ' ' . $url . PHP_EOL);
fclose($file);

$shortUrl = 'http://seusite.com/' . $shortCode;

echo json_encode(['short_url' => $shortUrl]);
