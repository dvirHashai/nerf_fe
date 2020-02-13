import React, { useEffect, useState } from 'react';
import { GetGame } from '../api/nerfwarzApi';
import { WarMinPlayers } from '../data/consts';

export default function GameBoard(props) {
    const [thisGame, setThisGame] = useState(props.game);
    const [attackTeam, setAttackTeam] = useState([]);
    const [defenseTeam, setDefenseTeam] = useState([]);
    const [referee, setReferee] = useState({});

    useEffect(() => {
        if (!!props.game && !!props.game.gameId && props.gameStartDate > Date.now()) {
            let gameResponse;
            setTimeout(async () => {
                console.log("getting game");
                gameResponse = await GetGame(props.game.gameId);
                gameResponse.place = props.game.place;
                gameResponse.referee = referee;
                gameResponse.attackerGroup = attackTeam;
                gameResponse.defenderGroup = defenseTeam;
                
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
                if (players.length >= WarMinPlayers) {
                    setReferee(defense.pop());
                }
                setDefenseTeam(defense);
                setAttackTeam(attack);
            }
        }
    }, [thisGame]);

    const refereeTxt = 
        !!referee && !!referee.Item ?
        <>
            <h3 style={{color: "gold"}}>Referee</h3>
            <div>{referee.Item.name}</div>
        </> : "";
    const placeTxt = !!thisGame.place ?
        <>
            <h3 style={{color: "gold"}}>War zone</h3>
            <div>{thisGame.place}</div>
        </> : "";

    return (
        <div style={styles.gameBoard}>
            <div style={styles.teams}>
                <div className="attackTeam">
                    <h3 style={{color: "cornflowerblue"}}>Attack</h3>
                    {attackTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
                </div>
                <div className="defenseTeam">
                    <h3 style={{color: "orangered"}}>Defense</h3>
                    {defenseTeam.map(player => <div key={player.Item.playerId}>{player.Item.name}</div>)}
                </div>
            </div>
            <div style={styles.gameInfo}>
                <div>
                    {placeTxt}
                </div>
                <div>
                    {refereeTxt}
                </div>
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
        boxShadow: "rgb(66, 133, 244) 0px 0px 10px inset",
        padding: "1em"
    },
    teams: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    gameInfo: {
        display: "flex",
        flexDirection: 'column-reverse',
    }
}