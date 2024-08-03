// login.php
<?php
session_start();
$valid_username = 'admin';
$valid_password = 'senha123'; // A senha deve ser protegida e armazenada de forma segura

if ($_POST['username'] === $valid_username && $_POST['password'] === $valid_password) {
    $_SESSION['loggedin'] = true;
    header('Location: dashboard.php'); // Redireciona para a página principal do encurtador
} else {
    echo 'Usuário ou senha incorretos!';
}
?>
