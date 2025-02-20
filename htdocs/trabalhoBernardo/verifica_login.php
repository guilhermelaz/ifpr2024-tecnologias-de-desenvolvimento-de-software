<?php
session_start();

// Credenciais válidas definidas (exemplo)
$valid_email = 'usuario@teste.com';
$valid_senha = '123456';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $senha = isset($_POST["senha"]) ? $_POST["senha"] : "";
    
    // Se houver 2 ou mais tentativas (terceira tentativa), o captcha é requerido
    if (isset($_SESSION['login_attempts']) && $_SESSION['login_attempts'] >= 3) {
        if (!isset($_POST["captcha"]) || empty($_POST["captcha"])) {
            $_SESSION['error'] = "Captcha requerido.";
            header("Location: index.php");
            exit();
        }
        if ($_POST["captcha"] != $_SESSION["captcha_code"]) {
            $_SESSION['error'] = "Captcha incorreto.";
            $_SESSION['login_attempts']++;
            header("Location: index.php");
            exit();
        }
    }
    
    // Verifica as credenciais
    if ($email === $valid_email && $senha === $valid_senha) {
        $_SESSION['login_attempts'] = 0; // Zera as tentativas em caso de sucesso
        $_SESSION['email'] = $email;
        header("Location: dashboard.php");
        exit();
    } else {
        $_SESSION['login_attempts']++;
        $_SESSION['error'] = "Email ou senha inválidos.";
        header("Location: index.php");
        exit();
    }
}
?>