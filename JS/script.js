const board = document.getElementById("game-board");

const GRID_SIZE = 20;

let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let direction = "right";

function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function drawSnake() {
    const cells = document.querySelectorAll(".cell");

    snake.forEach(segment => {
        const index = segment.y * GRID_SIZE + segment.x;
        cells[index].classList.add("snake");
    });
}

function moveSnake() {

    const head = { ...snake[0] };

    switch(direction) {
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

    snake.unshift(head);

    snake.pop();

    render();
}

document.addEventListener("keydown", (event) => {

    switch(event.key) {

        case "ArrowUp":
            if(direction !== "down") {
                direction = "up";
            }
            break;

        case "ArrowDown":
            if(direction !== "up") {
                direction = "down";
            }
            break;

        case "ArrowLeft":
            if(direction !== "right") {
                direction = "left";
            }
            break;

        case "ArrowRight":
            if(direction !== "left") {
                direction = "right";
            }
            break;
    }

});

function render() {
    createBoard();
    drawSnake();
}

render();

setInterval(moveSnake, 300);