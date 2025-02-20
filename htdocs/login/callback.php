<?php
require_once 'google-api/vendor/autoload.php';

session_start();

$client = new Google_Client();
$client->setClientId('102767880090-kei3oqjgako9lfbtkg09sm9sqlpsi48r.apps.googleusercontent.com'); // Substitua pelo Client ID
$client->setClientSecret('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'); // Substitua pelo Client Secret
$client->setRedirectUri('http://localhost/login/callback.php');

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // Obter informações do usuário
    $oauth = new Google_Service_Oauth2($client);
    $userInfo = $oauth->userinfo->get();

    // Salvar informações do usuário na sessão
    $_SESSION['user'] = [
        'id' => $userInfo->id,
        'name' => $userInfo->name,
        'email' => $userInfo->email,
        'picture' => $userInfo->picture,
    ];

    // Redirecionar para a página inicial
    header('Location: profile.php');
    exit;
}
