<?php
session_start();

$largura = 150;
$altura = 50;
$quantidade_linhas = 6;
$quantidade_pontos = 100;
$font = "arial.ttf";

$captcha_code = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVXZWY123456789"), 0, 5);
$_SESSION["captcha"] = $captcha_code;

$image = imagecreatetruecolor($largura, $altura);

$cor_fundo = imagecolorallocate($image, 255, 255, 255);
$cor_texto = imagecolorallocate($image, 0, 0, 0);
$cor_ruido = imagecolorallocate($image, 0, 56, 10);

imagefilledtectangle($image, 0, 0, $altura, $largura, $cor_fundo);

for($i = 0; $i < $quantidade_linhas; $i++) {
    imageline($image,
    rand(0,$largura), rand(0, $altura),
    rand(0,$largura), rand(0, $altura),
    $cor_ruido);
}

for($i = 0; $i < $quantidade_pontos; $i++) {
    imagesetpixel($image, rand(0, $largura), rand(0, $altura), $cor_ruido);
}

$x = 15;
$y = $altura - 15;

for($i = 0; $i < strlen($captcha_code); $i++) {
    $angulo = rand(-25, 25);
    imagettftext($image, 22, $angulo, $x, $y, $cor_texto, $font, $captcha_code[$i]);
    $x += 30;
}

header("Content-type: image/png");
imagepng($image);
imagedestroy($image);
?>