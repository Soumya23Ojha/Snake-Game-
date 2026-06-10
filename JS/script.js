const board = document.getElementById("game-board");

const GRID_SIZE = 20;

// Create 400 cells
function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

createBoard();