import React, { useState } from 'react';

export default function Countdown(props) {
    const [countdown, setCountdown] = useState("");

    const startTimer = () => setInterval(function () {
        const now = new Date().getTime();
        const distance = props.gameCountdown - now;

        // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`Game starts in ${minutes}:${seconds}`);

        if (distance < 0) {
            setCountdown("WARRR !!");
        }
    }, 1000);

    if (props.gameCountdown > 0) startTimer();

    return (
        <div>
            {countdown}
        </div>
    )
}