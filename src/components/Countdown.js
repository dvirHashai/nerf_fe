import React, { useState } from 'react';

export default function Countdown(props) {
    const [countdown, setCountdown] = useState("");

    function calculateCounter() {
        const now = new Date().getTime();
        const distance = props.gameStartDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const parsedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        setCountdown(`Game starts in ${minutes}:${parsedSeconds}`);

        if (distance < 0) {
            setCountdown("WARRR !!");
        }
    }
    const startTimer = () => {
        if (props.gameStartDate > Date.now()) {
            console.log("calculating.............♪♪♪♪♪♪♪♪♪♪♪♪♪♪")
            setInterval(calculateCounter, 100);
        }
    };

    if (props.gameStartDate > 0) startTimer();

    return (
        <div>
            {countdown}
        </div>
    )
}