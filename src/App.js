import React, { useState } from 'react';
import './App.css';
import { GenerateGame, StartGame } from './api/nerfwarzApi';
import Countdown from './components/Countdown';
import GameBoard from './components/GameBoard';
import BackgroundImg from './assets/Nerf_logo.jpg'

export default function App() {
  const [game, setGame] = useState({});
  const [gameStartDate, setGameStartDate] = useState("");

  const generateGame = async () => {
    const gameResponse = await GenerateGame();

    if (!!gameResponse && !!gameResponse.gameId) {
      console.log("setting game", gameResponse.gameId);
      setGame({
        gameId: gameResponse.gameId
      });
      setGameStartDate(new Date().setMinutes(new Date().getMinutes() + 1));
    }
  };

  function startGame() {
    StartGame();
  };

  return (
    <div className="App" style={styles.app}>
      {console.log("rendering App..")}
      <div className="initGame">
        <button onClick={generateGame} style={styles.button}>Generate</button>
      </div>
      <div className="gameCountdown">
        <Countdown
          gameCountdown={gameStartDate} />
      </div>
      <div className="gameInfo">
        <GameBoard game={game} setGame={setGame} />
      </div>
      <div className="startGame">
        <button onClick={startGame} style={styles.button}>Start</button>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

  },
  button: {
    width: "18em",
    height: "8em"
  }
}