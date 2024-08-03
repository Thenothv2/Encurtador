<?php
// stats.php
include 'database.php'; // Conexão com o banco de dados

$query = $pdo->query('SELECT short_url, clicks FROM urls');
$urls = $query->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estatísticas</title>
</head>
<body>
    <h1>Estatísticas</h1>
    <table>
        <thead>
            <tr>
                <th>URL Curta</th>
                <th>Cliques</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($urls as $url): ?>
                <tr>
                    <td><?php echo htmlspecialchars($url['short_url']); ?></td>
                    <td><?php echo htmlspecialchars($url['clicks']); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
