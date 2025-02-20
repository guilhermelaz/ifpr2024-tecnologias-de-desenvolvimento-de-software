<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
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

    .dashboard-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      text-align: center;
    }

    h1 {
      color: #333;
    }
  </style>
</head>

<body>
  <div class="dashboard-container">
    <?php
    session_start();
    if (!isset($_SESSION['email'])) {
      header("Location: index.php");
      exit();
    }
    $email = $_SESSION['email'];
    echo "<h1>Bem-vindo, $email!</h1>";
    ?>
  </div>
</body>

</html>
