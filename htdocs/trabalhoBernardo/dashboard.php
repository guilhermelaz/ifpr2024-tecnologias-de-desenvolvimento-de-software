<?php
session_start();
if (!isset($_SESSION['email'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1 class="welcome-message">Bem vindo <?php echo htmlspecialchars($_SESSION['email']); ?></h1>
        <div style="text-align: center; margin-top: 20px;">
            <a href="index.php" style="color: #4CAF50; text-decoration: none;">Voltar para Login</a>
        </div>
    </div>
</body>
</html>