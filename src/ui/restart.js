import { getGameOver, resetGameState } from "../logic/game-controller";
import { createPlayerOneBoard, createPlayerTwoBoard } from "./create-boards";

const dialogOne = document.querySelector(".start-game-dialog");

function resetDialogOneBoard() {
    const dialogBoard = document.querySelector(".player-one-dialog-board");
    dialogBoard.innerHTML = "";
}

function resetDialogTwoBoards() {
    const dialogBoard = document.querySelector(".two-player-dialog-board");
    dialogBoard.innerHTML = "";
}

function resetPlayerOneBoard() {
    const playerOneBoard = document.querySelector(
        ".player-one-board-container"
    );
    playerOneBoard.innerHTML = "";
    createPlayerOneBoard();
}

function resetPlayerTwoBoard() {
    const playerTwoBoard = document.querySelector(
        ".player-two-board-container"
    );
    playerTwoBoard.innerHTML = "";
    createPlayerTwoBoard();
}

function restartGame() {
    resetGameState();
    resetDialogOneBoard();
    resetDialogTwoBoards();
    resetPlayerOneBoard();
    resetPlayerTwoBoard();

    const mainMenuButton = document.querySelector(".main-menu-button");
    mainMenuButton.remove();

    const gameForm = document.querySelector(".game-form");
    gameForm.reset();
    dialogOne.showModal();
}

export function attachMainMenuButtonIfGameOver() {
    if (getGameOver()) {
        const buttonsContainer = document.querySelector(
            ".game-buttons-container"
        );
        const mainMenuButton = document.createElement("button");
        mainMenuButton.type = "button";
        mainMenuButton.className = "main-menu-button";
        mainMenuButton.textContent = "Main Menu";
        mainMenuButton.addEventListener("click", restartGame);
        buttonsContainer.appendChild(mainMenuButton);
    }
}
