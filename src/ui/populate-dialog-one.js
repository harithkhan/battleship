import { getPlayerOne, gameStart } from "../logic/game-controller";
import { playerOneShips } from "../logic/ships";
import { refreshWhoCanAttack } from "./attack";
import { displayPlayerTurn } from "./information-display";
import {
    renderPlayerOneBoard,
    renderPlayerOneDialogBoard,
    renderComputerBoard,
} from "./render.boards";
import { assignComputerShips, playerOneRandom } from "./ships-assignment";

const playerOneDialog = document.querySelector(".place-ships-one");
const playerOneBoard = document.querySelector(".player-one-dialog-board");
const rotateButton = document.querySelector(".rotate-button");
const dialogOneHeader = document.querySelector(".dialog-one-header");

dialogOneHeader.textContent = "Place your ships!";

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
        playerOneBoard.appendChild(gridBox);
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
const carrierOne = document.querySelector(".carrier-one");
const battleshipOne = document.querySelector(".battleship-one");
const destroyerOne = document.querySelector(".destroyer-one");
const submarineOne = document.querySelector(".submarine-one");
const patrolBoatOne = document.querySelector(".patrol-boat-one");

function rotateShips() {
    if (rotationState === "default") {
        carrierOne.style.width = "3rem";
        carrierOne.style.height = "15rem";
        carrierOne.gridArea = "2 / 2 / 7 / 3";
        battleshipOne.style.width = "3rem";
        battleshipOne.style.height = "12rem";
        battleshipOne.style.gridArea = "2 / 4 / 6 / 5";
        destroyerOne.style.width = "3rem";
        destroyerOne.style.height = "9rem";
        destroyerOne.style.gridArea = "2 / 6 / 5 / 7";
        submarineOne.style.width = "3rem";
        submarineOne.style.height = "9rem";
        submarineOne.style.gridArea = "7 / 4 / 10 / 5";
        patrolBoatOne.style.width = "3rem";
        patrolBoatOne.style.height = "6rem";
        patrolBoatOne.style.gridArea = "6 / 6 / 8 / 7";
        rotationState = "rotated";
    } else if (rotationState === "rotated") {
        carrierOne.style.width = "15rem";
        carrierOne.style.height = "3rem";
        carrierOne.gridArea = "2 / 2 / 3 / 7";
        battleshipOne.style.width = "12rem";
        battleshipOne.style.height = "3rem";
        battleshipOne.style.gridArea = "4 / 2 / 5 / 6";
        destroyerOne.style.width = "9rem";
        destroyerOne.style.height = "3rem";
        destroyerOne.style.gridArea = "6 / 2 / 7 / 5";
        submarineOne.style.width = "9rem";
        submarineOne.style.height = "3rem";
        submarineOne.style.gridArea = "8 / 2 / 9 / 5";
        patrolBoatOne.style.width = "6rem";
        patrolBoatOne.style.height = "3rem";
        patrolBoatOne.style.gridArea = "9 / 5 / 10 / 7";
        rotationState = "default";
    }
}

const playButton = document.querySelector(".play-button-one");
const randomButton = document.querySelector(".random-button");
const shipsContainer = document.querySelector(".dialog-one-ships-container");

function handlePlayClick() {
    if (shipsContainer.childElementCount === 0) {
        assignComputerShips();
        renderComputerBoard();
        renderPlayerOneBoard();
        gameStart();
        displayPlayerTurn();
        refreshWhoCanAttack();
        playerOneDialog.close();
    }
}

export function populateDialogOne() {
    playerOneDialog.showModal();
    createPlayerOneBoard();
    rotateButton.addEventListener("click", rotateShips);
    randomButton.addEventListener("click", playerOneRandom);
    playButton.addEventListener("click", handlePlayClick);
}

let draggedShip = null;

function setDraggedShip(event) {
    draggedShip = event.target.className;
}

carrierOne.addEventListener("dragstart", setDraggedShip);
battleshipOne.addEventListener("dragstart", setDraggedShip);
destroyerOne.addEventListener("dragstart", setDraggedShip);
submarineOne.addEventListener("dragstart", setDraggedShip);
patrolBoatOne.addEventListener("dragstart", setDraggedShip);

function handleShipDrop(event) {
    event.preventDefault();
    const dropCoordinatesStr = event.target.dataset.coordinates;
    const dropCoordinatesArrStr = dropCoordinatesStr.split(",");
    const dropCoordinatesArr = [
        parseInt(dropCoordinatesArrStr[0], 10),
        parseInt(dropCoordinatesArrStr[1], 10),
    ];
    const dropCoordinatesState = event.target.dataset.spaceState;
    if (
        draggedShip === "carrier-one" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 4 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.carrier,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        carrierOne.remove();
    }
    if (
        draggedShip === "carrier-one" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 4 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.carrier,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        carrierOne.remove();
    }
    if (
        draggedShip === "battleship-one" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 3 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.battleship,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        battleshipOne.remove();
    }
    if (
        draggedShip === "battleship-one" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 3 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.battleship,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        battleshipOne.remove();
    }
    if (
        draggedShip === "destroyer-one" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.destroyer,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        destroyerOne.remove();
    }
    if (
        draggedShip === "destroyer-one" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.destroyer,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        destroyerOne.remove();
    }
    if (
        draggedShip === "submarine-one" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.submarine,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        submarineOne.remove();
    }
    if (
        draggedShip === "submarine-one" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.submarine,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        submarineOne.remove();
    }
    if (
        draggedShip === "patrol-boat-one" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 1 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.patrolBoat,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        patrolBoatOne.remove();
    }
    if (
        draggedShip === "patrol-boat-one" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 1 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerOne()
            .getBoard()
            .assignShip(
                playerOneShips.patrolBoat,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        patrolBoatOne.remove();
    }
    renderPlayerOneBoard();
    renderPlayerOneDialogBoard();
}
