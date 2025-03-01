import { getPlayerOne, getPlayerTwo, gameStart } from "../logic/game-controller";
import { playerOneShips, playerTwoShips } from "../logic/ships";
import { refreshWhoCanAttack } from "./attack";
import { displayPlayerTurn } from "./information-display";
import {
    renderPlayerOneBoard,
    renderPlayerOneDialogBoardMultiplayer,
    renderPlayerTwoBoard,
    renderTwoPlayerDialogBoardMultiplayer
} from "./render.boards";
import { assignComputerShips, playerOneRandom } from "./ships-assignment";

const dialogTwo = document.querySelector(".place-ships-two");
const dialogTwoBoard = document.querySelector(".two-player-dialog-board");
const rotateButton = document.querySelector(".rotate-button");
const dialogTwoHeader = document.querySelector(".dialog-two-header");

dialogTwoHeader.textContent = "Player one, place your ships!";

function createPlayerOneBoard() {
    let initialCoordinates = [0, 9];
    for (let i = 0; i < 100; i++) {
        const coordinatesStr = initialCoordinates.join(",");
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        gridBox.dataset.coordinates = coordinatesStr;
        gridBox.dataset.spaceState = "water";
        gridBox.dataset.hitStatus = "not hit";
        gridBox.dataset.player = "player-one";
        dialogTwoBoard.appendChild(gridBox);
        initialCoordinates = [initialCoordinates[0] + 1, initialCoordinates[1]];
        if (initialCoordinates[0] > 9) {
            initialCoordinates = [0, initialCoordinates[1] - 1];
        }
        gridBox.addEventListener("dragover", (event) => {
            event.preventDefault(); // To allow dropping
        });
        gridBox.addEventListener("drop", (event) => {
            event.preventDefault();
            // eslint-disable-next-line no-use-before-define
            handleShipDrop(event);
        });
    }
}

let rotationState = "default";
const carrierTwo = document.querySelector(".carrier-two");
const battleshipTwo = document.querySelector(".battleship-two");
const destroyerTwo = document.querySelector(".destroyer-two");
const submarineTwo = document.querySelector(".submarine-two");
const patrolBoatTwo = document.querySelector(".patrol-boat-two");

function rotateShips() {
    if (rotationState === "default") {
        carrierTwo.style.width = "3rem";
        carrierTwo.style.height = "15rem";
        carrierTwo.gridArea = "2 / 2 / 7 / 3";
        battleshipTwo.style.width = "3rem";
        battleshipTwo.style.height = "12rem";
        battleshipTwo.style.gridArea = "2 / 4 / 6 / 5";
        destroyerTwo.style.width = "3rem";
        destroyerTwo.style.height = "9rem";
        destroyerTwo.style.gridArea = "2 / 6 / 5 / 7";
        submarineTwo.style.width = "3rem";
        submarineTwo.style.height = "9rem";
        submarineTwo.style.gridArea = "7 / 4 / 10 / 5";
        patrolBoatTwo.style.width = "3rem";
        patrolBoatTwo.style.height = "6rem";
        patrolBoatTwo.style.gridArea = "6 / 6 / 8 / 7";
        rotationState = "rotated";
    } else if (rotationState === "rotated") {
        carrierTwo.style.width = "15rem";
        carrierTwo.style.height = "3rem";
        carrierTwo.gridArea = "2 / 2 / 3 / 7";
        battleshipTwo.style.width = "12rem";
        battleshipTwo.style.height = "3rem";
        battleshipTwo.style.gridArea = "4 / 2 / 5 / 6";
        destroyerTwo.style.width = "9rem";
        destroyerTwo.style.height = "3rem";
        destroyerTwo.style.gridArea = "6 / 2 / 7 / 5";
        submarineTwo.style.width = "9rem";
        submarineTwo.style.height = "3rem";
        submarineTwo.style.gridArea = "8 / 2 / 9 / 5";
        patrolBoatTwo.style.width = "6rem";
        patrolBoatTwo.style.height = "3rem";
        patrolBoatTwo.style.gridArea = "9 / 5 / 10 / 7";
        rotationState = "default";
    }
}

const playButton = document.querySelector(".play-button-two");
const randomButton = document.querySelector(".random-button");
const shipsContainer = document.querySelector(".dialog-two-ships-container");
const placeButton = document.querySelector(".place-button");

function handlePlayClick() {
    if (shipsContainer.childElementCount === 0) {
        renderPlayerTwoBoard();
        renderPlayerOneBoard();
        gameStart();
        displayPlayerTurn();
        refreshWhoCanAttack();
        dialogTwo.close();
    }
}

export function populateDialogTwo() {
    dialogTwo.showModal();
    createPlayerOneBoard();
    rotateButton.addEventListener("click", rotateShips);
    randomButton.addEventListener("click", playerOneRandom);
    playButton.addEventListener("click", handlePlayClick);
}
