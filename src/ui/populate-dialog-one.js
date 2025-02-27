import { getPlayerOne, gameStart } from "../logic/game-controller";
import { playerOneShips } from "../logic/ships";
import {
    renderPlayerOneBoard,
    renderPlayerOneDialogBoard,
    renderPlayerTwoBoard,
} from "./render.boards";
import { assignComputerShips } from "./ships-assignment";

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
const carrier = document.querySelector(".carrier");
const battleship = document.querySelector(".battleship");
const destroyer = document.querySelector(".destroyer");
const submarine = document.querySelector(".submarine");
const patrolBoat = document.querySelector(".patrol-boat");

function rotateShips() {
    if (rotationState === "default") {
        carrier.style.width = "3rem";
        carrier.style.height = "15rem";
        carrier.gridArea = "2 / 2 / 7 / 3";
        battleship.style.width = "3rem";
        battleship.style.height = "12rem";
        battleship.style.gridArea = "2 / 4 / 6 / 5";
        destroyer.style.width = "3rem";
        destroyer.style.height = "9rem";
        destroyer.style.gridArea = "2 / 6 / 5 / 7";
        submarine.style.width = "3rem";
        submarine.style.height = "9rem";
        submarine.style.gridArea = "7 / 4 / 10 / 5";
        patrolBoat.style.width = "3rem";
        patrolBoat.style.height = "6rem";
        patrolBoat.style.gridArea = "6 / 6 / 8 / 7";
        rotationState = "rotated";
    } else if (rotationState === "rotated") {
        carrier.style.width = "15rem";
        carrier.style.height = "3rem";
        carrier.gridArea = "2 / 2 / 3 / 7";
        battleship.style.width = "12rem";
        battleship.style.height = "3rem";
        battleship.style.gridArea = "4 / 2 / 5 / 6";
        destroyer.style.width = "9rem";
        destroyer.style.height = "3rem";
        destroyer.style.gridArea = "6 / 2 / 7 / 5";
        submarine.style.width = "9rem";
        submarine.style.height = "3rem";
        submarine.style.gridArea = "8 / 2 / 9 / 5";
        patrolBoat.style.width = "6rem";
        patrolBoat.style.height = "3rem";
        patrolBoat.style.gridArea = "9 / 5 / 10 / 7";
        rotationState = "default";
    }
}

const playButton = document.querySelector(".play-button-one");
const shipsContainer = document.querySelector(".dialog-one-ships-container");

function handlePlayClick() {
    if (shipsContainer.childElementCount === 0) {
        assignComputerShips();
        renderPlayerTwoBoard();
        gameStart();
        playerOneDialog.close();
    }
}

export function populateDialogOne() {
    playerOneDialog.showModal();
    createPlayerOneBoard();
    rotateButton.addEventListener("click", rotateShips);
    playButton.addEventListener("click", handlePlayClick);
}

let draggedShip = null;

function setDraggedShip(event) {
    draggedShip = event.target.className;
}

carrier.addEventListener("dragstart", setDraggedShip);
battleship.addEventListener("dragstart", setDraggedShip);
destroyer.addEventListener("dragstart", setDraggedShip);
submarine.addEventListener("dragstart", setDraggedShip);
patrolBoat.addEventListener("dragstart", setDraggedShip);

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
        draggedShip === "carrier" &&
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
        carrier.remove();
    }
    if (
        draggedShip === "carrier" &&
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
        carrier.remove();
    }
    if (
        draggedShip === "battleship" &&
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
        battleship.remove();
    }
    if (
        draggedShip === "battleship" &&
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
        battleship.remove();
    }
    if (
        draggedShip === "destroyer" &&
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
        destroyer.remove();
    }
    if (
        draggedShip === "destroyer" &&
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
        destroyer.remove();
    }
    if (
        draggedShip === "submarine" &&
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
        submarine.remove();
    }
    if (
        draggedShip === "submarine" &&
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
        submarine.remove();
    }
    if (
        draggedShip === "patrol-boat" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 2 < 10 &&
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
        patrolBoat.remove();
    }
    if (
        draggedShip === "patrol-boat" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 2 < 10 &&
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
        patrolBoat.remove();
    }
    renderPlayerOneBoard();
    renderPlayerOneDialogBoard();
}
