import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const SecondsCounter = () => {
    const [count, setCount] = useState(0);
    const [countdownValue, setCountdownValue] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const countdownRef = useRef(null);

    useEffect(() => {
        if (isRunning && count > 0) {
            countdownRef.current = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (isRunning && count === 0) {
            alert('Time  is up!');
            setIsRunning(false);
        }

    return () => clearTimeout(countdownRef.current);
}, [count, isRunning]);

const handleStart = () => {
    if (countdownValue) {
        setCount(parseInt(countdownValue));
        setIsRunning(true);
    }
};

const handleStop = () => {
    setIsRunning(false);
};

const handleReset = () => {
    setCount(0);
    setCountdownValue('');
    setIsRunning(false);
};

return (
        <div className="countdown-container">
            <div className="d-flex align-items-center justify-content-center">
                <input
                className="countdown-input"
                type="number"
                value={countdownValue}
                onChange={(e) => setCountdownValue(e.target.value)}
                placeholder="Enter countdown value"
                />
                <button className="countdown-button" onClick={handleStart} disabled={isRunning}>
                    Start
                </button>
                <i className="far fa-clock fa-2x mr-2"></i>
                <span className="countdown-display">{count.toString().padStart(6, '0')}</span>
                <button className="countdown-button" onClick={handleStop} disabled={!isRunning}>
                Stop
                </button>
                <button className="countdown-button" onClick={handleReset} disabled={!isRunning && count === 0}>
                    Reset
                </button>
            </div>  
        </div>
    );
};

SecondsCounter.propTypes = {
    seconds: PropTypes.number,
};

export default SecondsCounter;

