<?php
session_start();

if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}

$usuarios_validos = [
    'teste@email.com' => '123456'
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    
    if ($_SESSION['login_attempts'] >= 3) {
        if (!isset($_POST['captcha']) || !isset($_SESSION['captcha_code'])) {
            $_SESSION['error'] = "Por favor, preencha o captcha.";
            header("Location: index.php");
            exit;
        }
        
        if (strtoupper($_POST['captcha']) !== $_SESSION['captcha_code']) {
            $_SESSION['error'] = "Código do captcha inválido.";
            $_SESSION['login_attempts']++;
            header("Location: index.php");
            exit;
        }
    }
    

    if (isset($usuarios_validos[$email]) && $usuarios_validos[$email] === $senha) {
        $_SESSION['login_attempts'] = 0;
        $_SESSION['user_email'] = $email;
        header("Location: welcome.php");
        exit;
    } else {
        $_SESSION['login_attempts']++;
        $_SESSION['error'] = "Email ou senha inválidos. Tentativa " . $_SESSION['login_attempts'] . " de 3.";
        
        if ($_SESSION['login_attempts'] >= 3) {
            $_SESSION['error'] .= " Por favor, preencha o captcha.";
        }
        
        header("Location: index.php");
        exit;
    }
} else {
    header("Location: index.php");
    exit;
}
