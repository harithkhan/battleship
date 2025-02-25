import { players } from "../src/logic/players";
import {
    getGameState,
    gameStart,
    gameOver,
    assignPlayerOne,
    assignPlayerTwo,
} from "../src/logic/game-controller";

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

test("Can assign players to game", () => {
    const humanPlayerOne = players("human", "Player 1");
    const computerPlayer = players("computer", "Computer");
    assignPlayerOne(humanPlayerOne);
    assignPlayerTwo(computerPlayer);
    expect(getGameState().players.playerOne.getName()).toBe("Player 1");
    expect(getGameState().players.playerTwo.getName()).toBe("Computer");
});
