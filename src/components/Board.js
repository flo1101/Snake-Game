import React, {useEffect, useState} from "react";
import Snake from "../snake";

export default function Board() {

    const BOARD_SIZE = 15;

    const [score, setScore] = useState(0);
    const [board, setBoard] = useState(createBoard());
    const [snake, setSnake] = useState(new Snake([[3,7],[2,7],[1,7]]));
    const [snakeCellValues, setSnakeCellValues] = useState([[3,7],[2,7],[1,7]]);
    const [foodCell, setFoodCell] = useState([10,7]);
    const [direction, setDirection] = useState("r");

    useEffect(() => {
        // window.setInterval(() => {
        //     moveSnake();
        // }, 1000)

        window.addEventListener("keydown", e => {
            const newDirection = getDirectionFromKey(e.key);
            if (newDirection !== "") {
                setDirection(newDirection);
            }
        })
    }, [])

    function moveSnake() {
        const tail = snake.tail;
        snake.move(direction);
        setSnakeCellValues(prevState => {
            const newState = new Set(prevState);
            newState.forEach(value => {
                if (compareCells(tail.getValue(), value)) {
                    newState.delete(value)
                }
            })
            newState.add(snake.head.getValue())
            return newState
        })
        checkFood();
    }

    function checkFood() {
        if (!compareCells(snake.head.getValue(), foodCell)) return;
        setFoodCell(getFreeCell);
        setScore(prevScore => prevScore + 1);
        growSnake();
    }

    function growSnake() {
        snake.grow()
        setSnakeCellValues(prevState => {
            const newState = new Set(prevState);
            newState.add(snake.tail.getValue());
            return newState;
        })
    }

    function getFreeCell() {
        const x = randomNumber(BOARD_SIZE);
        const y = randomNumber(BOARD_SIZE);
        const newCell = [x,y];
        snakeCellValues.forEach(value => {
            if (compareCells(newCell,value)) return getFreeCell();
        })
        return newCell;
    }

    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function getDirectionFromKey(key) {
        switch (key) {
            case "ArrowUp":
                return "u";
            case "ArrowDown":
                return "d";
            case "ArrowRight":
                return "r";
            case "ArrowLeft":
                return "l";
            default:
                return "";
        }
    }

    function compareWithSnakeCells(cellValue) {
        for (const snakeCellValue of snakeCellValues) {
            if (compareCells(cellValue, snakeCellValue)) { return true }
        }
        return false;
    }

    function compareCells(a,b) {
        return a[0] === b[0] && a[1] === b[1];
    }

    function createBoard() {
        const board = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            const currRow = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                currRow.push([col, row]);
            }
            board.push(currRow);
        }
        return board;
    }

    return (
        <div>
            <h2 className="score">Score: {score}</h2>
            <button onClick={moveSnake}>move</button>
            <div className="board">
                {board.map((row) => (
                    row.map((cellValue, cellID) => (
                        <div
                            key={cellID}
                            className={`cell 
                                ${compareWithSnakeCells(cellValue) ? "snake" : ""}
                                ${compareCells(cellValue, foodCell) ? "food" : ""}`}>
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}
