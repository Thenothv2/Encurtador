<?php
header('Content-Type: application/json');

$email = $_POST['email'];
// Verificar no banco de dados se o e-mail está registrado
// Exemplo usando PDO
try {
    $pdo = new PDO('mysql:host=localhost;dbname=seu_banco_de_dados', 'usuario', 'senha');
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM usuarios WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $count = $stmt->fetchColumn();
    echo json_encode(['exists' => $count > 0]);
} catch (PDOException $e) {
    echo json_encode(['exists' => false]);
}
?>
