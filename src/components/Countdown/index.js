import React, { useEffect, useState } from 'react';
import './timer.scss';


const Countdown = (props) => {

    // Component States
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [expired, setExpired] = useState(false);

    // Setup Component
    useEffect(() => {

        timerInit();
        // setInterval
        const timeout = setInterval(timerInit, 1000);

        return () => clearInterval(timeout);
    }, []);

    // Methods
    const timerInit = () => {
        let { startDate } = props;
        const now = new Date().getTime();
        if (!startDate) {
            setExpired(true);
            return;
        }
        const countDownStartDate = new Date(startDate).getTime();
        const distance = countDownStartDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // For countdown is finished
        if (distance < 0) {
            clearInterval(this.countDownId);
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            setExpired(false);
            return;
        }

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setExpired(false);
    };
    return (
        <div>
            {expired && <div className="expired">Expired</div>}
            {!expired &&
                    <div className="timer">
                        <div className="timer-elem">
                            <span className="time-number">{days}</span>
                            <span className="time-text">DAYS</span>
                        </div>
                        <div className="timer-elem">
                            <span className="time-number">{hours}</span>
                            <span className="time-text">HOURS</span>
                        </div>
                        <div className="timer-elem">
                            <span className="time-number">{minutes}</span>
                            <span className="time-text">MIN</span>
                        </div>
                        <div className="timer-elem">
                            <span className="time-number">{seconds}</span>
                            <span className="time-text">SEC</span>
                        </div>
                    </div>
            }

        </div>
    )

};

export default Countdown;
