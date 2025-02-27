import { getPlayerOne } from "../logic/game-controller";
import { playerOneShips } from "../logic/ships";
import { renderPlayerOneBoard } from "./render.boards";

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

export function populateDialogOne() {
    playerOneDialog.showModal();
    createPlayerOneBoard();
    rotateButton.addEventListener("click", rotateShips);
}

let draggedShip = null;

function setDraggedShip(event) {
    draggedShip = event.target.className;
    console.log(draggedShip);
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
    if (
        draggedShip === "carrier" &&
        rotationState === "default" &&
        dropCoordinatesArr[0] + 4 < 10
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
        console.log(getPlayerOne().getBoard().getBoard());
        console.log("assignment occured");
    }
    if (
        draggedShip === "carrier" &&
        rotationState === "rotated" &&
        dropCoordinatesArr[1] + 4 < 10
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
        console.log(getPlayerOne().getBoard().getBoard());
        console.log("assignment occured");
    }
    renderPlayerOneBoard();
}
