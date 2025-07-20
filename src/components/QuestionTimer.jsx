import { useState, useEffect } from "react";

export default function QuestionTimer ({timeout, onTimeout}){
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer)
        }
    },[timeout, onTimeout])

    useEffect(() => {
        const intervel = setInterval(() => {
            setRemainingTime((prev) => prev-50);
        },50)
        return () => {
            clearInterval(intervel)
        }
    },[])

    return ( <progress id="question-time" max={timeout} value={remainingTime} /> )
}