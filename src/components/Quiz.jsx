import { useCallback, useState } from "react"
import QUESTIONS from "../questions.js"
import ImageUrl from "../assets/quiz-complete.png"
import QuestionTimer from './QuestionTimer';

export default function Quiz(){
    const [answers, setAnswers] = useState([]);
    const activeQuestionIndex = answers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        try {
            setAnswers((prevAnswers) => {
                return [...prevAnswers,selectedAnswer];
            })
        } catch (error) {
            console.log(error);
        }
    },[])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer])

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
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
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