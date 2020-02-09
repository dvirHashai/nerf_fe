import React, { useEffect, useState } from 'react';
import { GetGame } from '../api/nerfwarzApi';

export default function GameBoard(props) {
    const [thisGame, setThisGame] = useState(props.game);
    const [attackTeam, setAttackTeam] = useState([]);
    const [defenseTeam, setDefenseTeam] = useState([]);

    useEffect(() => {
        console.log("thisGame", props.game);
        if (!!props.game && !!props.game.gameId) {
            let gameResponse;
            setInterval(async () => {
                console.log("getting game");
                gameResponse = await GetGame(props.game.gameId);
                setThisGame(gameResponse);
            }, 5000);

            props.setGame(gameResponse);
        }
    }, [props]);

    useEffect(() => {
        console.log("GameBoard start", thisGame);
        if (!!thisGame && !!thisGame.gameId && !!thisGame.players) {
            const players = thisGame.players;
            let attack = [];
            let defense = [];
            console.log("players from server", players);
            if (!!players) {
                console.log("inserting players");
                defense.push(players[0])
                for (let i = 1; i < players.length; i++) {
                    if (defense.length > attack.length) {
                        attack.push(players[i]);
                    }
                    else {
                        defense.push(players[i]);
                    }
                }
                setAttackTeam(attack);
                setDefenseTeam(defense);
            }
        }
    }, [thisGame]);

    return (
        <div style={styles.gameBoard}>
            <div className="attackTeam">
                <h1>Attack</h1>
                {attackTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
            </div>
            <div className="defenseTeam">
                <h1>Defense</h1>
                {defenseTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
            </div>
        </div>
    );
};

const styles = {
    gameBoard: {
        // backgroundImage: `url(${buttonImg})`,
        backgroundColor: "#222222",
        height: "50vh",
        width: "85vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: "1em",
        border: "2px solid #22b0c6",
        boxShadow: "rgb(66, 133, 244) 0px 0px 10px inset"
    }
}