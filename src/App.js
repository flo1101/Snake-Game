import './App.css';
import Board from "./components/Board";
import React, {useState} from "react";
import arrowRestart from "./res/arrow-rotate.svg"

function App() {

    const gameStates = {
        RUNNING: "RUNNING",
        FINISHED: "FINISHED",
        DEFAULT: "DEFAULT"
    }

    const speedOptions = {
        SLOW: 270,
        MEDIUM: 200,
        FAST: 130
    }

    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(speedOptions.MEDIUM)
    const [gameState, setGameState] = useState(gameStates.DEFAULT)

    function startGame() {
        setScore(0)
        setGameState(gameStates.RUNNING)
    }

    function endGame() {
        setGameState(gameStates.FINISHED)
    }

    function returnToMenu() {
        setGameState(gameStates.DEFAULT)
    }

    function getSpeed(speed) {
        switch (speed) {
            case speedOptions.SLOW:
                return "Slow";
            case speedOptions.MEDIUM:
                return "Medium";
            case speedOptions.FAST:
                return "Fast";
            default:
                return "";
        }
    }

    function getPageContent() {
        if (gameState === gameStates.RUNNING) {
            return (
                <>
                    <div className={"game-controls"}>
                        <h2 className="score">Score: {score}</h2>
                        <h3 className={"speed"}>Speed: {getSpeed(speed)}</h3>
                        <div className={"btn-restart"} onClick={returnToMenu}>
                            <img src={arrowRestart} alt=""/>
                        </div>
                    </div>
                    <Board setScore={setScore} endGame={endGame} speed={speed}/>
                </>
            )
        } else if (gameState === gameStates.FINISHED) {
            return (
                <div className={"finish-screen"}>
                    <h1 className={"end-score"}>Your Score: {score}</h1>
                    <div>
                        <button className={"btn-play-again"} onClick={startGame}>Play Again</button>
                        <button onClick={returnToMenu}>Main Menu</button>
                    </div>
                </div>
            );
        } else if (gameState === gameStates.DEFAULT) {
            return (
                <div className={"menu"}>
                    <h1>Snake Game</h1>
                    <h3>How to play:</h3>
                    <p className={"intro-text"}>To control the snake use the arrow keys on your keyboard or the direction buttons on your touch screen for mobile.</p>
                    <h3>Pick your speed:</h3>
                    <div className="speed-options">
                        <div className={`speed-option 
                                ${speed === speedOptions.SLOW ? "active" : ""}`}
                             onClick={() => setSpeed(speedOptions.SLOW)}
                        >
                            <h3>Slow</h3>
                        </div>
                        <div className={`speed-option 
                                ${speed === speedOptions.MEDIUM ? "active" : ""}`}
                             onClick={() => setSpeed(speedOptions.MEDIUM)}
                        >
                            <h3>Medium</h3>
                        </div>
                        <div className={`speed-option 
                                ${speed === speedOptions.FAST ? "active" : ""}`}
                             onClick={() => setSpeed(speedOptions.FAST)}
                        >
                            <h3>Fast</h3>
                        </div>
                    </div>
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
