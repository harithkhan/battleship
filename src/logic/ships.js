export const createShip = (name, length = 1) => {
    let hits = 0;
    const getName = () => name;
    const getLength = () => length;
    const getHits = () => hits;
    const hit = () => {
        if (hits < length) {
            hits += 1;
        }
    };
    const checkSunk = () => {
        if (hits === length) {
            return true;
        }
        return false;
    };
    return {
        getName,
        getLength,
        getHits,
        hit,
        checkSunk,
    };
};

export const playerOneShips = {
    carrier: createShip("carrierOne", 5),
    battleship: createShip("battleshipOne", 4),
    destroyer: createShip("destroyerOne", 3),
    submarine: createShip("submarineOne", 3),
    patrolBoat: createShip("patrolBoatOne", 2),
};

export const playerTwoShips = {
    carrier: createShip("carrierTwo", 5),
    battleship: createShip("battleshipTwo", 4),
    destroyer: createShip("destroyerTwo", 3),
    submarine: createShip("submarineOneTwo", 3),
    patrolBoat: createShip("patrolBoatTwo", 2),
};
