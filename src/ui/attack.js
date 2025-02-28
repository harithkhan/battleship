/* eslint-disable no-use-before-define */
import { displayPlayerTurn, displayGameOver } from "./information-display";
import {
    getPlayerOne,
    getPlayerTwo,
    getPlayerTurn,
    getGameMode,
    getGameOver,
    resetGameState,
    setGameWinner,
    getOtherPlayer,
} from "../logic/game-controller";

function attack(player, coordinates) {
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
    refreshWhoCanAttack();
    displayPlayerTurn();
    // Check if game over
    if (getPlayerTurn().getBoard().isGameOver()) {
        setGameWinner(getOtherPlayer());
        refreshWhoCanAttack();
        displayGameOver();
        resetGameState();
    }
}

export function handleAttack(event) {
    const { coordinates, player } = event.currentTarget.dataset;
    attack(player, coordinates);
    event.currentTarget.removeEventListener("click", handleAttack);
    if (
        getGameMode() === "single-player" &&
        getPlayerTurn() === getPlayerTwo()
    ) {
        setTimeout(playComputerAttack, 1000);
    }
}

export function refreshWhoCanAttack() {
    const playerTurn = getPlayerTurn();
    const playerOneBoard = getPlayerOne().getBoard().getBoard();
    const playerOneGridBoxes = document.querySelectorAll(
        ".player-one-board-container > .grid-box"
    );
    const playerTwoBoard = getPlayerTwo().getBoard().getBoard();
    const playerTwoGridBoxes = document.querySelectorAll(
        ".player-two-board-container > .grid-box"
    );

    if (playerTurn === getPlayerOne()) {
        playerTwoBoard.forEach((xCoordinate) => {
            xCoordinate.forEach((yCoordinate) => {
                if (yCoordinate[0] === "not hit") {
                    const coordinatesStr = [
                        playerTwoBoard.indexOf(xCoordinate),
                        xCoordinate.indexOf(yCoordinate),
                    ].join(",");
                    playerTwoGridBoxes.forEach((gridBox) => {
                        if (gridBox.dataset.coordinates === coordinatesStr) {
                            gridBox.addEventListener("click", handleAttack);
                        }
                    });
                }
            });
        });
        playerOneGridBoxes.forEach((gridBox) => {
            gridBox.removeEventListener("click", handleAttack);
        });
    }

    if (playerTurn === getPlayerTwo()) {
        playerOneBoard.forEach((xCoordinate) => {
            xCoordinate.forEach((yCoordinate) => {
                if (yCoordinate[0] === "not hit") {
                    const coordinatesStr = [
                        playerOneBoard.indexOf(xCoordinate),
                        xCoordinate.indexOf(yCoordinate),
                    ].join(",");
                    playerOneGridBoxes.forEach((gridBox) => {
                        if (gridBox.dataset.coordinates === coordinatesStr) {
                            gridBox.addEventListener("click", handleAttack);
                        }
                    });
                }
            });
        });
        playerTwoGridBoxes.forEach((gridBox) => {
            gridBox.removeEventListener("click", handleAttack);
        });
    }

    if (getGameOver()) {
        playerOneGridBoxes.forEach((gridBox) => {
            gridBox.removeEventListener("click", handleAttack);
        });
        playerTwoGridBoxes.forEach((gridBox) => {
            gridBox.removeEventListener("click", handleAttack);
        });
    }
}

function generateRandomCoordinates() {
    const xCoordinate = Math.floor(Math.random() * 10);
    const yCoordinate = Math.floor(Math.random() * 10);
    return [xCoordinate, yCoordinate];
}

export function playComputerAttack() {
    const playerOneBoard = getPlayerOne().getBoard();
    const attackList = playerOneBoard.getAttackList();
    const attackListStr = [];
    attackList.forEach((coordinates) => {
        attackListStr.push(coordinates.join(","));
    });
    let draftCoordinates = generateRandomCoordinates().join(",");
    while (attackListStr.includes(draftCoordinates)) {
        draftCoordinates = generateRandomCoordinates().join(",");
    }
    attack("player-one", draftCoordinates);
}
