<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Captcha Simples PHP</title>
</head>
<body>
    <h2>Formulário com Captcha</h2>
    <form action="process.php" method="POST">

        <label for="name">Nome:</label>
        <input type="text" name="name" id="name" required>
        <br>
        <br>

        <img src="captcha2.php" alt="Captcha">
        <br>
        
        <label for="captcha">Digite o código da imagem:</label>
        <input type="text" name="captcha" id="captcha" required>
        <br>
        <br>

        <button type="submit">Enviar</button>
        
    </form>

</body>
</html>