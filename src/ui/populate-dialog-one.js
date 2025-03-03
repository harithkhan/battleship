import { getPlayerOne, gameStart } from "../logic/game-controller";
import { playerOneShips } from "../logic/ships";
import { refreshWhoCanAttack } from "./attack";
import { displayPlayerTurn } from "./information-display";
import {
    renderPlayerOneBoard,
    renderPlayerOneDialogBoard,
    renderComputerBoard,
} from "./render.boards";
import {
    assignComputerShips,
    handleResetOneClick,
    playerOneRandom,
} from "./ships-assignment";

const playerOneDialog = document.querySelector(".place-ships-one");
const playerOneBoard = document.querySelector(".player-one-dialog-board");
const rotateButton = document.querySelector(".rotate-button");

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

function rotateShips() {
    const newCarrierOne = document.querySelector(".carrier-one");
    const newBattleshipOne = document.querySelector(".battleship-one");
    const newDestroyerOne = document.querySelector(".destroyer-one");
    const newSubmarineOne = document.querySelector(".submarine-one");
    const newPatrolBoatOne = document.querySelector(".patrol-boat-one");

    if (rotationState === "default") {
        if (newCarrierOne) {
            newCarrierOne.style.width = "3rem";
            newCarrierOne.style.height = "15rem";
            newCarrierOne.gridArea = "2 / 2 / 7 / 3";
        }
        if (newBattleshipOne) {
            newBattleshipOne.style.width = "3rem";
            newBattleshipOne.style.height = "12rem";
            newBattleshipOne.style.gridArea = "2 / 4 / 6 / 5";
        }
        if (newDestroyerOne) {
            newDestroyerOne.style.width = "3rem";
            newDestroyerOne.style.height = "9rem";
            newDestroyerOne.style.gridArea = "2 / 6 / 5 / 7";
        }
        if (newSubmarineOne) {
            newSubmarineOne.style.width = "3rem";
            newSubmarineOne.style.height = "9rem";
            newSubmarineOne.style.gridArea = "7 / 4 / 10 / 5";
        }
        if (newPatrolBoatOne) {
            newPatrolBoatOne.style.width = "3rem";
            newPatrolBoatOne.style.height = "6rem";
            newPatrolBoatOne.style.gridArea = "6 / 6 / 8 / 7";
        }
        rotationState = "rotated";
    } else if (rotationState === "rotated") {
        if (newCarrierOne) {
            newCarrierOne.style.width = "15rem";
            newCarrierOne.style.height = "3rem";
            newCarrierOne.gridArea = "2 / 2 / 3 / 7";
        }
        if (newBattleshipOne) {
            newBattleshipOne.style.width = "12rem";
            newBattleshipOne.style.height = "3rem";
            newBattleshipOne.style.gridArea = "4 / 2 / 5 / 6";
        }
        if (newDestroyerOne) {
            newDestroyerOne.style.width = "9rem";
            newDestroyerOne.style.height = "3rem";
            newDestroyerOne.style.gridArea = "6 / 2 / 7 / 5";
        }
        if (newSubmarineOne) {
            newSubmarineOne.style.width = "9rem";
            newSubmarineOne.style.height = "3rem";
            newSubmarineOne.style.gridArea = "8 / 2 / 9 / 5";
        }
        if (newPatrolBoatOne) {
            newPatrolBoatOne.style.width = "6rem";
            newPatrolBoatOne.style.height = "3rem";
            newPatrolBoatOne.style.gridArea = "9 / 5 / 10 / 7";
        }
        rotationState = "default";
    }
}

const playButton = document.querySelector(".play-button-one");
const randomButton = document.querySelector(".random-button");
const resetButtonOne = document.querySelector(".reset-button-one");
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

let draggedShip = null;

export function resetDraggedShip() {
    draggedShip = null;
    rotationState = "default";
}

export function setDraggedShip(event) {
    draggedShip = event.target.className;
}

export function populateDialogOne() {
    playerOneDialog.showModal();
    createPlayerOneBoard();

    shipsContainer.innerHTML = "";

    const carrierOne = document.createElement("div");
    const battleshipOne = document.createElement("div");
    const destroyerOne = document.createElement("div");
    const submarineOne = document.createElement("div");
    const patrolBoatOne = document.createElement("div");

    carrierOne.className = "carrier-one";
    battleshipOne.className = "battleship-one";
    destroyerOne.className = "destroyer-one";
    submarineOne.className = "submarine-one";
    patrolBoatOne.className = "patrol-boat-one";

    shipsContainer.appendChild(carrierOne);
    shipsContainer.appendChild(battleshipOne);
    shipsContainer.appendChild(destroyerOne);
    shipsContainer.appendChild(submarineOne);
    shipsContainer.appendChild(patrolBoatOne);

    carrierOne.addEventListener("dragstart", setDraggedShip);
    battleshipOne.addEventListener("dragstart", setDraggedShip);
    destroyerOne.addEventListener("dragstart", setDraggedShip);
    submarineOne.addEventListener("dragstart", setDraggedShip);
    patrolBoatOne.addEventListener("dragstart", setDraggedShip);

    rotateButton.addEventListener("click", rotateShips);
    randomButton.addEventListener("click", playerOneRandom);
    resetButtonOne.addEventListener("click", handleResetOneClick);
    playButton.addEventListener("click", handlePlayClick);
}

export function handleShipDrop(event) {
    event.preventDefault();

    const newCarrierOne = document.querySelector(".carrier-one");
    const newBattleshipOne = document.querySelector(".battleship-one");
    const newDestroyerOne = document.querySelector(".destroyer-one");
    const newSubmarineOne = document.querySelector(".submarine-one");
    const newPatrolBoatOne = document.querySelector(".patrol-boat-one");

    if (newCarrierOne) {
        newCarrierOne.addEventListener("dragstart", setDraggedShip);
    }
    if (newBattleshipOne) {
        newBattleshipOne.addEventListener("dragstart", setDraggedShip);
    }
    if (newDestroyerOne) {
        newDestroyerOne.addEventListener("dragstart", setDraggedShip);
    }
    if (newSubmarineOne) {
        newSubmarineOne.addEventListener("dragstart", setDraggedShip);
    }
    if (newPatrolBoatOne) {
        newPatrolBoatOne.addEventListener("dragstart", setDraggedShip);
    }
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
        newCarrierOne.remove();
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
        newCarrierOne.remove();
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
        newBattleshipOne.remove();
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
        newBattleshipOne.remove();
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
        newDestroyerOne.remove();
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
        newDestroyerOne.remove();
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
        newSubmarineOne.remove();
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
        newSubmarineOne.remove();
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
        newPatrolBoatOne.remove();
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
        newPatrolBoatOne.remove();
    }
    renderPlayerOneBoard();
    renderPlayerOneDialogBoard();
}
