// Module populates boards with mock positions for testing
// Not meant to be part of the final game, only exists for testing
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

function randomCoordinates() {
    let xCoordinate = Math.floor(Math.random() * 10);
    let yCoordinate = Math.floor(Math.random() * 10);
    const computerBoard = gameController.getPlayerTwo().getBoard().getBoard();
    computerBoard.forEach((x) => {
        x.forEach((y) => {
            if (
                computerBoard.indexOf(x) === xCoordinate ||
                x.indexOf(y) === yCoordinate
            ) {
                xCoordinate = Math.floor(Math.random() * 10);
                yCoordinate = Math.floor(Math.random() * 10);
            }
        });
    });
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
    playerTwo.getBoard().assignShip(playerTwoShips.carrier, 0, 0, "x");
    playerTwo.getBoard().assignShip(playerTwoShips.battleship, 9, 3, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.destroyer, 6, 3, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.submarine, 1, 5, "y");
    playerTwo.getBoard().assignShip(playerTwoShips.patrolBoat, 5, 8, "x");
}
