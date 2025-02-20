<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Captcha em PHP</title>
</head>
<body>
    <h2>Formulário </h2>
    <form action="process.php" method="post">
        <label for="name">Nome:</label>
        <input type="text" name="name" required>
        <br><br>

        <image src="captcha.php" alt="Captcha">
        <br>
        <label for="captcha">Digite o código acima:</label>
        <input type="text" name="captcha" required>
        <br><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>