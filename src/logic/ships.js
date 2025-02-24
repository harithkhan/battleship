const assignHit = () => ({
    hit() {
        if (this.hits < this.length) {
            this.hits += 1;
        }
    },
});

export const createShip = (length = 1) => ({
    length,
    hits: 0,
    isSunk: false,
    ...assignHit(),
});
