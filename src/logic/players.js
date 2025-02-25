import { gameboard } from "./gameboard";

export const players = (type, name = "Player 1") => {
    const getName = () => name;
    const getType = () => type;
    const board = gameboard();
    const getBoard = () => board;
    return {
        getName,
        getType,
        getBoard,
    };
};
