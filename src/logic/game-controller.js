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
    gameState.playerTurn = gameState.players.playerOne;
};

export const gameOver = () => {
    gameState.gameOver = true;
    gameState.gameStart = false;
};

export const assignPlayerOne = (player) => {
    gameState.players.playerOne = player;
};

export const assignPlayerTwo = (player) => {
    gameState.players.playerTwo = player;
};

export const getPlayerOne = () => gameState.players.playerOne;

export const getPlayerTwo = () => gameState.players.playerTwo;

export const resetGameState = () => {
    gameState.gameStart = false;
    gameState.gameOver = false;
    gameState.players.playerOne = null;
    gameState.players.playerTwo = null;
    gameState.playerTurn = null;
    gameState.gameWinner = null;
};
