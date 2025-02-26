const playerOneBoard = document.querySelector(".player-one-board-container");
const playerTwoBoard = document.querySelector(".player-two-board-container");

export function createPlayerOneBoard() {
    let initialCoordinates = [0, 9];
    for (let i = 0; i < 100; i++) {
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        gridBox.dataset.coordinates = initialCoordinates.join(",");
        gridBox.dataset.spaceState = "water";
        playerOneBoard.appendChild(gridBox);
        initialCoordinates = [initialCoordinates[0] + 1, initialCoordinates[1]];
        if (initialCoordinates[0] > 9) {
            initialCoordinates = [0, initialCoordinates[1] - 1];
        }
    }
}

export function createPlayerTwoBoard() {
    let initialCoordinates = [0, 9];
    for (let i = 0; i < 100; i++) {
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        gridBox.dataset.coordinates = initialCoordinates.join(",");
        gridBox.dataset.spaceState = "water";
        playerTwoBoard.appendChild(gridBox);
        initialCoordinates = [initialCoordinates[0] + 1, initialCoordinates[1]];
        if (initialCoordinates[0] > 9) {
            initialCoordinates = [0, initialCoordinates[1] - 1];
        }
    }
}
