import { playerOneShips, playerTwoShips } from "../logic/ships";
import * as gameController from "../logic/game-controller";
import {
    renderPlayerOneDialogBoard,
    renderPlayerOneDialogBoardMultiplayer,
    renderPlayerTwoDialogBoardMultiplayer,
} from "./render.boards";
import {
    handleShipDrop,
    resetDraggedShip,
    setDraggedShip,
} from "./populate-dialog-one";

function checkAdjacentCoordinates(orientation, ship, player, x, y) {
    if (orientation === "x") {
        for (let i = 0; i < ship.getLength(); i++) {
            const checkCoordinate = x + i;
            if (
                checkCoordinate > 9 ||
                player
                    .getBoard()
                    .getContentsFromCoordinates(checkCoordinate, y)[1] !==
                    "water"
            ) {
                return false;
            }
        }
    }
    if (orientation === "y") {
        for (let i = 0; i < ship.getLength(); i++) {
            const checkCoordinate = y + i;
            if (
                checkCoordinate > 9 ||
                player
                    .getBoard()
                    .getContentsFromCoordinates(x, checkCoordinate)[1] !==
                    "water"
            ) {
                return false;
            }
        }
    }
    return true;
}

function randomComputerCoordinates(ship, orientation) {
    let xCoordinate;
    let yCoordinate;
    do {
        xCoordinate = Math.floor(Math.random() * 10);
        yCoordinate = Math.floor(Math.random() * 10);
    } while (
        gameController
            .getPlayerTwo()
            .getBoard()
            .getContentsFromCoordinates(xCoordinate, yCoordinate)[1] !==
            "water" ||
        !checkAdjacentCoordinates(
            orientation,
            ship,
            gameController.getPlayerTwo(),
            xCoordinate,
            yCoordinate
        )
    );
    return [xCoordinate, yCoordinate];
}

function randomOrientation() {
    const flip = Math.random();
    if (flip > 0.5) {
        return "x";
    }
    return "y";
}

export function assignComputerShips() {
    const playerTwo = gameController.getPlayerTwo();
    const carrierOrientation = randomOrientation();
    const battleshipOrientation = randomOrientation();
    const destroyerOrientation = randomOrientation();
    const submarineOrientation = randomOrientation();
    const patrolBoatOrientation = randomOrientation();

    const carrierCoordinates = randomComputerCoordinates(
        playerTwoShips.carrier,
        carrierOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.carrier,
            carrierCoordinates[0],
            carrierCoordinates[1],
            carrierOrientation
        );
    const battleshipCoordinates = randomComputerCoordinates(
        playerTwoShips.battleship,
        battleshipOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.battleship,
            battleshipCoordinates[0],
            battleshipCoordinates[1],
            battleshipOrientation
        );
    const destroyerCoordinates = randomComputerCoordinates(
        playerTwoShips.destroyer,
        destroyerOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.destroyer,
            destroyerCoordinates[0],
            destroyerCoordinates[1],
            destroyerOrientation
        );
    const submarineCoordinates = randomComputerCoordinates(
        playerTwoShips.submarine,
        submarineOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.submarine,
            submarineCoordinates[0],
            submarineCoordinates[1],
            submarineOrientation
        );
    const patrolBoatCoordinates = randomComputerCoordinates(
        playerTwoShips.patrolBoat,
        patrolBoatOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.patrolBoat,
            patrolBoatCoordinates[0],
            patrolBoatCoordinates[1],
            patrolBoatOrientation
        );
}

function randomPlayerOneCoordinates(ship, orientation) {
    let xCoordinate;
    let yCoordinate;
    do {
        xCoordinate = Math.floor(Math.random() * 10);
        yCoordinate = Math.floor(Math.random() * 10);
    } while (
        gameController
            .getPlayerOne()
            .getBoard()
            .getContentsFromCoordinates(xCoordinate, yCoordinate)[1] !==
            "water" ||
        !checkAdjacentCoordinates(
            orientation,
            ship,
            gameController.getPlayerOne(),
            xCoordinate,
            yCoordinate
        )
    );
    return [xCoordinate, yCoordinate];
}

