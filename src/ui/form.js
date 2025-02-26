const gameForm = document.querySelector(".game-form");
const singlePlayerButton = document.getElementById("single-player");
const twoPlayerButton = document.getElementById("two-player");
const playerOneInput = document.getElementById("input-player-1");

function handleTwoPlayerClick() {
    const playerTwoInput = document.createElement("input");
    playerTwoInput.id = "input-player-2";
    playerTwoInput.name = "input-player-2";
    playerTwoInput.value = "";
    playerTwoInput.placeholder = "Player 2";
    playerOneInput.insertAdjacentElement("afterend", playerTwoInput);
}

function handleSinglePlayerClick() {
    const playerTwoInput = document.getElementById("input-player-2");
    if (playerTwoInput) {
        playerTwoInput.remove();
    }
}

export function attachFormEventListeners() {
    twoPlayerButton.addEventListener("click", handleTwoPlayerClick);
    singlePlayerButton.addEventListener("click", handleSinglePlayerClick);
}
