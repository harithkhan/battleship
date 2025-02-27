import * as gameController from "../logic/game-controller";

export function displayPlayerTurn() {
    const playerTurn = gameController.getPlayerTurn().getName();
    const display = document.querySelector(".game-information-display");
    display.textContent = `${playerTurn}'s turn`;
}
