import { createShip } from "../src/logic/ships";

test("Basic ship creation", () => {
    expect(createShip(4).length).toBe(4);
    expect(createShip(4).hits).toBe(0);
    expect(createShip(4).isSunk).toBeFalsy();
});