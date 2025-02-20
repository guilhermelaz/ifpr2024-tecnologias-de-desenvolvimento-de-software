let scene, camera, renderer, duck, ground;
const scoreElement = document.getElementById('scoreValue');
const gameOverElement = document.getElementById('gameOver');

// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = 0.4;
const GAME_SPEED = 0.2;
const OBSTACLE_SPACING = 15;

// Game state
let obstacles = [];
let score = 0;
let gameOver = false;
let jumping = false;
let velocity = 0;

// Initialize Three.js scene
function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    createDuck();
    createGround();
    createInitialObstacles();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Create duck character
function createDuck() {
    const duckGeometry = new THREE.Group();
    
    // Duck body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.MeshPhongMaterial({ color: 0xFFD700 })
    );
    
    // Duck head
    const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshPhongMaterial({ color: 0xFFD700 })
    );
    head.position.set(0.4, 0.4, 0);
    
    // Duck beak
    const beak = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.4, 4),
        new THREE.MeshPhongMaterial({ color: 0xFFA500 })
    );
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.6, 0.4, 0);
    
    duckGeometry.add(body);
    duckGeometry.add(head);
    duckGeometry.add(beak);
    
    duck = duckGeometry;
    duck.position.y = 1;
    scene.add(duck);
}

// Create ground
function createGround() {
    const groundGeometry = new THREE.BoxGeometry(100, 0.5, 5);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x90EE90 });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.25;
    ground.receiveShadow = true;
    scene.add(ground);
}

// Create obstacles
function createObstacle(position) {
    const types = [
        { geometry: new THREE.BoxGeometry(0.8, 2, 0.8), color: 0x808080, name: 'lamppost' },
        { geometry: new THREE.BoxGeometry(2, 3, 1), color: 0xA0522D, name: 'building' },
        { geometry: new THREE.BoxGeometry(1, 1, 1), color: 0x696969, name: 'trash' }
    ];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const obstacle = new THREE.Mesh(
        type.geometry,
        new THREE.MeshPhongMaterial({ color: type.color })
    );
    
    obstacle.position.x = position;
    obstacle.position.y = type.geometry.parameters.height / 2;
    obstacle.castShadow = true;
    
    scene.add(obstacle);
    obstacles.push({
        mesh: obstacle,
        passed: false,
        type: type.name
    });
}

function createInitialObstacles() {
    for (let i = 0; i < 5; i++) {
        createObstacle(20 + i * OBSTACLE_SPACING);
    }
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Update game state
function update() {
    if (gameOver) return;
    
    // Apply gravity and jumping
    if (jumping) {
        velocity += GRAVITY * 0.016; // Delta time approximation
        duck.position.y -= velocity;
        
        if (duck.position.y <= 1) {
            duck.position.y = 1;
            jumping = false;
            velocity = 0;
        }
    }
    
    // Update obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.mesh.position.x -= GAME_SPEED;
        
        // Check collision
        if (!obstacle.passed && 
            Math.abs(obstacle.mesh.position.x - duck.position.x) < 0.8 &&
            duck.position.y < obstacle.mesh.position.y + obstacle.mesh.geometry.parameters.height / 2) {
            gameOver = true;
            gameOverElement.style.display = 'block';
        }
        
        // Update score
        if (!obstacle.passed && obstacle.mesh.position.x < duck.position.x) {
            score++;
            scoreElement.textContent = score;
            obstacle.passed = true;
        }
        
        // Recycle obstacle
        if (obstacle.mesh.position.x < -10) {
            obstacle.mesh.position.x = obstacles[obstacles.length - 1].mesh.position.x + OBSTACLE_SPACING;
            obstacle.passed = false;
        }
    });
}

// Handle jump
function handleJump(event) {
    if ((event.code === 'Space' || event.type === 'touchstart') && !jumping && !gameOver) {
        jumping = true;
        velocity = -JUMP_FORCE;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

// Event listeners
document.addEventListener('keydown', handleJump);
document.addEventListener('touchstart', handleJump);

// Start game
init();
animate();