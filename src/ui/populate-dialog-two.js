import {
    getPlayerOne,
    getPlayerTwo,
    gameStart,
} from "../logic/game-controller";
import { playerOneShips, playerTwoShips } from "../logic/ships";
import { refreshWhoCanAttack } from "./attack";
import { displayPlayerTurn } from "./information-display";
import {
    renderPlayerOneBoard,
    renderPlayerOneDialogBoardMultiplayer,
    renderPlayerTwoBoard,
    renderPlayerTwoDialogBoardMultiplayer,
} from "./render.boards";
import { playerOneRandom, playerTwoRandom } from "./ships-assignment";
import { hideShips } from "./hide-ships";
import * as gameController from "../logic/game-controller";

const dialogTwo = document.querySelector(".place-ships-two");
const dialogTwoBoard = document.querySelector(".two-player-dialog-board");
const rotateButton = document.querySelector(".rotate-button-two");

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
            handleShipDropPlayerOne(event);
        });
    }
}

let rotationState = "default";

const carrierTwo = document.querySelector(".carrier-two");
const battleshipTwo = document.querySelector(".battleship-two");
const destroyerTwo = document.querySelector(".destroyer-two");
const submarineTwo = document.querySelector(".submarine-two");
const patrolBoatTwo = document.querySelector(".patrol-boat-two");

let placementTurn = "player-one";

function rotateShips() {
    const newCarrierTwo = document.querySelector(".carrier-two");
    const newBattleshipTwo = document.querySelector(".battleship-two");
    const newDestroyerTwo = document.querySelector(".destroyer-two");
    const newSubmarineTwo = document.querySelector(".submarine-two");
    const newPatrolBoatTwo = document.querySelector(".patrol-boat-two");

    if (rotationState === "default") {
        if (newCarrierTwo) {
            newCarrierTwo.style.width = "3rem";
            newCarrierTwo.style.height = "15rem";
            newCarrierTwo.gridArea = "2 / 2 / 7 / 3";
        }
        if (newBattleshipTwo) {
            newBattleshipTwo.style.width = "3rem";
            newBattleshipTwo.style.height = "12rem";
            newBattleshipTwo.style.gridArea = "2 / 4 / 6 / 5";
        }
        if (newDestroyerTwo) {
            newDestroyerTwo.style.width = "3rem";
            newDestroyerTwo.style.height = "9rem";
            newDestroyerTwo.style.gridArea = "2 / 6 / 5 / 7";
        }
        if (newSubmarineTwo) {
            newSubmarineTwo.style.width = "3rem";
            newSubmarineTwo.style.height = "9rem";
            newSubmarineTwo.style.gridArea = "7 / 4 / 10 / 5";
        }
        if (newPatrolBoatTwo) {
            newPatrolBoatTwo.style.width = "3rem";
            newPatrolBoatTwo.style.height = "6rem";
            newPatrolBoatTwo.style.gridArea = "6 / 6 / 8 / 7";
        }
        rotationState = "rotated";
    } else if (rotationState === "rotated") {
        if (newCarrierTwo) {
            newCarrierTwo.style.width = "15rem";
            newCarrierTwo.style.height = "3rem";
            newCarrierTwo.gridArea = "2 / 2 / 3 / 7";
        }
        if (newBattleshipTwo) {
            newBattleshipTwo.style.width = "12rem";
            newBattleshipTwo.style.height = "3rem";
            newBattleshipTwo.style.gridArea = "4 / 2 / 5 / 6";
        }
        if (newDestroyerTwo) {
            newDestroyerTwo.style.width = "9rem";
            newDestroyerTwo.style.height = "3rem";
            newDestroyerTwo.style.gridArea = "6 / 2 / 7 / 5";
        }
        if (newSubmarineTwo) {
            newSubmarineTwo.style.width = "9rem";
            newSubmarineTwo.style.height = "3rem";
            newSubmarineTwo.style.gridArea = "8 / 2 / 9 / 5";
        }
        if (newPatrolBoatTwo) {
            newPatrolBoatTwo.style.width = "6rem";
            newPatrolBoatTwo.style.height = "3rem";
            newPatrolBoatTwo.style.gridArea = "9 / 5 / 10 / 7";
        }
        rotationState = "default";
    }
}

