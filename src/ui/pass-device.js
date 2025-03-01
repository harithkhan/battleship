import {
    getPlayerOne,
    getPlayerTurn,
    getPlayerTwo,
} from "../logic/game-controller";
import { hideShips } from "./hide-ships";
import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./render.boards";
import { handleAttack } from "./attack";

const gameButtonsContainer = document.querySelector(".game-buttons-container");

function receiveDevice() {
    if (getPlayerTurn() === getPlayerOne()) {
        renderPlayerOneBoard();
    }
    if (getPlayerTurn() === getPlayerTwo()) {
        renderPlayerTwoBoard();
    }
    const receiveDeviceButton = document.querySelector(
        ".receive-device-button"
    );
    receiveDeviceButton.remove();

    const playerOneGridBoxes = document.querySelectorAll(
        ".player-one-board-container > .grid-box"
    );
    const playerTwoGridBoxes = document.querySelectorAll(
        ".player-two-board-container > .grid-box"
    );

    const playerOneBoard = getPlayerOne().getBoard().getBoard();
    playerOneBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[0] === "not hit") {
                const coordinatesStr = [
                    playerOneBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ].join(",");
                playerOneGridBoxes.forEach((gridBox) => {
                    if (gridBox.dataset.coordinates === coordinatesStr) {
                        gridBox.addEventListener("click", handleAttack);
                    }
                });
            }
        });
    });

    const playerTwoBoard = getPlayerTwo().getBoard().getBoard();
    playerTwoBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[0] === "not hit") {
                const coordinatesStr = [
                    playerTwoBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ].join(",");
                playerTwoGridBoxes.forEach((gridBox) => {
                    if (gridBox.dataset.coordinates === coordinatesStr) {
                        gridBox.addEventListener("click", handleAttack);
                    }
                });
            }
        });
    });
}

export function insertReceiveDeviceButton() {
    const receiveDeviceButton = document.createElement("button");
    receiveDeviceButton.className = "receive-device-button";
    receiveDeviceButton.type = "button";
    receiveDeviceButton.textContent = "Receive Device";
    receiveDeviceButton.addEventListener("click", receiveDevice);
    gameButtonsContainer.appendChild(receiveDeviceButton);
}

function passDevice() {
    hideShips(getPlayerOne());
    hideShips(getPlayerTwo());
    const passDeviceButton = document.querySelector(".pass-device-button");
    passDeviceButton.remove();
    insertReceiveDeviceButton();

    const playerOneGridBoxes = document.querySelectorAll(
        ".player-one-board-container > .grid-box"
    );
    const playerTwoGridBoxes = document.querySelectorAll(
        ".player-two-board-container > .grid-box"
    );
    playerOneGridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener("click", handleAttack);
    });
    playerTwoGridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener("click", handleAttack);
    });
}

export function insertPassDeviceButton() {
    const passDeviceButton = document.createElement("button");
    passDeviceButton.className = "pass-device-button";
    passDeviceButton.type = "button";
    passDeviceButton.textContent = "Pass Device";
    passDeviceButton.addEventListener("click", passDevice);
    gameButtonsContainer.appendChild(passDeviceButton);
}
