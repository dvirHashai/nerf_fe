import React, { useState, useEffect } from 'react';
import './App.css';
import { GenerateGame, GetGame, StartGame } from './api/nerfwarzApi';
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

  // useEffect(() => {
  //   const game = GetGame();

  //   setGame({
  //     gameId: "123" /*gameResponse.gameId */,
  //     gameStartTime: new Date().setMinutes(5) /*gameResponse.gameStartDate */
  //   });
  // }, [])

  const generateGame = async () => {
    const gameResponse = await GenerateGame();

    if (gameResponse && gameResponse.gameId) {
      setGame({
        gameId: gameResponse.gameId
      });
      setGameStarted(true);
      startGetGame();
    }
  };

  const startGetGame = () => setTimeout(async () => {
    console.log("getting game");
    const currentGame = await GetGame(game.gameId);
    let teams = {
      defenderGroup: {},
      attackerGroup: {}
    };

    if (currentGame && currentGame.players) {
      for (let i = 0; i < currentGame.players.length; i++) {
        if (i % 2 === 0) {
          teams.defenderGroup.players.push(currentGame.players[i]);
        }
        else {
          teams.attackerGroup.players.push(currentGame.players[i]);
        }
      };
      console.log("defense", JSON.stringify(teams.defenderGroup));
      console.log("attack", JSON.stringify(teams.attackerGroup));
      setGame({
        teams: teams
      });
    }
  }, 3000);

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
        <GameBoard game={game} />
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