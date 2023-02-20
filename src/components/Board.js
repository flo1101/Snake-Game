import React, {useState} from "react";

export default function Board() {

    const BOARD_SIZE = 15;

    const [score, setScore] = useState(0);
    const [board, setBoard] = useState(
        new Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0))
    );

    return (
        <div>
            <h2 className="score">Score: {score}</h2>
            <div className="board">
                {board.map((row) => (
                    row.map((cell, cellID) => (
                        <div className="cell" key={cellID}></div>
                    ))
                ))}
            </div>
        </div>
    )
}
