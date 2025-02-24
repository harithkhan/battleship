export const gameboard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
        // Board indexes are the x-axis. The y-axis are the arrays being
        // pushed below.
        board.push(Array.from({ length: 10 }, () => ["not hit", "water"]));
    }

    const getBoard = () => board;

    const assignShip = (ship, xCoordinate, yCoordinate, orientation = "x") => {
        if (orientation === "x") {
            for (let i = 0; i < ship.getLength(); i++) {
                board[xCoordinate + i][yCoordinate][1] = "ship";
            }
        }
        if (orientation === "y") {
            for (let i = 0; i < ship.getLength(); i++) {
                board[xCoordinate][yCoordinate + i][1] = "ship";
            }
        }
    };

    return {
        getBoard,
        assignShip,
    };
};
