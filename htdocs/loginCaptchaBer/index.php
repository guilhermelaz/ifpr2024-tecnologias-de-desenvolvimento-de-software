<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .login-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      width: 300px;
      text-align: center;
    }

    h1 {
      color: #333;
    }

    p {
      margin-bottom: 15px;
    }

    .error-message {
      color: #e74c3c;
    }

    .captcha-message {
      color: #f39c12;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    label {
      text-align: left;
      margin-bottom: 5px;
      color: #555;
    }

    input {
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    img {
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background-color: #3498db;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #2980b9;
    }
  </style>
</head>

<body>
  <div class="login-container">
    <h1>Login</h1>

    <?php
    session_start();
    if (isset($_SESSION['login_error'])) {
      echo '<p class="error-message">' . $_SESSION['login_error'] . '</p>';
      unset($_SESSION['login_error']);
    }

    if (isset($_SESSION['login_attempts']) && $_SESSION['login_attempts'] >= 4) {
      echo '<p class="captcha-message">Muitas tentativas! Por favor, preencha o Captcha.</p>';
    }
    ?>

    <form action="verifica_login.php" method="post">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="senha">Senha:</label>
      <input type="password" id="senha" name="senha" required>

      <?php
      if (isset($_SESSION['login_attempts']) && $_SESSION['login_attempts'] >= 4) {
        echo '<label for="captcha">Captcha:</label>';
        echo '<img src="captcha.php" alt="Captcha Image"><br>';
        echo '<input type="text" id="captcha" name="captcha" required>';
      }
      ?>

      <button type="submit">Entrar</button>
    </form>
  </div>
</body>

</html>
