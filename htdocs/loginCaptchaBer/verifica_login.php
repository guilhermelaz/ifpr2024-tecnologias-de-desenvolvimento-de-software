<?php

session_start();

$email_valido = "teste@teste.com";
$senha_valida = "123";

if (!isset($_SESSION['login_attempts'])) {
  $_SESSION['login_attempts'] = 0;
}

$email = $_POST['email'];
$senha = $_POST['senha'];

if ($_SESSION['login_attempts'] >= 3) {
  $captcha = $_POST['captcha'];
  if ($captcha != $_SESSION['captcha_code']) {
    $_SESSION['login_error'] = "Captcha incorreto.";
    header("Location: index.php");
    exit();
  }
}

if ($email == $email_valido && $senha == $senha_valida) {
  $_SESSION['login_attempts'] = 0;
  $_SESSION['email'] = $email;
  header("Location: dashboard.php");
  exit();
} else {
  $_SESSION['login_attempts']++;
  $_SESSION['login_error'] = "Email ou senha incorretos.";
  header("Location: index.php");
  exit();
}

?>