const randomButton = document.querySelector(".random-button-two");
const resetButtonTwo = document.querySelector(".reset-button-two");
const shipsContainer = document.querySelector(".dialog-two-ships-container");

function handlePlayClick() {
    if (
        shipsContainer.childElementCount === 0 &&
        placementTurn === "player-two"
    ) {
        const playButton = document.querySelector(".play-button-two");
        playButton.remove();
        renderPlayerTwoBoard();
        renderPlayerOneBoard();
        hideShips(getPlayerTwo());
        gameStart();
        displayPlayerTurn();
        refreshWhoCanAttack();
        placementTurn = "player-one";
        dialogTwo.close();
    }
}

let draggedShip = null;

function resetDraggedShip() {
    draggedShip = null;
    rotationState = "default";
}

function setDraggedShip(event) {
    draggedShip = event.target.className;
}

function handleResetTwoPlayerOneClick() {
    shipsContainer.innerHTML = "";
    const gridBoxes = document.querySelectorAll(
        ".two-player-dialog-board > .grid-box"
    );
    gridBoxes.forEach((i) => {
        const gridBox = i;
        gridBox.dataset.spaceState = "water";
    });
    gameController.getPlayerOne().getBoard().resetBoard();
    gridBoxes.forEach((i) => {
        const gridBox = i;
        gridBox.addEventListener("dragover", (event) => {
            event.preventDefault(); // To allow dropping
        });
        gridBox.addEventListener("drop", (event) => {
            event.preventDefault();
            // eslint-disable-next-line no-use-before-define
            handleShipDropPlayerOne(event);
        });
    });

    const newCarrierTwo = document.createElement("div");
    newCarrierTwo.className = "carrier-two";
    newCarrierTwo.draggable = "true";

    const newBattleshipTwo = document.createElement("div");
    newBattleshipTwo.className = "battleship-two";
    newBattleshipTwo.draggable = "true";

    const newDestroyerTwo = document.createElement("div");
    newDestroyerTwo.className = "destroyer-two";
    newDestroyerTwo.draggable = "true";

    const newSubmarineTwo = document.createElement("div");
    newSubmarineTwo.className = "submarine-two";
    newSubmarineTwo.draggable = "true";

    const newPatrolBoatTwo = document.createElement("div");
    newPatrolBoatTwo.className = "patrol-boat-two";
    newPatrolBoatTwo.draggable = "true";

    if (newCarrierTwo) {
        newCarrierTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newBattleshipTwo) {
        newBattleshipTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newDestroyerTwo) {
        newDestroyerTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newSubmarineTwo) {
        newSubmarineTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newPatrolBoatTwo) {
        newPatrolBoatTwo.addEventListener("dragstart", setDraggedShip);
    }

    shipsContainer.appendChild(newCarrierTwo);
    shipsContainer.appendChild(newBattleshipTwo);
    shipsContainer.appendChild(newDestroyerTwo);
    shipsContainer.appendChild(newSubmarineTwo);
    shipsContainer.appendChild(newPatrolBoatTwo);

    resetDraggedShip();
}

