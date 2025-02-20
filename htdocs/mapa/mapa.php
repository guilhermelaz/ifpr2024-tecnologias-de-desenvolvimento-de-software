<?php
function conectar() {
    try {
        $pdo = new PDO('mysql:host=localhost:3306;dbname=mapa', 'root', 'root');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo 'Erro: ' . $e->getMessage();
        exit;
    }
}

function getPontos() {
    $pdo = conectar();
    $consulta = $pdo->query('SELECT * FROM pontos');
    return $consulta->fetchAll(PDO::FETCH_ASSOC);
}

$pontos = getPontos();
$pontosJson = json_encode($pontos);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
    <style>
        #map {
            height: 100vh;
            margin: 0;
        }
    </style>
</head>
<body>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
        // Recebe os pontos do PHP
        const pontos = <?php echo $pontosJson; ?>;
        
        // Inicializa o mapa no Brasil
        const map = L.map('map').setView([-15.7801, -47.9292], 4);
        
        // Adiciona o layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adiciona os marcadores
        const markers = pontos.map(ponto => {
            const marker = L.marker([ponto.lat, ponto.lng]).addTo(map);
            marker.bindPopup(`<b>${ponto.descricao}</b>`);
            return marker;
        });

        // Cria um grupo com todos os marcadores
        const group = L.featureGroup(markers);
        
        // Ajusta o zoom para mostrar todos os pontos
        map.fitBounds(group.getBounds());
    </script>
</body>
</html>
