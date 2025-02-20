const lines = 20;
const columns = 20;

const width = 45;
const height = 45;

const bowlNeighbors = [];
const fishNeighbors = [];

let fish, bowl, fishLine, fishColumn, bowlLine, bowlColumn, fishPosition, bowlPosition;

// Function to get audio elements after the DOM has loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Initialize variables or perform any actions if needed
});

// Audio elements (placed after the DOM elements are loaded)
const suspenseMusic = new Audio('suspense.mp3');
suspenseMusic.loop = true;
suspenseMusic.volume = 0.5; // Adjust volume as needed

const successSound = new Audio('success.mp3');
successSound.volume = 1.0; // Adjust volume as needed

// Bubble container
const bubbleContainer = document.getElementById('bubble-container');

function startGame() {
    if (bowlNeighbors.length === 0) {
        findNeighbors(bowlLine, bowlColumn, bowlNeighbors);
    }
    findNeighbors(fishLine, fishColumn, fishNeighbors);
    // Play suspense music
    suspenseMusic.currentTime = 0;
    suspenseMusic.play();
}

function createTable() {
    const parent = document.getElementById("table");
    const table = document.createElement("table");

    for (let i = 0; i < lines; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            const td = document.createElement("td");
            td.setAttribute("id", `${i},${j}`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    parent.appendChild(table);
    positionElements();
}

function positionElements() {
    fish = document.createElement("img");
    fish.setAttribute("src", "fish.png");
    fish.setAttribute("width", width);
    fish.setAttribute("height", height);
    fish.setAttribute("id", "fish");
    fishColumn = Math.floor(Math.random() * columns);
    fishLine = Math.floor(Math.random() * Math.floor((lines - 1) / 2));

    bowl = document.createElement("img");
    bowl.setAttribute("src", "bowl.png");
    bowl.setAttribute("width", width);
    bowl.setAttribute("height", height);
    bowl.setAttribute("id", "bowl");
    bowlColumn = Math.floor(Math.random() * columns);
    bowlLine = Math.floor(Math.random() * (lines - Math.floor((lines - 1) / 2)) + Math.floor((lines - 1) / 2));

    fishPosition = `${fishLine},${fishColumn}`;
    bowlPosition = `${bowlLine},${bowlColumn}`;

    let cell = document.getElementById(fishPosition);
    cell.appendChild(fish);

    cell = document.getElementById(bowlPosition);
    cell.appendChild(bowl);

    bowlNeighbors.push(bowlPosition);
}

function findNeighbors(line, column, neighbors) {
    const moves = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1],  // right
    ];

    for (const [dx, dy] of moves) {
        const newLine = line + dx;
        const newColumn = column + dy;

        if (
            newLine >= 0 &&
            newLine < lines &&
            newColumn >= 0 &&
            newColumn < columns
        ) {
            const pos = `${newLine},${newColumn}`;
            if (!neighbors.includes(pos)) {
                neighbors.push(pos);
                // Optional: Highlight or mark the neighbor
                // document.getElementById(pos).innerHTML = 'N';
            }
        }
    }
    setTimeout(calculateDistance, 250);
}

function calculateDistance() {
    let minDistance = Infinity;
    let minPosition = "";
    let x1, y1, x2, y2;

    for (let i = 0; i < fishNeighbors.length; i++) {
        let fishValues = fishNeighbors[i].split(",").map(Number);
        x1 = fishValues[0];
        y1 = fishValues[1];

        for (let j = 0; j < bowlNeighbors.length; j++) {
            let bowlValues = bowlNeighbors[j].split(",").map(Number);
            x2 = bowlValues[0];
            y2 = bowlValues[1];

            let distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
            if (distance < minDistance) {
                minDistance = distance;
                minPosition = `${x1},${y1}`;
            }
        }
    }

    if (minPosition) {
        document.getElementById(minPosition).style.backgroundColor = "#ffe4b5";
        document.getElementById(minPosition).appendChild(fish);
    }

    if (minPosition === bowlPosition) {
        // Stop suspense music and play success sound
        suspenseMusic.pause();
        successSound.play();

        // Trigger bubble effect
        createBubbles();

        // Alert after a short delay
        setTimeout(() => {
            alert("Chegou ao aquário!");
        }, 500);
        return;
    }

    let v = minPosition.split(",").map(Number);
    findNeighbors(v[0], v[1], fishNeighbors);
}

function createBubbles() {
    const numBubbles = 30; // Number of bubbles to create
    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        const size = Math.random() * 20 + 10 + 'px'; // Random size between 10px and 30px
        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = Math.random() * 100 + '%'; // Random horizontal position
        bubble.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Random duration between 2s and 5s
        bubble.style.animationDelay = (Math.random() * 5) + 's'; // Random delay up to 5s
        bubbleContainer.appendChild(bubble);

        // Remove bubble after animation to prevent DOM clutter
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
}