function randomPlayerTwoCoordinates(ship, orientation) {
    let xCoordinate;
    let yCoordinate;
    do {
        xCoordinate = Math.floor(Math.random() * 10);
        yCoordinate = Math.floor(Math.random() * 10);
    } while (
        gameController
            .getPlayerTwo()
            .getBoard()
            .getContentsFromCoordinates(xCoordinate, yCoordinate)[1] !==
            "water" ||
        !checkAdjacentCoordinates(
            orientation,
            ship,
            gameController.getPlayerTwo(),
            xCoordinate,
            yCoordinate
        )
    );
    return [xCoordinate, yCoordinate];
}

export function playerOneRandom() {
    const playerOne = gameController.getPlayerOne();
    playerOne.getBoard().resetBoard();
    const carrierOrientation = randomOrientation();
    const battleshipOrientation = randomOrientation();
    const destroyerOrientation = randomOrientation();
    const submarineOrientation = randomOrientation();
    const patrolBoatOrientation = randomOrientation();

    const carrierCoordinates = randomPlayerOneCoordinates(
        playerOneShips.carrier,
        carrierOrientation
    );
    playerOne
        .getBoard()
        .assignShip(
            playerOneShips.carrier,
            carrierCoordinates[0],
            carrierCoordinates[1],
            carrierOrientation
        );
    const battleshipCoordinates = randomPlayerOneCoordinates(
        playerOneShips.battleship,
        battleshipOrientation
    );
    playerOne
        .getBoard()
        .assignShip(
            playerOneShips.battleship,
            battleshipCoordinates[0],
            battleshipCoordinates[1],
            battleshipOrientation
        );
    const destroyerCoordinates = randomPlayerOneCoordinates(
        playerOneShips.destroyer,
        destroyerOrientation
    );
    playerOne
        .getBoard()
        .assignShip(
            playerOneShips.destroyer,
            destroyerCoordinates[0],
            destroyerCoordinates[1],
            destroyerOrientation
        );
    const submarineCoordinates = randomPlayerOneCoordinates(
        playerOneShips.submarine,
        submarineOrientation
    );
    playerOne
        .getBoard()
        .assignShip(
            playerOneShips.submarine,
            submarineCoordinates[0],
            submarineCoordinates[1],
            submarineOrientation
        );
    const patrolBoatCoordinates = randomPlayerOneCoordinates(
        playerOneShips.patrolBoat,
        patrolBoatOrientation
    );
    playerOne
        .getBoard()
        .assignShip(
            playerOneShips.patrolBoat,
            patrolBoatCoordinates[0],
            patrolBoatCoordinates[1],
            patrolBoatOrientation
        );
    renderPlayerOneDialogBoard();
    renderPlayerOneDialogBoardMultiplayer();
    const carrierOne = document.querySelector(".carrier-one");
    const battleshipOne = document.querySelector(".battleship-one");
    const destroyerOne = document.querySelector(".destroyer-one");
    const submarineOne = document.querySelector(".submarine-one");
    const patrolBoatOne = document.querySelector(".patrol-boat-one");
    const carrierTwo = document.querySelector(".carrier-two");
    const battleshipTwo = document.querySelector(".battleship-two");
    const destroyerTwo = document.querySelector(".destroyer-two");
    const submarineTwo = document.querySelector(".submarine-two");
    const patrolBoatTwo = document.querySelector(".patrol-boat-two");
    if (carrierOne) {
        carrierOne.remove();
    }
    if (battleshipOne) {
        battleshipOne.remove();
    }
    if (destroyerOne) {
        destroyerOne.remove();
    }
    if (submarineOne) {
        submarineOne.remove();
    }
    if (patrolBoatOne) {
        patrolBoatOne.remove();
    }
    if (carrierTwo) {
        carrierTwo.remove();
    }
    if (battleshipTwo) {
        battleshipTwo.remove();
    }
    if (destroyerTwo) {
        destroyerTwo.remove();
    }
    if (submarineTwo) {
        submarineTwo.remove();
    }
    if (patrolBoatTwo) {
        patrolBoatTwo.remove();
    }
}

