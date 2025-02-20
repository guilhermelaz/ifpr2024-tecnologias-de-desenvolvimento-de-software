<?php
include "sessao.php";


$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Perfil</title>
</head>
<body>

<h1>Bem-vindo, <?= htmlspecialchars($user['name']) ?>!</h1>
<p>Email: <?= htmlspecialchars($user['email']) ?></p>
<?php if (!empty($user['picture'])): ?>
    <img src="<?= $user['picture'] ?>" alt="Foto do perfil" style="border-radius: 50%; width: 100px; height: 100px;">
<?php else: ?>
    <p>Foto não disponível.</p>
<?php endif; ?>
<br><br>
<a href="logout.php">Sair</a>

</body>
</html>
