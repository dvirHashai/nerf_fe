import React, { useState, useEffect } from 'react';
import { WarMinPlayers } from '../data/consts';

export default function Countdown(props) {
    const [countdown, setCountdown] = useState("");
    const [playersCount, setPlayersCount] = useState("");

    useEffect(() => {
        if (props.gameStartDate > 0 && props.gameStartDate > Date.now()) {
            setInterval(calculateCounter, 100);
        }
        if (!!props.game && !!props.game.players) {
            console.log("Countdown players", props.game.players);
            setPlayersCount(props.game.players.length);
        }
    }, [props]);

    function calculateCounter() {
        const now = new Date().getTime();
        const distance = props.gameStartDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const parsedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        let message = "";
        if (distance <= 0 && playersCount >= WarMinPlayers) {
            message = "LET THE WAR BEGIN !!";
        }
        else if (distance <= 0 && playersCount < WarMinPlayers) {
            message = "You have to recruit more, we won't go to war looking like that !";
        }
        else if (distance > 0) {
            message = `Going to war in ${minutes}:${parsedSeconds}`;
        }
        else {
            message = `Whats going on???`;
        }

        setCountdown(message);
    }

    let message = (playersCount > 0 && WarMinPlayers - playersCount) > 0 ?
        <>
            <br />
            <div>{`${WarMinPlayers - playersCount} more players to go`}</div>
        </>
        : "";
    return (
        <>
            <div>
                {countdown}
            </div>
            <div>
                {message}
            </div>
        </>
    )
}