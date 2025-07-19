import { useState } from "react"
import QUESTIONS from "../questions.js"
import ImageUrl from "../assets/quiz-complete.png"

export default function Quiz(){
    const [answers, setAnswers] = useState([]);
    const activeQuestionIndex = answers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        try {
            setAnswers((prevAnswers) => {
                return [...prevAnswers,selectedAnswer];
            })
        } catch (error) {
            console.log(error);
        }
    }

    if(quizIsComplete){
        return (
            <div id="summary">
                <img src={ImageUrl} alt="trophy" />
                <h2>Quiz Complted!!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random - 0.5);

    return (
        <>  
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        </>
    )
}