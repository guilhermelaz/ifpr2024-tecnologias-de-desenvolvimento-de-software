<?php
session_start();

$largura = 150;
$altura = 50;
$quantidade_linhas = 6;
$quantidade_pontos = 200;

// Ajuste do caminho da fonte - usando uma fonte que deve estar disponível no sistema
$fonte = 'C:\Windows\Fonts\Arial.ttf';

$captcha_code = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"), 0, 5);
$_SESSION['captcha_code'] = $captcha_code;

$image = imagecreatetruecolor($largura, $altura);

$background_color = imagecolorallocate($image, 255, 255, 255);
$text_color = imagecolorallocate($image, 0, 0, 0);
$noise_color = imagecolorallocate($image, 150, 150, 150);

imagefilledrectangle($image, 0, 0, $largura, $altura, $background_color);

for ($i = 0; $i < $quantidade_linhas; $i++) {
    imageline($image,
        rand(0, $largura), rand(0, $altura),
        rand(0, $largura), rand(0, $altura),
        $noise_color);
}

for ($i = 0; $i < $quantidade_pontos; $i++) {
    imagesetpixel($image, rand(0, $largura), rand(0, $altura), $noise_color);
}

$x = 15;
$y = $altura - 15;

for ($i = 0; $i < strlen($captcha_code); $i++) {
    $angulo = rand(-20, 20);
    imagettftext($image, 22, $angulo, $x, $y, $text_color, $fonte, $captcha_code[$i]);
    $x += 25;
}

header("Content-type: image/png");
imagepng($image);
imagedestroy($image);
?>