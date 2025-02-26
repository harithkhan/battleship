import { players } from "../src/logic/players";
import * as gameController from "../src/logic/game-controller";
import { createShip } from "../src/logic/ships";

beforeAll(() => {
    gameController.resetGameState();
});

afterAll(() => {
    gameController.resetGameState();
});

test("Player turn switches after receive attack", () => {
    const playerOne = players("human", "Player 1");
    const computerPlayer = players("computer", "Computer");
    gameController.assignPlayerOne(playerOne);
    gameController.assignPlayerTwo(computerPlayer);
    const battleShipOne = createShip("battleShipOne", 5);
    const battleShipTwo = createShip("battleShipTwo", 5);
    playerOne.getBoard().assignShip(battleShipOne, 0, 0);
    computerPlayer.getBoard().assignShip(battleShipTwo, 0, 0, "y");
    gameController.gameStart();
    computerPlayer.getBoard().receiveAttack(0, 0);
    expect(gameController.getPlayerTurn().getName()).toBe("Computer");
    playerOne.getBoard().receiveAttack(0, 0);
    expect(gameController.getPlayerTurn().getName()).toBe("Player 1");
});
