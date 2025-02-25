import { gameboard } from "./gameboard";
import { createShip } from "./ships";
import { players } from "./players";

const humanPlayerOne = players("human", "Player 1");
const computerPlayer = players("computer", "Computer");

const gameState = {
    gameStart: false,
    gameOver: false,
    players: {
        playerOne: null,
        playerTwo: null,
    },
    playerTurn: null,
    gameWinner: null,
};
