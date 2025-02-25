import { getGameState } from "../src/logic/game-controller";

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
