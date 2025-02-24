const assignHit = () => ({
    hit() {
        if (this.hits < this.length) {
            this.hits += 1;
        }
    },
});

const assignCheckSunk = () => ({
    checkSunk() {
        if (this.hits === this.length) {
            return true;
        }
        return false;
    },
});

export const createShip = (length = 1) => ({
    length,
    hits: 0,
    isSunk: false,
    ...assignHit(),
    ...assignCheckSunk(),
});
