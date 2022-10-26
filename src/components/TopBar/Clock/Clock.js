import React, {useEffect, useRef, useState} from "react";
import moment from "moment-jalaali";

const Clock = () => {

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const [time, setTime] = useState(moment().format("HH:mm:ss"))

    useInterval(() => {
        setTime(moment().format("HH:mm:ss"))
    }, 1000);

    return (
        <>{time}</>
    );
};

export default Clock;
