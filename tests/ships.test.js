import { createShip } from "../src/logic/ships";

test("Basic ship creation", () => {
    expect(createShip(4).getLength()).toBe(4);
    expect(createShip(4).getHits()).toBe(0);
    expect(createShip(4).checkSunk()).toBeFalsy();
});

test("Ship hit function", () => {
    const testShip = createShip();
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
});

test("Ship hit function when max hits reached", () => {
    const testShip = createShip(1);
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
});

test("Check if ship is sunk (true)", () => {
    const testShip = createShip();
    testShip.hit();
    expect(testShip.checkSunk()).toBeTruthy();
});

test("Check if ship is sunk (false)", () => {
    const testShip = createShip();
    expect(testShip.checkSunk()).toBeFalsy();
});

test("Reassign ships' sunk status", () => {
    const testShip = createShip();
    testShip.hit();
    expect(testShip.checkSunk()).toBeTruthy();
});

test("Refresh sunk status automatically after hits", () => {
    const testShip = createShip();
    expect(testShip.checkSunk()).toBeFalsy();
    testShip.hit();
    expect(testShip.checkSunk()).toBeTruthy();
});
