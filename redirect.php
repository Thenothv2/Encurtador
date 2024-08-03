<?php
// redirect.php
include 'database.php'; // Conexão com o banco de dados

$shortUrl = $_GET['shortUrl'];
$query = $pdo->prepare('SELECT long_url FROM urls WHERE short_url = :shortUrl');
$query->bindParam(':shortUrl', $shortUrl);
$query->execute();
$row = $query->fetch(PDO::FETCH_ASSOC);

if ($row) {
    $longUrl = $row['long_url'];
    header("Location: $longUrl");
    exit();
} else {
    echo 'URL não encontrada.';
}
?>
