<?php
session_start();
session_destroy();

// Redirecionar para a página inicial
header('Location: index.php');
exit;
