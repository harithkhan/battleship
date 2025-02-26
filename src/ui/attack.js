import { getPlayerOne, getPlayerTwo } from "../logic/game-controller";

export function attack(player, coordinates) {
    const attackedBox =
        player === "player-one"
            ? document.querySelector(
                  `.player-one-board-container > .grid-box[data-coordinates="${coordinates}"]`
              )
            : document.querySelector(
                  `.player-two-board-container > .grid-box[data-coordinates="${coordinates}"]`
              );
    const splitCoordinates = coordinates.split(",");
    const coordinatesArr = splitCoordinates.map((coordinate) =>
        parseInt(coordinate, 10)
    );
    if (player === "player-one") {
        getPlayerOne()
            .getBoard()
            .receiveAttack(coordinatesArr[0], coordinatesArr[1]);
        const hitStatus = getPlayerOne().getBoard().getBoard()[
            coordinatesArr[0]
        ][coordinatesArr[1]][0];
        attackedBox.dataset.hitStatus = hitStatus;
    }
    if (player === "player-two") {
        getPlayerTwo()
            .getBoard()
            .receiveAttack(coordinatesArr[0], coordinatesArr[1]);
        const hitStatus = getPlayerTwo().getBoard().getBoard()[
            coordinatesArr[0]
        ][coordinatesArr[1]][0];
        attackedBox.dataset.hitStatus = hitStatus;
    }
}

export function handleAttack(event) {
    const { coordinates, player } = event.currentTarget.dataset;
    attack(player, coordinates);
    event.currentTarget.removeEventListener("click", handleAttack);
}
