const playerOneBoard = document.querySelector(".player-one-board-container");
const playerTwoBoard = document.querySelector(".player-two-board-container");

export function createPlayerOneBoard() {
    for (let i = 0; i < 100; i++) {
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        playerOneBoard.appendChild(gridBox);
    }
}

export function createPlayerTwoBoard() {
    for (let i = 0; i < 100; i++) {
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        playerTwoBoard.appendChild(gridBox);
    }
}
