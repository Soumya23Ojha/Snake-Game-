const board = document.getElementById("game-board");

const GRID_SIZE = 20;

let gameOver = false;
let score = 0;

let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

let direction = "right";

let food = {
    x: 5,
    y: 5
};

// Create Board
function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

// Generate Food
function generateFood() {

    let validPosition = false;

    while (!validPosition) {

        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };

        validPosition = true;

        for (let segment of snake) {

            if (
                segment.x === food.x &&
                segment.y === food.y
            ) {
                validPosition = false;
                break;
            }
        }
    }
}


// Draw Snake
function drawSnake() {
    const cells = document.querySelectorAll(".cell");

    snake.forEach(segment => {
        const index = segment.y * GRID_SIZE + segment.x;

        if (index >= 0 && index < cells.length) {
            cells[index].classList.add("snake");
        }
    });
}

// Draw Food
function drawFood() {

    const cells = document.querySelectorAll(".cell");

    const index = food.y * GRID_SIZE + food.x;

    if (index >= 0 && index < cells.length) {
        cells[index].classList.add("food");
    }
}

// Render Game
function render() {
    createBoard();
    drawFood();
    drawSnake();
}

// Move Snake
function moveSnake() {

    if (gameOver) return;

    const head = { ...snake[0] };

    switch (direction) {

        case "up":
            head.y--;
            break;

        case "down":
            head.y++;
            break;

        case "left":
            head.x--;
            break;

        case "right":
            head.x++;
            break;
    }

    // Wall Collision
    if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
    ) {

        gameOver = true;

        const finalScore =
            document.getElementById("final-score");

        if (finalScore) {
            finalScore.textContent = score;
        }

        const gameOverScreen =
            document.getElementById("game-over-screen");

        if (gameOverScreen) {
            gameOverScreen.classList.remove("hidden");
        }

        return;
    }

    snake.unshift(head);

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        score++;

        document.getElementById("score").textContent = score;

        generateFood();

    } else {

        snake.pop();
    }

    render();
    }


// Keyboard Controls
document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;

        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;

        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;

        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

// Restart Function
function restartGame() {

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = "right";
    gameOver = false;
    score = 0;

    document.getElementById("score").textContent = score;

    const gameOverScreen =
        document.getElementById("game-over-screen");

    if (gameOverScreen) {
        gameOverScreen.classList.add("hidden");
    }

    render();
}

// Restart Button
const restartBtn =
    document.getElementById("restart-btn");

if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
}

// Play Again Button
const playAgainBtn =
    document.getElementById("play-again-btn");

if (playAgainBtn) {
    playAgainBtn.addEventListener("click", restartGame);
}

// Start Game
generateFood();
render();

setInterval(moveSnake, 300);