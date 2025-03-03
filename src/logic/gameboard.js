import { switchTurn } from "./game-controller";

export const gameboard = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
        // Board indexes are the x-axis. The y-axis are the arrays being
        // pushed below.
        board.push(Array.from({ length: 10 }, () => ["not hit", "water"]));
    }

    const getBoard = () => board;

    const getContentsFromCoordinates = (x, y) => board[x][y];

    let ships = {};

    const getShips = () => ships;

    const resetBoard = () => {
        board = [];
        for (let i = 0; i < 10; i++) {
            board.push(Array.from({ length: 10 }, () => ["not hit", "water"]));
        }
        ships = {};
    };

    const assignShip = (ship, xCoordinate, yCoordinate, orientation = "x") => {
        if (orientation === "x") {
            const targetCoordinates = [];
            for (let i = 0; i < ship.getLength(); i++) {
                targetCoordinates.push([xCoordinate + i, yCoordinate]);
            }
            let isTaken = false;
            targetCoordinates.forEach((target) => {
                if (board[target[0]][target[1]][1] !== "water") {
                    isTaken = true;
                }
            });
            if (!isTaken) {
                targetCoordinates.forEach((target) => {
                    board[target[0]][target[1]][1] = ship.getName();
                });
                ships[ship.getName()] = ship;
                return `${ship.getName()} assigned to coordinates ${targetCoordinates}`;
            }
        }
        if (orientation === "y") {
            const targetCoordinates = [];
            for (let i = 0; i < ship.getLength(); i++) {
                targetCoordinates.push([xCoordinate, yCoordinate + i]);
            }
            let isTaken = false;
            targetCoordinates.forEach((target) => {
                if (board[target[0]][target[1]][1] !== "water") {
                    isTaken = true;
                }
            });
            if (!isTaken) {
                targetCoordinates.forEach((target) => {
                    board[target[0]][target[1]][1] = ship.getName();
                });
                ships[ship.getName()] = ship;
                return `${ship.getName()} assigned to coordinates ${targetCoordinates}`;
            }
        }
        return "A ship has already been assigned to that space";
    };

    const isGameOver = () => {
        let status = true;
        const shipValues = Object.values(ships);
        if (shipValues.length === 0) {
            status = false;
        }
        shipValues.forEach((ship) => {
            if (!ship.checkSunk()) {
                status = false;
            }
        });
        return status;
    };

    const receiveAttackList = [];

    const getAttackList = () => receiveAttackList;

    const receiveAttack = (xCoordinate, yCoordinate) => {
        if (
            board[xCoordinate][yCoordinate][0] === "not hit" &&
            board[xCoordinate][yCoordinate][1] === "water"
        ) {
            board[xCoordinate][yCoordinate][0] = "miss";
            receiveAttackList.push([xCoordinate, yCoordinate]);
            switchTurn();
            return "Miss! No ships were hit";
        }
        if (
            board[xCoordinate][yCoordinate][0] === "not hit" &&
            board[xCoordinate][yCoordinate][1] !== "water"
        ) {
            board[xCoordinate][yCoordinate][0] = "hit";
            ships[board[xCoordinate][yCoordinate][1]].hit();
            receiveAttackList.push([xCoordinate, yCoordinate]);
            switchTurn();
            if (isGameOver()) {
                return "Game Over!";
            }
            return "A ship was hit!";
        }
        return "This position cannot be attacked";
    };

    return {
        getBoard,
        getContentsFromCoordinates,
        resetBoard,
        getShips,
        assignShip,
        receiveAttack,
        getAttackList,
        isGameOver,
    };
};
