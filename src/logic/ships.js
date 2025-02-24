export const createShip = (length = 1) => {
    let hits = 0;
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
        getLength,
        getHits,
        hit,
        checkSunk,
    };
};
