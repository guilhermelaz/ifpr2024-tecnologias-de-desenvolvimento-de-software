<?php
session_start();
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login com Captcha</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 20px;">Login com Captcha</h2>
        <?php
        if (isset($_SESSION['error'])) {
            echo "<div class='error-message'>" . $_SESSION['error'] . "</div>";
            unset($_SESSION['error']);
        }
        ?>
        <form method="post" action="verifica_login.php">
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" name="senha" required>
            </div>
            <?php if ($_SESSION['login_attempts'] >= 2): // Mudado para 2 para aparecer na terceira tentativa ?>
                <div class="form-group captcha-container">
                    <label>Captcha:</label>
                    <img src="captcha.php?v=<?php echo time(); ?>" alt="Captcha">
                    <input type="text" name="captcha" required placeholder="Digite o captcha">
                </div>
            <?php endif; ?>
            <div class="form-group">
                <input type="submit" value="Entrar">
            </div>
        </form>
    </div>
</body>
</html>