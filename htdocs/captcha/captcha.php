<?php

session_start();

    $captcha_code = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"), 0, 5);

    $_SESSION['captcha_code'] = $captcha_code;

    $image = imagecreate(100, 40);
    $background_color = imagecolorallocate($image, 255, 255, 255);

    # Adiciona o fundo ao image
    $background = imagecreatefrompng('fundo.png');
    imagecopy($image, $background, 0, 0, 0, 0, 400, 300);

    # Adiciona o texto ao image
    $text_color = imagecolorallocate($image, 255, 255, 255);
    imagestring($image, 5, 20, 10, $captcha_code, $text_color);
    // imagettftext($image, 20, 0, 10, 30, $text_color, 'arial.ttf', $captcha_code);

    header("Content-type: image/png");
    imagepng($image);
    imagedestroy($image);

?>