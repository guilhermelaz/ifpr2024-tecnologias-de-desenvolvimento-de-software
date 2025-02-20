<?php
session_start();

require_once 'exercicioCaptcha.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $captcha = $_POST['captcha'] ?? '';

    $protection = new LoginProtection();
    $result = $protection->verifyLogin($username, $password, $captcha);

    if ($result['success']) {
        echo json_encode(['status' => 'success', 'message' => 'Login bem-sucedido']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $result['message']]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição inválido']);
}
?>
