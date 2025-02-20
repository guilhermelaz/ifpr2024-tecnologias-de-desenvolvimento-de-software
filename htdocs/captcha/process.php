<?php

    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST["name"];
        $captcha_input = $_POST["captcha"];

        if (!isset($_SESSION['captcha_code']) || strtoupper($captcha_input) !== $_SESSION['captcha_code']) {
            die("Erro: Captcha inválido. <a href='index.php'>Tentar novamente</a>");
        }
        
        echo "Captcha validado. O nome é: " . htmlspecialchars($nome);

    } else {
        echo "Método de requisição inválido.";
    }

?>