<?php
session_start();

define('MAX_ATTEMPTS', 4);
define('LOCKOUT_TIME', 1800); 

class LoginProtection {
    private $db;
    
    public function __construct() {
        $this->db = new PDO('mysql:host=localhost;dbname=captcha', 'root', '240815');
    }
    
    public function checkLoginAttempts($username) {
        $stmt = $this->db->prepare('SELECT attempts, last_attempt FROM login_attempts WHERE username = ?');
        $stmt->execute([$username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateLoginAttempts($username, $success = false) {
        $attempts = $this->checkLoginAttempts($username);
        
        if ($success) {
            $stmt = $this->db->prepare('UPDATE login_attempts SET attempts = 0 WHERE username = ?');
            $stmt->execute([$username]);
            return;
        }
        
        if (!$attempts) {
            // Primeiro registro de tentativa
            $stmt = $this->db->prepare('INSERT INTO login_attempts (username, attempts, last_attempt) VALUES (?, 1, NOW())');
            $stmt->execute([$username]);
        } else {
            // Incrementa tentativas
            $stmt = $this->db->prepare('UPDATE login_attempts SET attempts = attempts + 1, last_attempt = NOW() WHERE username = ?');
            $stmt->execute([$username]);
        }
    }
    
    public function requiresCaptcha($username) {
        $attempts = $this->checkLoginAttempts($username);
        return $attempts && $attempts['attempts'] >= MAX_ATTEMPTS;
    }
    
    public function verifyLogin($username, $password, $captcha = null) {
        if ($this->requiresCaptcha($username) && !$this->verifyCaptcha($captcha)) {
            return ['success' => false, 'message' => 'Captcha inválido'];
        }
        
        // Simulação de verificação de credenciais
        $stmt = $this->db->prepare('SELECT * FROM login_attempts WHERE username = ? LIMIT 1');
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        error_log("Username: $username");
        error_log("Password: $password");
        error_log("DB Password: " . $user['password']);
        
        if ($user && strcasecmp($password, $user['password']) === 0) {
            $this->updateLoginAttempts($username, true);
            return ['success' => true, 'message' => 'Login realizado com sucesso! Você agora tem acesso ao permitido'];
        }
        
        $this->updateLoginAttempts($username);
        return ['success' => false, 'message' => 'Credenciais inválidas'];
    }
    
    private function verifyCaptcha($captcha) {
        // Implementar verificação real do captcha aqui
        return $captcha === $_SESSION['captcha'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $protection = new LoginProtection();
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $captcha = $_POST['captcha'] ?? null;
    
    $result = $protection->verifyLogin($username, $password, $captcha);
    if ($result['success']) {
        echo '<div class="success-message">' . $result['message'] . '</div>';
    } else {
        echo '<div class="error-message">' . $result['message'] . '</div>';
    }
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login Seguro</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"] {
            background-color: #28a745;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #218838;
        }
        .success-message {
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .error-message {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <form action="verifica_login.php" method="POST">
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required>

        <label for="captcha">Captcha:</label>
        <img src="captcha.php" alt="captcha">
        <input type="text" id="captcha" name="captcha" required>

        <input type="submit" value="Entrar">
    </form>

    <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (!result.success) {
            document.getElementById('errorMessage').textContent = result.message;
            if (result.message.includes('Captcha')) {
                document.getElementById('captchaContainer').style.display = 'block';
            }
        } else {
            window.location.href = ' ';
        }
    });
    </script>
</body>
</html>