import "./style.css";
import { createPlayerOneBoard, createPlayerTwoBoard } from "./ui/create-boards";
import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./ui/render.boards";
import { executePopulationTest } from "./ui/populate-ships-test";

createPlayerOneBoard();
createPlayerTwoBoard();

executePopulationTest();
renderPlayerOneBoard();
renderPlayerTwoBoard();
