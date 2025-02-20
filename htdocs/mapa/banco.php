<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);
ini_set('display_startup_errors', 1);


function conectar() {
    try {
        $pdo = new PDO('mysql:host=localhost:3306;dbname=mapa', 'root', 'root');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Erro: ' . $e->getMessage();
    }

    return $pdo;
}


echo "Lista de Pontos <br>";



function listaPontos() {
    $pdo = conectar();
    $consulta = $pdo->query('SELECT * FROM pontos');
    while ($registro = $consulta->fetch(PDO::FETCH_ASSOC)) {
        echo "Lat: " . $registro['lat'] . "<br>";
        echo "Lon: " . $registro['lng'] . "<br>";
        echo "Descrição: " . $registro['descricao'] . "<br>";
        echo "<hr/>";
    }

}

listaPontos();

// Implementar um mapa com o leaftlet, igual no arquivo @mapa 2, mas usando os dados do banco em vez dos da constante

?>