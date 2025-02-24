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
