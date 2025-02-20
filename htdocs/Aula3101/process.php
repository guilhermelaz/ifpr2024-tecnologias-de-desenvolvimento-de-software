<?php
session_start();

// Configuração do CAPTCHA
$lagura = 150;
$altura = 50;
$quantidade_linhas = 6;
$quantidade_pontos = 200;
$fonte = 'arial.ttf';

//Gerar um código aleatório
$captcha_code = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);
$_SESSION['captcha'] = $captcha_code;

//Criar a imagem
$image = imagecreatetruecolor($lagura, $altura);

//Cores
$cor_fundo = imagecolorallocate($image, 255, 255, 255);
$cor_texto = imagecolorallocate($image, 0, 0, 0);
$cor_ruido = imagecolorallocate($image, 150, 150, 150);

//Preencher o fundo
imagefilledrectangle($image, 0, 0, $lagura, $altura, $cor_fundo);

//Adicionar ruido
for ($i = 0; $i < $quantidade_pontos; $i++) {
    imageline($image, 
    rand(0, $lagura), rand(0, $altura), 
    rand(0, $lagura), rand(0, $altura), 
    $cor_ruido
);

}

//Adicionar ruido (pontos aleatório)
for ($i = 0; $i < $quantidade_pontos; $i++) {
    imagesetpixel($image, rand(0, $lagura), rand(0, $altura), $cor_ruido);
}

//Adicionar o texto ao captcha
$x = 15;
$y = $altura - 15;
for ($i = 0; $i < strlen($captcha_code); $i++) {
    $angulo = rand(-20, 20);
    imagettftext($image, 22, $angulo, $x, $y, $cor_texto, $fonte, $captcha_code[$i]);
    $x += 25;
}

//Exibir a imagem
header("Content-type: image/png");
imagepng($image);
imagedestroy($image);
?>