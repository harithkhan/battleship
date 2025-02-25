import { gameboard } from "../src/logic/gameboard";
import { createShip } from "../src/logic/ships";

const playerOne = gameboard();
const playerTwo = gameboard();
const carrier = createShip("carrier", 5);
const destroyer = createShip("destroyer", 3);

test("Ship placing with x orientation", () => {
    playerOne.assignShip(carrier, 0, 0);
    expect(playerOne.getBoard()[0][0][1]).toBe(carrier.getName());
    expect(playerOne.getBoard()[1][0][1]).toBe(carrier.getName());
    expect(playerOne.getBoard()[2][0][1]).toBe(carrier.getName());
    expect(playerOne.getBoard()[3][0][1]).toBe(carrier.getName());
    expect(playerOne.getBoard()[4][0][1]).toBe(carrier.getName());
    expect(playerOne.getBoard()[5][0][1]).toBe("water");
    playerOne.assignShip(destroyer, 5, 6);
    expect(playerOne.getBoard()[4][6][1]).toBe("water");
    expect(playerOne.getBoard()[5][6][1]).toBe(destroyer.getName());
    expect(playerOne.getBoard()[6][6][1]).toBe(destroyer.getName());
    expect(playerOne.getBoard()[7][6][1]).toBe(destroyer.getName());
    expect(playerOne.getBoard()[8][6][1]).toBe("water");
});

test("Ship placing with y orientation", () => {
    playerTwo.assignShip(carrier, 0, 0, "y");
    expect(playerTwo.getBoard()[0][0][1]).toBe(carrier.getName());
    expect(playerTwo.getBoard()[0][1][1]).toBe(carrier.getName());
    expect(playerTwo.getBoard()[0][2][1]).toBe(carrier.getName());
    expect(playerTwo.getBoard()[0][3][1]).toBe(carrier.getName());
    expect(playerTwo.getBoard()[0][4][1]).toBe(carrier.getName());
    expect(playerTwo.getBoard()[0][5][1]).toBe("water");
    playerTwo.assignShip(destroyer, 5, 2, "y");
    expect(playerTwo.getBoard()[5][1][1]).toBe("water");
    expect(playerTwo.getBoard()[5][2][1]).toBe(destroyer.getName());
    expect(playerTwo.getBoard()[5][3][1]).toBe(destroyer.getName());
    expect(playerTwo.getBoard()[5][4][1]).toBe(destroyer.getName());
    expect(playerTwo.getBoard()[5][5][1]).toBe("water");
});

test("Newly assigned ships get assigned to ships object in board", () => {
    expect(playerOne.getShips()).toHaveProperty("carrier");
    expect(playerOne.getShips()).toHaveProperty("destroyer");
    expect(playerTwo.getShips()).toHaveProperty("carrier");
    expect(playerTwo.getShips()).toHaveProperty("destroyer");
});

test("Newly assigned ships methods in ships object work", () => {
    expect(playerOne.getShips().carrier.getName()).toBe("carrier");
    expect(playerOne.getShips().carrier.getLength()).toBe(5);
    playerOne.getShips().carrier.hit();
    expect(playerOne.getShips().carrier.getHits()).toBe(1);
    expect(playerOne.getShips().carrier.checkSunk()).toBeFalsy();
})
