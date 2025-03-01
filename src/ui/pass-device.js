import {
    getPlayerOne,
    getPlayerTurn,
    getPlayerTwo,
} from "../logic/game-controller";
import { hideShips } from "./hide-ships";
import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./render.boards";

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
}

export function insertPassDeviceButton() {
    const passDeviceButton = document.createElement("button");
    passDeviceButton.className = "pass-device-button";
    passDeviceButton.type = "button";
    passDeviceButton.textContent = "Pass Device";
    passDeviceButton.addEventListener("click", passDevice);
    gameButtonsContainer.appendChild(passDeviceButton);
}