export function playerTwoRandom() {
    const playerTwo = gameController.getPlayerTwo();
    playerTwo.getBoard().resetBoard();
    const carrierOrientation = randomOrientation();
    const battleshipOrientation = randomOrientation();
    const destroyerOrientation = randomOrientation();
    const submarineOrientation = randomOrientation();
    const patrolBoatOrientation = randomOrientation();

    const carrierCoordinates = randomPlayerTwoCoordinates(
        playerTwoShips.carrier,
        carrierOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerOneShips.carrier,
            carrierCoordinates[0],
            carrierCoordinates[1],
            carrierOrientation
        );
    const battleshipCoordinates = randomPlayerTwoCoordinates(
        playerOneShips.battleship,
        battleshipOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.battleship,
            battleshipCoordinates[0],
            battleshipCoordinates[1],
            battleshipOrientation
        );
    const destroyerCoordinates = randomPlayerTwoCoordinates(
        playerTwoShips.destroyer,
        destroyerOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.destroyer,
            destroyerCoordinates[0],
            destroyerCoordinates[1],
            destroyerOrientation
        );
    const submarineCoordinates = randomPlayerTwoCoordinates(
        playerTwoShips.submarine,
        submarineOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.submarine,
            submarineCoordinates[0],
            submarineCoordinates[1],
            submarineOrientation
        );
    const patrolBoatCoordinates = randomPlayerTwoCoordinates(
        playerTwoShips.patrolBoat,
        patrolBoatOrientation
    );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.patrolBoat,
            patrolBoatCoordinates[0],
            patrolBoatCoordinates[1],
            patrolBoatOrientation
        );
    renderPlayerTwoDialogBoardMultiplayer();

    const carrierTwo = document.querySelector(".carrier-two");
    const battleshipTwo = document.querySelector(".battleship-two");
    const destroyerTwo = document.querySelector(".destroyer-two");
    const submarineTwo = document.querySelector(".submarine-two");
    const patrolBoatTwo = document.querySelector(".patrol-boat-two");
    if (carrierTwo) {
        carrierTwo.remove();
    }
    if (battleshipTwo) {
        battleshipTwo.remove();
    }
    if (destroyerTwo) {
        destroyerTwo.remove();
    }
    if (submarineTwo) {
        submarineTwo.remove();
    }
    if (patrolBoatTwo) {
        patrolBoatTwo.remove();
    }
}

export function handleResetOneClick() {
    const shipsContainer = document.querySelector(
        ".dialog-one-ships-container"
    );
    shipsContainer.innerHTML = "";
    const gridBoxes = document.querySelectorAll(
        ".player-one-dialog-board > .grid-box"
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
            handleShipDrop(event);
        });
    });

    const newCarrierOne = document.createElement("div");
    newCarrierOne.className = "carrier-one";
    newCarrierOne.draggable = "true";

    const newBattleshipOne = document.createElement("div");
    newBattleshipOne.className = "battleship-one";
    newBattleshipOne.draggable = "true";

    const newDestroyerOne = document.createElement("div");
    newDestroyerOne.className = "destroyer-one";
    newDestroyerOne.draggable = "true";

    const newSubmarineOne = document.createElement("div");
    newSubmarineOne.className = "submarine-one";
    newSubmarineOne.draggable = "true";

    const newPatrolBoatOne = document.createElement("div");
    newPatrolBoatOne.className = "patrol-boat-one";
    newPatrolBoatOne.draggable = "true";

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

    shipsContainer.appendChild(newCarrierOne);
    shipsContainer.appendChild(newBattleshipOne);
    shipsContainer.appendChild(newDestroyerOne);
    shipsContainer.appendChild(newSubmarineOne);
    shipsContainer.appendChild(newPatrolBoatOne);

    resetDraggedShip();
}
