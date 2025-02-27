import { getPlayerOne, getPlayerTwo } from "../logic/game-controller";

export function renderPlayerOneBoard() {
    const playerOneBoard = getPlayerOne().getBoard().getBoard();
    const playerOneGridBoxes = document.querySelectorAll(
        ".player-one-board-container > .grid-box"
    );
    playerOneBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[1] !== "water") {
                const shipCoordinates = [
                    playerOneBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ];
                const shipCoordinatesString = shipCoordinates.join(",");
                playerOneGridBoxes.forEach((i) => {
                    const gridBox = i;
                    if (gridBox.dataset.coordinates === shipCoordinatesString) {
                        gridBox.dataset.spaceState = "ship";
                    }
                });
            }
        });
    });
}

export function renderPlayerOneDialogBoard() {
    const playerOneBoard = getPlayerOne().getBoard().getBoard();
    const playerOneGridBoxes = document.querySelectorAll(
        ".player-one-dialog-board > .grid-box"
    );
    playerOneBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[1] !== "water") {
                const shipCoordinates = [
                    playerOneBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ];
                const shipCoordinatesString = shipCoordinates.join(",");
                playerOneGridBoxes.forEach((i) => {
                    const gridBox = i;
                    if (gridBox.dataset.coordinates === shipCoordinatesString) {
                        gridBox.dataset.spaceState = "ship";
                    }
                });
            }
        });
    });
}

export function renderPlayerTwoBoard() {
    const playerTwoBoard = getPlayerTwo().getBoard().getBoard();
    const playerTwoGridBoxes = document.querySelectorAll(
        ".player-two-board-container > .grid-box"
    );
    playerTwoBoard.forEach((xCoordinate) => {
        xCoordinate.forEach((yCoordinate) => {
            if (yCoordinate[1] !== "water") {
                const shipCoordinates = [
                    playerTwoBoard.indexOf(xCoordinate),
                    xCoordinate.indexOf(yCoordinate),
                ];
                const shipCoordinatesString = shipCoordinates.join(",");
                playerTwoGridBoxes.forEach((i) => {
                    const gridBox = i;
                    if (gridBox.dataset.coordinates === shipCoordinatesString) {
                        gridBox.dataset.spaceState = "ship";
                    }
                });
            }
        });
    });
}
