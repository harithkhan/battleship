import * as gameController from "../logic/game-controller";

const display = document.querySelector(".game-information-display");

export function displayPlayerTurn() {
    const playerTurn = gameController.getPlayerTurn().getName();
    display.textContent = `${playerTurn}'s turn`;
}

export function displayGameOver() {
    if (gameController.getGameOver()) {
        display.textContent = `Game Over! ${gameController.getGameWinner().getName()} has won!`;
    }
}
