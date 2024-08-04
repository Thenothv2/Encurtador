<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$date = date('Y-m-d H:i:s');

// Conectar ao banco de dados (ajuste as credenciais conforme necessário)
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "seu_banco_de_dados";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Inserir o novo usuário no banco de dados
$sql = "INSERT INTO users (email, created_at) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $date);

if ($stmt->execute()) {
    $response = ['success' => true, 'message' => 'Conta criada com sucesso!'];
} else {
    $response = ['success' => false, 'message' => 'Erro ao criar a conta.'];
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
