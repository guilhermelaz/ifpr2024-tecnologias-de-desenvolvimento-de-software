<?php
session_start();

if (!isset($_SESSION['user_email'])) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .logout {
            display: inline-block;
            background-color: #f44336;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
        .logout:hover {
            background-color: #da190b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bem-vindo!</h2>
        <p>Olá, <?php echo htmlspecialchars($_SESSION['user_email']); ?>!</p>
        <p>Você está logado com sucesso.</p>
        <a href="index.php" class="logout" onclick="<?php session_destroy(); ?>">Sair</a>
    </div>
</body>
</html>
