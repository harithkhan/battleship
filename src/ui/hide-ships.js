import { getPlayerOne, getPlayerTwo } from "../logic/game-controller";

export function hideShips(player) {
    const playerBoard =
        player === getPlayerOne()
            ? getPlayerOne().getBoard().getBoard()
            : getPlayerTwo().getBoard().getBoard();
    const playerGridBoxes =
        player === getPlayerOne()
            ? document.querySelectorAll(
                  ".player-one-board-container > .grid-box"
              )
            : document.querySelectorAll(
                  ".player-two-board-container > .grid-box"
              );
    playerBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[1] !== "water") {
                const shipCoordinates = [
                    playerBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ];
                const shipCoordinatesString = shipCoordinates.join(",");
                playerGridBoxes.forEach((i) => {
                    const gridBox = i;
                    if (gridBox.dataset.coordinates === shipCoordinatesString) {
                        gridBox.dataset.spaceState = "hidden-ship";
                    }
                });
            }
            if (yCoordinate[1] === "water") {
                const waterCoordinates = [
                    playerBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ];
                const waterCoordinatesString = waterCoordinates.join(",");
                playerGridBoxes.forEach((i) => {
                    const gridBox = i;
                    if (
                        gridBox.dataset.coordinates === waterCoordinatesString
                    ) {
                        gridBox.dataset.spaceState = "water";
                    }
                });
            }
        });
    });
}