function handleResetTwoPlayerTwoClick() {
    shipsContainer.innerHTML = "";
    const gridBoxes = document.querySelectorAll(
        ".two-player-dialog-board > .grid-box"
    );
    gridBoxes.forEach((i) => {
        const gridBox = i;
        gridBox.dataset.spaceState = "water";
    });
    gameController.getPlayerTwo().getBoard().resetBoard();
    gridBoxes.forEach((i) => {
        const gridBox = i;
        gridBox.addEventListener("dragover", (event) => {
            event.preventDefault(); // To allow dropping
        });
        gridBox.addEventListener("drop", (event) => {
            event.preventDefault();
            // eslint-disable-next-line no-use-before-define
            handleShipDropPlayerTwo(event);
        });
    });

    const newCarrierTwo = document.createElement("div");
    newCarrierTwo.className = "carrier-two";
    newCarrierTwo.draggable = "true";

    const newBattleshipTwo = document.createElement("div");
    newBattleshipTwo.className = "battleship-two";
    newBattleshipTwo.draggable = "true";

    const newDestroyerTwo = document.createElement("div");
    newDestroyerTwo.className = "destroyer-two";
    newDestroyerTwo.draggable = "true";

    const newSubmarineTwo = document.createElement("div");
    newSubmarineTwo.className = "submarine-two";
    newSubmarineTwo.draggable = "true";

    const newPatrolBoatTwo = document.createElement("div");
    newPatrolBoatTwo.className = "patrol-boat-two";
    newPatrolBoatTwo.draggable = "true";

    if (newCarrierTwo) {
        newCarrierTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newBattleshipTwo) {
        newBattleshipTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newDestroyerTwo) {
        newDestroyerTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newSubmarineTwo) {
        newSubmarineTwo.addEventListener("dragstart", setDraggedShip);
    }
    if (newPatrolBoatTwo) {
        newPatrolBoatTwo.addEventListener("dragstart", setDraggedShip);
    }

    shipsContainer.appendChild(newCarrierTwo);
    shipsContainer.appendChild(newBattleshipTwo);
    shipsContainer.appendChild(newDestroyerTwo);
    shipsContainer.appendChild(newSubmarineTwo);
    shipsContainer.appendChild(newPatrolBoatTwo);

    resetDraggedShip();
}

carrierTwo.addEventListener("dragstart", setDraggedShip);
battleshipTwo.addEventListener("dragstart", setDraggedShip);
destroyerTwo.addEventListener("dragstart", setDraggedShip);
submarineTwo.addEventListener("dragstart", setDraggedShip);
patrolBoatTwo.addEventListener("dragstart", setDraggedShip);

function handleShipDropPlayerOne(event) {
    event.preventDefault();

    const newCarrierTwo = document.querySelector(".carrier-two");
    const newBattleshipTwo = document.querySelector(".battleship-two");
    const newDestroyerTwo = document.querySelector(".destroyer-two");
    const newSubmarineTwo = document.querySelector(".submarine-two");
    const newPatrolBoatTwo = document.querySelector(".patrol-boat-two");

    const dropCoordinatesStr = event.target.dataset.coordinates;
    const dropCoordinatesArrStr = dropCoordinatesStr.split(",");
    const dropCoordinatesArr = [
        parseInt(dropCoordinatesArrStr[0], 10),
        parseInt(dropCoordinatesArrStr[1], 10),
    ];
    const dropCoordinatesState = event.target.dataset.spaceState;
    if (
        draggedShip === "carrier-two" &&
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
        newCarrierTwo.remove();
    }
    if (
        draggedShip === "carrier-two" &&
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
        newCarrierTwo.remove();
    }
    if (
        draggedShip === "battleship-two" &&
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
        newBattleshipTwo.remove();
    }
    if (
        draggedShip === "battleship-two" &&
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
        newBattleshipTwo.remove();
    }
    if (
        draggedShip === "destroyer-two" &&
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
        newDestroyerTwo.remove();
    }
    if (
        draggedShip === "destroyer-two" &&
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
        newDestroyerTwo.remove();
    }
    if (
        draggedShip === "submarine-two" &&
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
        newSubmarineTwo.remove();
    }
    if (
        draggedShip === "submarine-two" &&
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
        newSubmarineTwo.remove();
    }
    if (
        draggedShip === "patrol-boat-two" &&
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
        newPatrolBoatTwo.remove();
    }
    if (
        draggedShip === "patrol-boat-two" &&
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
        newPatrolBoatTwo.remove();
    }
    renderPlayerOneBoard();
    renderPlayerOneDialogBoardMultiplayer();
}

