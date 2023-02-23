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
    const [gameState, setGameState] = useState(gameStates.DEFAULT)

    function startGame() {
        setGameState(gameStates.RUNNING)
    }

    function endGame() {
        setGameState(gameStates.FINISHED)
    }

    function returnToMenu() {
        setGameState(gameStates.DEFAULT)
    }

    function getPageContent() {
        if (gameState === gameStates.RUNNING) {
            return (
                <>
                    <h2 className="score">Score: {score}</h2>
                    <Board setScore={setScore} endGame={endGame}/>
                </>
            )
        } else if (gameState === gameStates.FINISHED) {
            return (
                <div>
                    <h1>Your Score: {score}</h1>
                    <button onClick={startGame}>Play Again</button>
                    <button onClick={returnToMenu}>Main Menu</button>
                </div>
            );
        } else if (gameState === gameStates.DEFAULT) {
            return (
                <div className={"menu"}>
                    <h1>Snake Game</h1>
                    <p className={"intro-text"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem et magni modi molestias temporibus voluptatibus! Asperiores consequatur dolorem quas?</p>
                    <button className={"btn-menu-play"} onClick={startGame}>Start Game</button>
                </div>
            )
        }
    }

    return (
        <>{getPageContent()}</>
    );
}

export default App;
