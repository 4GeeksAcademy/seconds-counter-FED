import React, { useState, useEffect, useRef } from 'react';

const SecondsCounter = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [countdownValue, setCountdownValue] = useState('');
  const [countdownSeconds, setCountdownSeconds] = useState(null);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isElapsedPaused, setIsElapsedPaused] = useState(false);
  const [pausedElapsedTime, setPausedElapsedTime] = useState(0);
  const startTimeRef = useRef(null);

  const startElapsedTimer = (pausedTime = 0) => {
    startTimeRef.current = Date.now() - pausedTime * 1000;
    const timerIntervalId = setInterval(() => {
      if (!isElapsedPaused) {
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedSeconds(elapsedTime);
      }
    }, 1000);
    setIntervalId(timerIntervalId);
  };

  useEffect(() => {
    startElapsedTimer();
    return () => clearInterval(intervalId);
  }, []);

  const handleElapsedPause = () => {
    setIsElapsedPaused(true);
    clearInterval(intervalId);
    setPausedElapsedTime(elapsedSeconds);
  };

  const handleElapsedResume = () => {
    setIsElapsedPaused(false);
    // Ensure there's no accidental clearInterval here
    const pausedTimeInSeconds = pausedElapsedTime - (elapsedSeconds - pausedElapsedTime);
    startElapsedTimer(pausedTimeInSeconds);
  };

  const handleElapsedReset = () => {
    setElapsedSeconds(0);
    setPausedElapsedTime(0);
    startElapsedTimer();
  };

  const handleCountdownChange = (event) => {
    setCountdownValue(event.target.value);
  };

  const handleCountdownStart = () => {
    setIsCountdownRunning(true);
    setCountdownSeconds(parseInt(countdownValue));
  };

  const handleCountdownReset = () => {
    setIsCountdownRunning(false);
    setCountdownSeconds(null);
  };

  useEffect(() => {
    if (isCountdownRunning && countdownSeconds !== null && countdownSeconds > 0) {
      const countdownIntervalId = setInterval(() => {
        setCountdownSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(countdownIntervalId);
    } else if (countdownSeconds === 0) {
      setIsCountdownRunning(false);
      clearInterval(intervalId);
      alert('Time is up!');
    }
  }, [countdownSeconds, isCountdownRunning]);

  return (
    <div className="seconds-counter">
      <div className="elapsed">
        <p>Seconds since website finished loading: {elapsedSeconds}</p>
        {isElapsedPaused ? (
          <button onClick={handleElapsedResume}>Resume Elapsed</button>
        ) : (
          <button onClick={handleElapsedPause}>Pause Elapsed</button>
        )}
        <button onClick={handleElapsedReset}>Reset Elapsed</button>
      </div>
      <div className="countdown">
        <input
          type="number"
          value={countdownValue}
          onChange={handleCountdownChange}
          placeholder="Enter countdown value"
          disabled={isCountdownRunning}
        />
        <button onClick={handleCountdownStart} disabled={isCountdownRunning}>
          Start Countdown
        </button>
        <button onClick={handleCountdownReset}>Reset Countdown</button>
        {countdownSeconds !== null && (
          <p>Seconds remaining: {countdownSeconds}</p>
        )}
      </div>
    </div>
  );
};

export default SecondsCounter;
