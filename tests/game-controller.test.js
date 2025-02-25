import { getGameState, gameStart, gameOver } from "../src/logic/game-controller";

test("Get game state", () => {
    expect(getGameState()).toEqual({
        gameStart: false,
        gameOver: false,
        players: {
            playerOne: null,
            playerTwo: null,
        },
        playerTurn: null,
        gameWinner: null,
    });
});

test("Game can start", () => {
    gameStart();
    expect(getGameState().gameStart).toBeTruthy();
});

test("Game can end", () => {
    gameStart();
    gameOver();
    expect(getGameState().gameStart).toBeFalsy();
    expect(getGameState().gameOver).toBeTruthy();
});
