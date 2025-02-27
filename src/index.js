import "./style.css";
import { createPlayerOneBoard, createPlayerTwoBoard } from "./ui/create-boards";
import { attachFormEventListeners } from "./ui/form";

const dialog = document.querySelector(".start-game-dialog");
dialog.showModal();
attachFormEventListeners();

createPlayerOneBoard();
createPlayerTwoBoard();
