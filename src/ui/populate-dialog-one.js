import { gameStart } from "../logic/game-controller";
import { refreshWhoCanAttack } from "./attack";
import { displayPlayerTurn } from "./information-display";
import { renderPlayerOneBoard, renderComputerBoard } from "./render.boards";
import {
    assignComputerShips,
    getRotationState,
    handleResetOneClick,
    playerOneRandom,
    handleShipDrop,
    setRotationState,
    setDraggedShip,
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

function rotateShips() {
    const newCarrierOne = document.querySelector(".carrier-one");
    const newBattleshipOne = document.querySelector(".battleship-one");
    const newDestroyerOne = document.querySelector(".destroyer-one");
    const newSubmarineOne = document.querySelector(".submarine-one");
    const newPatrolBoatOne = document.querySelector(".patrol-boat-one");

    if (getRotationState() === "default") {
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
            newDestroyerOne.style.fontSize = "0.8rem";
        }
        if (newSubmarineOne) {
            newSubmarineOne.style.width = "3rem";
            newSubmarineOne.style.height = "9rem";
            newSubmarineOne.style.gridArea = "7 / 4 / 10 / 5";
            newSubmarineOne.style.fontSize = "0.8rem";
        }
        if (newPatrolBoatOne) {
            newPatrolBoatOne.style.width = "3rem";
            newPatrolBoatOne.style.height = "6rem";
            newPatrolBoatOne.style.gridArea = "6 / 6 / 8 / 7";
            newPatrolBoatOne.textContent = "Boat";
        }
        setRotationState("rotated");
    } else if (getRotationState() === "rotated") {
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
            newDestroyerOne.style.fontSize = "1rem";
        }
        if (newSubmarineOne) {
            newSubmarineOne.style.width = "9rem";
            newSubmarineOne.style.height = "3rem";
            newSubmarineOne.style.gridArea = "8 / 2 / 9 / 5";
            newSubmarineOne.style.fontSize = "1rem";
        }
        if (newPatrolBoatOne) {
            newPatrolBoatOne.style.width = "6rem";
            newPatrolBoatOne.style.height = "3rem";
            newPatrolBoatOne.style.gridArea = "9 / 5 / 10 / 7";
            newPatrolBoatOne.textContent = "Patrol Boat";
        }
        setRotationState("default");
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

    carrierOne.textContent = "Carrier";
    battleshipOne.textContent = "Battleship";
    destroyerOne.textContent = "Destroyer";
    submarineOne.textContent = "Submarine";
    patrolBoatOne.textContent = "Patrol Boat";

    carrierOne.draggable = "true";
    battleshipOne.draggable = "true";
    destroyerOne.draggable = "true";
    submarineOne.draggable = "true";
    patrolBoatOne.draggable = "true";

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
