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

function randomComputerCoordinates(ship) {
    let xCoordinate = Math.floor(Math.random() * 10);
    let yCoordinate = Math.floor(Math.random() * 10);
    const computerBoard = gameController.getPlayerTwo().getBoard().getBoard();
    const xList = [];
    const yList = [];
    // computerBoard.forEach((x) => {
    //     computerBoard.forEach((y) => {
    //         if (y[1] !== "water") {
    //             xList.push(computerBoard.indexOf(x));
    //             yList.push(x.indexOf(y));
    //         }
    //     });
    // });
    computerBoard.forEach((x) => {
        xList.push(x);
    });
    computerBoard.forEach((x) => {
        x.forEach((y) => {
            yList.push(y);
        });
    });
    while (
        xList.includes(xCoordinate) ||
        yList.includes(yCoordinate) ||
        ship.getLength() + xCoordinate > 9 ||
        ship.getLength() + yCoordinate > 9
    ) {
        xCoordinate = Math.floor(Math.random() * 10);
        yCoordinate = Math.floor(Math.random() * 10);
    }
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
    const carrierCoordinates = randomComputerCoordinates(playerTwoShips.carrier);
    const battleshipCoordinates = randomComputerCoordinates(playerTwoShips.battleship);
    const destroyerCoordinates = randomComputerCoordinates(playerTwoShips.destroyer);
    const submarineCoordinates = randomComputerCoordinates(playerTwoShips.submarine);
    const patrolBoatCoordinates = randomComputerCoordinates(playerTwoShips.patrolBoat);
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.carrier,
            carrierCoordinates[0],
            carrierCoordinates[1],
            randomOrientation()
        );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.battleship,
            battleshipCoordinates[0],
            battleshipCoordinates[1],
            randomOrientation()
        );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.destroyer,
            destroyerCoordinates[0],
            destroyerCoordinates[1],
            randomOrientation()
        );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.submarine,
            submarineCoordinates[0],
            submarineCoordinates[1],
            randomOrientation()
        );
    playerTwo
        .getBoard()
        .assignShip(
            playerTwoShips.patrolBoat,
            patrolBoatCoordinates[0],
            patrolBoatCoordinates[1],
            randomOrientation()
        );
}
