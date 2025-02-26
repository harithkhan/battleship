import { players } from "../src/logic/players";
import {
    getGameState,
    gameStart,
    gameOver,
    resetGameState,
    assignPlayerOne,
    assignPlayerTwo,
    getPlayerOne,
    getPlayerTwo,
    getPlayerTurn,
    switchTurn,
} from "../src/logic/game-controller";

beforeEach(() => {
    resetGameState();
});

afterEach(() => {
    resetGameState();
});

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

test("Game can reset", () => {
    gameStart();
    resetGameState();
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

describe("Player assignments", () => {
    beforeEach(() => {
        const humanPlayerOne = players("human", "Player 1");
        const computerPlayer = players("computer", "Computer");
        assignPlayerOne(humanPlayerOne);
        assignPlayerTwo(computerPlayer);
    });
    test("Can assign players to game", () => {
        expect(getPlayerOne().getName()).toBe("Player 1");
        expect(getPlayerTwo().getName()).toBe("Computer");
    });
    test("Before game starts, player turn is null", () => {
        expect(getGameState().playerTurn).toBe(null);
    });
    test("Game start assigns first player correctly", () => {
        gameStart();
        expect(getPlayerTurn().getName()).toBe("Player 1");
    });
});

describe("Get player info", () => {
    beforeEach(() => {
        const humanPlayerOne = players("human", "Player 1");
        const computerPlayer = players("computer", "Computer");
        assignPlayerOne(humanPlayerOne);
        assignPlayerTwo(computerPlayer);
    });
    test("Get player name", () => {
        expect(getPlayerOne().getName()).toBe("Player 1");
        expect(getPlayerTwo().getName()).toBe("Computer");
    });
    test("Get player type", () => {
        expect(getPlayerOne().getType()).toBe("human");
        expect(getPlayerTwo().getType()).toBe("computer");
    });
    test("Get player board", () => {
        expect(getPlayerOne().getBoard().getBoard().length).toBe(10);
    });
});

describe("Player turns", () => {
    beforeEach(() => {
        const humanPlayerOne = players("human", "Player 1");
        const computerPlayer = players("computer", "Computer");
        assignPlayerOne(humanPlayerOne);
        assignPlayerTwo(computerPlayer);
    });
    test("Get player turn", () => {
        expect(getPlayerTurn()).toBe(null);
        gameStart();
        expect(getPlayerTurn().getName()).toBe("Player 1");
    });
    test("Switch turns", () => {
        gameStart();
        expect(getPlayerTurn().getName()).toBe("Player 1");
        switchTurn();
        expect(getPlayerTurn().getName()).toBe("Computer");
    });
});
