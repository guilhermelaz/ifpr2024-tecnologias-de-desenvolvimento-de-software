<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
require_once 'google-api/vendor/autoload.php';

session_start();

$client = new Google_Client();
$client->setClientId('102767880090-kei3oqjgako9lfbtkg09sm9sqlpsi48r.apps.googleusercontent.com'); // Substitua pelo Client ID
$client->setClientSecret('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'); // Substitua pelo Client Secret
$client->setRedirectUri('http://localhost/login/callback.php');
$client->addScope('email'); // Escopo para acessar o e-mail
$client->addScope('profile'); // Escopo para acessar o perfil


$loginUrl = $client->createAuthUrl();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login com Google</title>
</head>
<body>
    <h1>Login com Google</h1>
    <a href="<?= htmlspecialchars($loginUrl) ?>">Entrar com Google</a>
</body>
</html>
