import { createShip } from "../src/logic/ships";

test("Basic ship creation", () => {
    expect(createShip(4).length).toBe(4);
    expect(createShip(4).hits).toBe(0);
    expect(createShip(4).isSunk).toBeFalsy();
});

test("Ship hit function", () => {
    const testShip = createShip();
    testShip.hit();
    expect(testShip.hits).toBe(1);
});

test("Ship hit function when max hits reached", () => {
    const testShip = createShip(1);
    testShip.hit();
    expect(testShip.hits).toBe(1);
});