function handleShipDropPlayerTwo(event) {
    event.preventDefault();

    const newCarrierTwo = document.querySelector(".carrier-two");
    const newBattleshipTwo = document.querySelector(".battleship-two");
    const newDestroyerTwo = document.querySelector(".destroyer-two");
    const newSubmarineTwo = document.querySelector(".submarine-two");
    const newPatrolBoatTwo = document.querySelector(".patrol-boat-two");

    const dropCoordinatesStr = event.target.dataset.coordinates;
    const dropCoordinatesArrStr = dropCoordinatesStr.split(",");
    const dropCoordinatesArr = [
        parseInt(dropCoordinatesArrStr[0], 10),
        parseInt(dropCoordinatesArrStr[1], 10),
    ];
    const dropCoordinatesState = event.target.dataset.spaceState;
    if (
        draggedShip === "carrier-two" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 4 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.carrier,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        newCarrierTwo.remove();
    }
    if (
        draggedShip === "carrier-two" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 4 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.carrier,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        newCarrierTwo.remove();
    }
    if (
        draggedShip === "battleship-two" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 3 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.battleship,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        newBattleshipTwo.remove();
    }
    if (
        draggedShip === "battleship-two" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 3 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.battleship,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        newBattleshipTwo.remove();
    }
    if (
        draggedShip === "destroyer-two" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.destroyer,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        newDestroyerTwo.remove();
    }
    if (
        draggedShip === "destroyer-two" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.destroyer,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        newDestroyerTwo.remove();
    }
    if (
        draggedShip === "submarine-two" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.submarine,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        newSubmarineTwo.remove();
    }
    if (
        draggedShip === "submarine-two" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 2 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.submarine,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        newSubmarineTwo.remove();
    }
    if (
        draggedShip === "patrol-boat-two" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 1 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.patrolBoat,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "x"
            );
        newPatrolBoatTwo.remove();
    }
    if (
        draggedShip === "patrol-boat-two" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 1 < 10 &&
        dropCoordinatesState === "water"
    ) {
        getPlayerTwo()
            .getBoard()
            .assignShip(
                playerTwoShips.patrolBoat,
                dropCoordinatesArr[0],
                dropCoordinatesArr[1],
                "y"
            );
        newPatrolBoatTwo.remove();
    }
    renderPlayerTwoBoard();
    renderPlayerTwoDialogBoardMultiplayer();
}

function createPlayerTwoBoard() {
    dialogTwoBoard.innerHTML = "";
    let initialCoordinates = [0, 9];
    for (let i = 0; i < 100; i++) {
        const coordinatesStr = initialCoordinates.join(",");
        const gridBox = document.createElement("div");
        gridBox.className = "grid-box";
        gridBox.dataset.coordinates = coordinatesStr;
        gridBox.dataset.spaceState = "water";
        gridBox.dataset.hitStatus = "not hit";
        gridBox.dataset.player = "player-two";
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
            handleShipDropPlayerTwo(event);
        });
    }
}

