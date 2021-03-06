import React, { useState } from 'react';
import './App.css';
import { GenerateGame, PublishGame } from './api/nerfwarzApi';
import Countdown from './components/Countdown';
import GameBoard from './components/GameBoard';
import nerfWarsLogo from './assets/nerf-wars.png';
import backgroundImg from './assets/carbonWallpaper3.jpg';
import buttonImg from './assets/carbon.png';
import places from './data/places.json';

export default function App() {
  const [game, setGame] = useState({});
  const [gameStartDate, setGameStartDate] = useState("");

  const generateGame = async () => {
    if (!!!gameStartDate) {
      const gameResponse = await GenerateGame();
      
      if (!!gameResponse && !!gameResponse.gameId) {
        const place = places.places[Math.floor(Math.random() * (places.places.length))].name;
        setGameStartDate(new Date().setSeconds(new Date().getSeconds() + 10));
        setGame({
          gameId: gameResponse.gameId,
          place: place
        });
      }
    }
  };
//TODO - start when at least 5 defense players registered 
  const startGame = async () => {
    console.log("startGame game", game);
    if (Date.now() > gameStartDate) {
    console.log("♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♫♪♪♪♪♪♪publihsing game", game);
    await PublishGame(game);
    }
  };

  return (
    <div className="App" style={styles.app}>
      {console.log("rendering App..")}
      <div className="logo" style={styles.logo}>
      </div>
      <div className="game" style={styles.game}>
        <div className="initGame">
          <button onClick={generateGame} style={styles.button}>Generate new game</button>
        </div>
        <div className="gameCountdown">
          <Countdown
            gameStartDate={gameStartDate}
            game={game} />
        </div>
        <div className="gameInfo">
          <GameBoard 
            game={game} 
            setGame={setGame} 
            gameStartDate={gameStartDate} />
        </div>
        <div className="startGame">
          <button onClick={startGame} style={styles.button}>Start</button>
        </div>
      </div>
      <footer>

      </footer>
    </div>
  );
}

const styles = {
  app: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  logo: {
    backgroundImage: `url(${nerfWarsLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: "20vh",
    width: "auto"
  },
  game: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "80vh",
    width: "auto"
  },
  button: {
    backgroundImage: `url(${buttonImg})`,
    borderRadius: "0.6em",
    border: "2px solid orange",
    fontFamily: "ArcadeClassic",
    color: "white",
    width: "85vw",
    padding: "1em",
    cursor: "pointer",
    outline: "none"
  }
}