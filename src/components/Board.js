import React, {useEffect, useState} from "react";
import Snake from "../snake";
import useInterval from "../lib/utils"

export default function Board({setScore, endGame, speed, direction, setDirection}) {

    const BOARD_SIZE = 15;

    const [snake, setSnake] = useState(new Snake([[3, 7], [2, 7], [1, 7]]));
    const [snakeCells, setSnakeCells] = useState([[3, 7], [2, 7], [1, 7]]);
    const [foodCell, setFoodCell] = useState([10, 7]);
    // const [direction, setDirection] = useState("r");

    const board = createBoard();

    useEffect(() => {
        window.addEventListener("keydown", e => {
            const newDirection = getDirectionFromKey(e.key);
            if (newDirection !== "") {
                console.log(newDirection)
                setDirection(newDirection);
            }
        })
    }, [])

    function getDirectionFromKey(key) {
        switch (key) {
            case "ArrowUp":
                return "UP";
            case "ArrowDown":
                return "DOWN";
            case "ArrowRight":
                return "RIGHT";
            case "ArrowLeft":
                return "LEFT";
            default:
                return "";
        }
    }

    useInterval(() => {
        moveSnake();
    }, speed);

    function moveSnake() {
        const tail = snake.tail;
        snake.move(direction);
        setSnakeCells(prevState => {
            const newState = new Set(prevState);
            newState.forEach(value => {
                if (compareCells(tail.getValue(), value)) {
                    newState.delete(value)
                }
            })
            newState.add(snake.head.getValue())
            return newState
        })
        checkValidField();
        checkFood();
    }

    function checkValidField() {
        const head = snake.head.getValue()
        const x = head[0];
        const y = head[1];
        if (x < 0 || x > BOARD_SIZE-1 || y < 0 || y > BOARD_SIZE-1) endGame();
        snakeCells.forEach(cell => {
            if (compareCells(head, cell)) endGame();
        })
    }

    function checkFood() {
        if (!compareCells(snake.head.getValue(), foodCell)) return;
        setFoodCell(getNewFoodCell());
        setScore(prev => prev + 1);
        growSnake();
    }

    function growSnake() {
        if (!snake.grow(snakeCells)) return;
        setSnakeCells(prevState => {
            const newState = new Set(prevState);
            newState.add(snake.tail.getValue());
            return newState;
        })
    }

    function getNewFoodCell() {
        let newCell;
        let isSnakeCell = true;
        while (isSnakeCell) {
            newCell = getRandomCell();
            isSnakeCell = false;
            snakeCells.forEach(snakeCell => {
                if (compareCells(newCell, snakeCell)) {
                    isSnakeCell = true;
                }
            })
        }
        return newCell;
    }

    function getRandomCell() {
        const x = randomNumber(BOARD_SIZE);
        const y = randomNumber(BOARD_SIZE);
        return [x, y];
    }

    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }


    function compareWithSnakeCells(cellValue) {
        for (const snakeCellValue of snakeCells) {
            if (compareCells(cellValue, snakeCellValue)) {
                return true
            }
        }
        return false;
    }

    function compareCells(a, b) {
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
