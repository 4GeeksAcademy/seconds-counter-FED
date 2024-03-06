import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SecondsCounter = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

    return () => clearInterval(interval);
}, []);

const formattedCount = count.toString().padStart(6, "0");

    return (
    <div className="container">
        <div className="d-flex align-items-center justify-content-center">
            <i className="far fa-clock fa-2x mr-2"></i>
            <span>{formattedCount}</span>
        </div>  
    </div>
    );
};

SecondsCounter.propTypes = {
    seconds: PropTypes.number,
};

export default SecondsCounter;

