import React, { useState, useEffect } from 'react';
import './App.css';
import { GenerateGame, StartGame } from './api/nerfwarzApi';
import Countdown from './components/Countdown';
import GameBoard from './components/GameBoard';

function App() {
  const [game, setGame] = useState({
    gameId: "",
    gameStartTime: "",
    teams: {
      defenderGroup: {
        players: []
      },
      attackerGroup: {
        players: []
      }
    },
    place: "",
    judge: {
      playerId: "",
      tokenId: "",
      name: ""
    }
  });
  const [gameStarted, setGameStarted] = useState(false);

  const generateGame = async () => {
    const gameResponse = await GenerateGame();

    if (!!gameResponse && !!gameResponse.gameId) {
      // console.log("setting game", gameResponse.gameId);
      await setGame({
        gameId: gameResponse.gameId
      });
      // console.log("game updated", game);
      setGameStarted(true);
    }
  };

  

  function startGame() {
    StartGame();
  };

  return (
    <div className="App" style={styles.app}>
      <div className="initGame">
        <button onClick={generateGame} style={styles.button}>Generate</button>
      </div>
      <div className="gameCountdown">
        <Countdown
          date={new Date().setMinutes(new Date().getMinutes() + 1)}
          gameStarted={gameStarted} />
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
    justifyContent: "space-around"
  },
  button: {
    width: "18em",
    height: "8em"
  }
}

export default App;