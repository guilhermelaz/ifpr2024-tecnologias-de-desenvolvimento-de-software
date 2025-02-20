<?php

session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

?>