import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"

export default function Question({questionText, answers, onSelectAnswers ,selectedAnswer, answerState, onSkipAnswer}){
    return (
        <div id="question">
                <QuestionTimer timeout={5000} onTimeout={onSkipAnswer} />
                <h2>{questionText}</h2>
                <Answers 
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    answerState={answerState}
                    onSelect={onSelectAnswers}
                />
        </div>
    )
}