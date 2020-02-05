import React, { useState, useEffect } from 'react';
import { GetGame } from '../api/nerfwarzApi';

export default function GameBoard(props) {
    const [table, setTable] = useState("");

    useEffect(() => {
        startGetGame();
        const defensePlayers = props.game.teams ? props.game.teams.defenderGroup.players : [];
        const attackPlayers = props.game.teams ? props.game.teams.attackerGroup.players : [];
        let table = [];
        table.push(
            <tr>
                <th>Defense</th>
                <th>Attack</th>
            </tr>);
        if (!!defensePlayers) {
            console.log("inserting players");
            for (let i = 0; i < defensePlayers.length; i++) {
                table.push(
                    <tr>
                        <td>{defensePlayers[i]}</td>
                        <td>{attackPlayers[i]}</td>
                    </tr>)
            }
        }
        setTable(table);
        console.log("table", table);
    }, []);

    const startGetGame = () => setTimeout(async () => {
        console.log("getting game");
        const currentGame = await GetGame(props.game.gameId);
        let teams = {
            defenderGroup: {},
            attackerGroup: {}
        };

        if (currentGame && currentGame.players) {
            teams.defenderGroup.players = [];
            teams.attackerGroup.players = [];
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
            props.setGame({
                teams: teams
            });
        }
    }, 3000);

    return (
        <div>
            <table>{table}</table>
        </div>
    );
}