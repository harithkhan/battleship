import { players } from "../logic/players";
import { playerOneShips, playerTwoShips } from "../logic/ships";
import * as gameController from "../logic/game-controller";

export function executePopulationTest() {
    gameController.resetGameState();
    const playerOne = players("human", "Player 1");
    const computerPlayer = players("computer", "Computer");
    gameController.assignPlayerOne(playerOne);
    gameController.assignPlayerTwo(computerPlayer);

    playerOne.getBoard().assignShip(playerOneShips.carrier, 0, 0, "x");
    playerOne.getBoard().assignShip(playerOneShips.battleship, 9, 0, "y");
    playerOne.getBoard().assignShip(playerOneShips.destroyer, 3, 2, "x");
    playerOne.getBoard().assignShip(playerOneShips.submarine, 1, 5, "y");
    playerOne.getBoard().assignShip(playerOneShips.patrolBoat, 3, 8, "x");

    computerPlayer.getBoard().assignShip(playerTwoShips.carrier, 0, 0, "x");
    computerPlayer.getBoard().assignShip(playerTwoShips.battleship, 9, 3, "y");
    computerPlayer.getBoard().assignShip(playerTwoShips.destroyer, 6, 3, "y");
    computerPlayer.getBoard().assignShip(playerTwoShips.submarine, 1, 5, "y");
    computerPlayer.getBoard().assignShip(playerTwoShips.patrolBoat, 5, 8, "x");
}

export function assignShipsTest() {
    const playerOne = gameController.getPlayerOne();
    const playerTwo = gameController.getPlayerTwo();
    playerOne.getBoard().assignShip(playerOneShips.carrier, 0, 0, "x");
    playerOne.getBoard().assignShip(playerOneShips.battleship, 9, 0, "y");
    playerOne.getBoard().assignShip(playerOneShips.destroyer, 3, 2, "x");
    playerOne.getBoard().assignShip(playerOneShips.submarine, 1, 5, "y");
    playerOne.getBoard().assignShip(playerOneShips.patrolBoat, 3, 8, "x");

    playerTwo.getBoard().assignShip(playerTwoShips.carrier, 0, 0, "x");
    playerTwo.getBoard().assignShip(playerTwoShips.battleship, 9, 3, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.destroyer, 6, 3, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.submarine, 1, 5, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.patrolBoat, 5, 8, "x");
}

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