function handlePlaceClick() {
    const newCarrierTwo = document.createElement("div");
    newCarrierTwo.className = "carrier-two";
    newCarrierTwo.draggable = "true";

    const newBattleshipTwo = document.createElement("div");
    newBattleshipTwo.className = "battleship-two";
    newBattleshipTwo.draggable = "true";

    const newDestroyerTwo = document.createElement("div");
    newDestroyerTwo.className = "destroyer-two";
    newDestroyerTwo.draggable = "true";

    const newSubmarineTwo = document.createElement("div");
    newSubmarineTwo.className = "submarine-two";
    newSubmarineTwo.draggable = "true";

    const newPatrolBoatTwo = document.createElement("div");
    newPatrolBoatTwo.className = "patrol-boat-two";
    newPatrolBoatTwo.draggable = "true";
    if (
        placementTurn === "player-one" &&
        shipsContainer.childElementCount === 0
    ) {
        dialogTwoBoard.innerHTML = "";
        createPlayerTwoBoard();
        randomButton.removeEventListener("click", playerOneRandom);
        randomButton.addEventListener("click", playerTwoRandom);

        newCarrierTwo.addEventListener("dragstart", setDraggedShip);
        newBattleshipTwo.addEventListener("dragstart", setDraggedShip);
        newDestroyerTwo.addEventListener("dragstart", setDraggedShip);
        newSubmarineTwo.addEventListener("dragstart", setDraggedShip);
        newPatrolBoatTwo.addEventListener("dragstart", setDraggedShip);

        shipsContainer.appendChild(newCarrierTwo);
        shipsContainer.appendChild(newBattleshipTwo);
        shipsContainer.appendChild(newDestroyerTwo);
        shipsContainer.appendChild(newSubmarineTwo);
        shipsContainer.appendChild(newPatrolBoatTwo);

        placementTurn = "player-two";
        const placeButton = document.querySelector(".place-button-two");
        placeButton.remove();

        const playButton = document.createElement("button");
        playButton.type = "button";
        playButton.textContent = "Play!";
        playButton.className = "play-button-two";
        playButton.addEventListener("click", handlePlayClick);
        const buttonsContainer = document.querySelector(
            ".dialog-two-buttons-container"
        );
        buttonsContainer.appendChild(playButton);
        const dialogTwoHeader = document.querySelector(".dialog-two-header");
        dialogTwoHeader.textContent = `${getPlayerTwo().getName()}, place your ships!`;

        resetButtonTwo.removeEventListener(
            "click",
            handleResetTwoPlayerOneClick
        );
        resetButtonTwo.addEventListener("click", handleResetTwoPlayerTwoClick);
    }
}

export function populateDialogTwo() {
    placementTurn = "player-one";
    dialogTwo.showModal();
    createPlayerOneBoard();

    shipsContainer.innerHTML = "";
    const newCarrierTwo = document.createElement("div");
    const newBattleshipTwo = document.createElement("div");
    const newDestroyerTwo = document.createElement("div");
    const newSubmarineTwo = document.createElement("div");
    const newPatrolBoatTwo = document.createElement("div");

    newCarrierTwo.className = "carrier-two";
    newBattleshipTwo.className = "battleship-two";
    newDestroyerTwo.className = "destroyer-two";
    newSubmarineTwo.className = "submarine-two";
    newPatrolBoatTwo.className = "patrol-boat-two";

    newCarrierTwo.draggable = true;
    newBattleshipTwo.draggable = true;
    newDestroyerTwo.draggable = true;
    newSubmarineTwo.draggable = true;
    newPatrolBoatTwo.draggable = true;

    shipsContainer.appendChild(newCarrierTwo);
    shipsContainer.appendChild(newBattleshipTwo);
    shipsContainer.appendChild(newDestroyerTwo);
    shipsContainer.appendChild(newSubmarineTwo);
    shipsContainer.appendChild(newPatrolBoatTwo);

    newCarrierTwo.addEventListener("dragstart", setDraggedShip);
    newBattleshipTwo.addEventListener("dragstart", setDraggedShip);
    newDestroyerTwo.addEventListener("dragstart", setDraggedShip);
    newSubmarineTwo.addEventListener("dragstart", setDraggedShip);
    newPatrolBoatTwo.addEventListener("dragstart", setDraggedShip);

    rotateButton.addEventListener("click", rotateShips);
    randomButton.addEventListener("click", playerOneRandom);
    resetButtonTwo.addEventListener("click", handleResetTwoPlayerOneClick);

    const newPlaceButton = document.createElement("button");
    newPlaceButton.className = "place-button-two";
    newPlaceButton.textContent = "Place";
    newPlaceButton.type = "button";
    const buttonsContainer = document.querySelector(
        ".dialog-two-buttons-container"
    );
    buttonsContainer.appendChild(newPlaceButton);
    newPlaceButton.addEventListener("click", handlePlaceClick);
}
