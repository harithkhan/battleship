import { gameboard } from "../src/logic/gameboard";
import { createShip } from "../src/logic/ships";

const playerOne = gameboard();
const playerTwo = gameboard();
const carrier = createShip(5);
// playerTwo.assignShip(carrier, 0, 0, "y");

test("Ship placing with x orientation", () => {
    playerOne.assignShip(carrier, 0, 0);
    console.log(playerOne.getBoard());
    console.log(carrier.getLength());
    expect(playerOne.getBoard()[0][0][1]).toBe("ship");
    expect(playerOne.getBoard()[1][0][1]).toBe("ship");
    expect(playerOne.getBoard()[2][0][1]).toBe("ship");
    expect(playerOne.getBoard()[3][0][1]).toBe("ship");
    expect(playerOne.getBoard()[4][0][1]).toBe("ship");
    expect(playerOne.getBoard()[5][0][1]).toBe("water");
});

// test("Ship placing with y orientation", () => {
//     expect(playerTwo.getXAxis()).toEqual([
//         ["not hit", "ship"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//     ]);
//     expect(playerTwo.getYAxis()).toEqual([
//         ["not hit", "ship"],
//         ["not hit", "ship"],
//         ["not hit", "ship"],
//         ["not hit", "ship"],
//         ["not hit", "ship"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//         ["not hit", "water"],
//     ]);
// });
