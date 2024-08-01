<?php
$code = $_GET['code'];

$file = fopen('urls.txt', 'r');

while (($line = fgets($file)) !== false) {
    list($shortCode, $url) = explode(' ', $line);
    
    if (trim($shortCode) == $code) {
        fclose($file);
        header("Location: $url");
        exit;
    }
}

fclose($file);
echo "URL não encontrada.";
?>
