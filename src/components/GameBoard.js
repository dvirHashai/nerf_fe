import React, { useEffect, useState } from 'react';
import { GetGame } from '../api/nerfwarzApi';

export default function GameBoard(props) {
    const [thisGame, setThisGame] = useState(props.game);
    const [attackTeam, setAttackTeam] = useState([]);
    const [defenseTeam, setDefenseTeam] = useState([]);

    useEffect(() => {
        if (!!props.game && !!props.game.gameId && props.gameStartDate > Date.now()) {
            let gameResponse;
            setTimeout(async () => {
                console.log("getting game");
                gameResponse = await GetGame(props.game.gameId);
                setThisGame(gameResponse);
                props.setGame(gameResponse);
            }, 5000);
        }
    }, [props]);

    useEffect(() => {
        if (!!thisGame && !!thisGame.gameId && !!thisGame.players) {
            const players = thisGame.players;
            let attack = [];
            let defense = [];
            console.log("players from server", players);
            if (!!players) {
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
            <div style={styles.teams}>
                <div className="attackTeam">
                    <h3>Attack</h3>
                    {attackTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
                </div>
                <div className="defenseTeam">
                    <h3>Defense</h3>
                    {defenseTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
                </div>
            </div>
            <div>
                {!!props.game && !!props.game.referee ? `Referee: ${props.game.referee}` : ""}
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
        flexDirection: "column",
        justifyContent: 'space-between',
        borderRadius: "1em",
        border: "2px solid #22b0c6",
        boxShadow: "rgb(66, 133, 244) 0px 0px 10px inset"
    },
    teams: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    }
}