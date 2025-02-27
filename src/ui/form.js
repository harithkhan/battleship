import * as gameController from "../logic/game-controller";
import { players } from "../logic/players";
import { displayPlayerTurn } from "./information-display";
import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./render.boards";
import { refreshWhoCanAttack } from "./attack";
import { populateDialogOne } from "./populate-dialog-one";

const twoPlayerButton = document.getElementById("two-player");
const playerOneInput = document.getElementById("input-player-1");

function handleTwoPlayerClick() {
    const previousInput = document.getElementById("input-player-2");
    if (!previousInput) {
        const playerTwoInput = document.createElement("input");
        playerTwoInput.id = "input-player-2";
        playerTwoInput.name = "input-player-2";
        playerTwoInput.value = "";
        playerTwoInput.placeholder = "Player 2";
        playerOneInput.insertAdjacentElement("afterend", playerTwoInput);
    }
}

const singlePlayerButton = document.getElementById("single-player");

function handleSinglePlayerClick() {
    const playerTwoInput = document.getElementById("input-player-2");
    if (playerTwoInput) {
        playerTwoInput.remove();
    }
}

const gameForm = document.querySelector(".game-form");
const dialog = document.querySelector(".start-game-dialog");
const startButton = document.getElementById("start-button");

function handleStartClick(event) {
    event.preventDefault();
    const formData = new FormData(gameForm);
    const gameMode = formData.get("game-mode");
    gameController.setGameMode(gameMode);
    if (gameController.getGameMode() === "single-player") {
        const playerOneName = formData.get("input-player-1") || "Player 1";
        const playerOne = players("human", playerOneName);
        const playerTwo = players("computer", "Computer");
        gameController.assignPlayerOne(playerOne);
        gameController.assignPlayerTwo(playerTwo);
        renderPlayerOneBoard();
        renderPlayerTwoBoard();
        dialog.close();
        populateDialogOne();
    }
    if (gameController.getGameMode() === "two-player") {
        const playerOneName = formData.get("input-player-1") || "Player 1";
        const playerOne = players("human", playerOneName);
        const playerTwoName = formData.get("input-player-2") || "Player 2";
        const playerTwo = players("human", playerTwoName);
        gameController.assignPlayerOne(playerOne);
        gameController.assignPlayerTwo(playerTwo);
        renderPlayerOneBoard();
        renderPlayerTwoBoard();
        gameController.gameStart();
        dialog.close();
    }
    displayPlayerTurn();
    refreshWhoCanAttack();
}

export function attachFormEventListeners() {
    twoPlayerButton.addEventListener("click", handleTwoPlayerClick);
    singlePlayerButton.addEventListener("click", handleSinglePlayerClick);
    startButton.addEventListener("click", handleStartClick);
}
