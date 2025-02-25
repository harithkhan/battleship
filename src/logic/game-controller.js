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

export const getGameState = () => gameState;

export const gameStart = () => {
    gameState.gameStart = true;
};

export const gameOver = () => {
    gameState.gameOver = true;
    gameState.gameStart = false;
};
