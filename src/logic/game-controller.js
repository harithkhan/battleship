const gameState = {
    gameMode: null,
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

export const getGameMode = () => gameState.gameMode;

export const setGameMode = (gameMode) => {
    gameState.gameMode = gameMode;
};

export const gameStart = () => {
    gameState.gameStart = true;
    gameState.playerTurn = gameState.players.playerOne;
};

export const gameOver = () => {
    gameState.gameOver = true;
    gameState.gameStart = false;
};

export const getGameOver = () => gameState.gameOver;

export const assignPlayerOne = (player) => {
    gameState.players.playerOne = player;
};

export const assignPlayerTwo = (player) => {
    gameState.players.playerTwo = player;
};

export const getPlayerOne = () => gameState.players.playerOne;

export const getPlayerTwo = () => gameState.players.playerTwo;

export const getPlayerTurn = () => gameState.playerTurn;

export const getOtherPlayer = () => {
    if (getPlayerTurn() === getPlayerOne()) {
        return getPlayerTwo();
    }
    return getPlayerOne();
};

export const switchTurn = () => {
    if (gameState.playerTurn === gameState.players.playerOne) {
        gameState.playerTurn = gameState.players.playerTwo;
    } else if (gameState.playerTurn === gameState.players.playerTwo) {
        gameState.playerTurn = gameState.players.playerOne;
    }
};

export const getGameWinner = () => gameState.gameWinner;

export const setGameWinner = (winner) => {
    if (getGameWinner()) {
        throw new Error(
            "Cannot declare game winner once winner already declared"
        );
    }
    if (!gameState.gameStart) {
        throw new Error("Cannot set game winner before game starts");
    }
    gameState.gameWinner = winner;
    gameOver();
};

export const resetGameState = () => {
    gameState.gameMode = null;
    gameState.gameStart = false;
    gameState.gameOver = false;
    gameState.players.playerOne = null;
    gameState.players.playerTwo = null;
    gameState.playerTurn = null;
    gameState.gameWinner = null;
};
