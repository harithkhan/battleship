import "./style.css";
import { createPlayerOneBoard, createPlayerTwoBoard } from "./ui/create-boards";
import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./ui/render.boards";
import { executePopulationTest } from "./ui/populate-ships-test";
import { attachFormEventListeners } from "./ui/form";

const dialog = document.querySelector(".start-game-dialog");
dialog.showModal();
attachFormEventListeners();

createPlayerOneBoard();
createPlayerTwoBoard();

executePopulationTest();
renderPlayerOneBoard();
renderPlayerTwoBoard();
