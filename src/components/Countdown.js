import React, { useState, useEffect } from 'react';

export default function Countdown(props) {
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!!props.gameCountdown) {
            t();
        }
    }, [])

    function t() {
        const now = new Date().getTime();
        const distance = props.gameCountdown - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`Game starts in ${minutes}:${seconds}`);

        if (distance < 0) {
            setCountdown("WARRR !!");
        }
    }
    const startTimer = () => setInterval(t, 1000);

    if (props.gameCountdown > 0) startTimer();

    return (
        <div>
            {countdown}
        </div>
    )
}