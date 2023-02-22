import './App.css';
import Board from "./components/Board";
import React, {useState} from "react";

function App() {

    const gameStates = {
        RUNNING: "RUNNING",
        FINISHED: "FINISHED",
        DEFAULT: "DEFAULT"
    }

    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(gameStates.RUNNING)

    function getPageContent() {
        if (gameState === gameStates.RUNNING) {
            return (
                <>
                    <h2 className="score">Score: {score}</h2>
                    <Board score={score} setScore={setScore}/>
                </>
            )
        } else if (gameState === gameStates.FINISHED) {
            return (
                <div>
                    <h1>Your Score: {score}</h1>
                    <button>play again</button>
                    <button>Main Menu</button>
                </div>
            );
        } else {
            return (
                <div className={"menu"}>

                </div>
            )
        }
    }

    return (
        <>{getPageContent()}</>
    );
}

export default App;
