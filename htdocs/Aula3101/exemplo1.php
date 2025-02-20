<?php   
$image = imagecreate(300,300);
$background = imagecolorallocate($image, 100, 100, 100);
$backgorund = imagecreatefromjpeg('fundo.jpg');
imagecopy($image, $backgorund, 0, 0, 0, 0, 400, 300);

header("Content-type: image/png");
imagepng($image);
imagedestroy($image);