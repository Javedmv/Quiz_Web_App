import { useCallback, useState } from "react"
import QUESTIONS from "../questions.js"
import ImageUrl from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]); 
  
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });
    }, []);
  
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
  
    if (quizIsComplete) {
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === QUESTIONS[index].answers[0]
      ).length;
      
      const skippedAnswers = userAnswers.filter(answer => answer === null).length;
      const wrongAnswers = userAnswers.length - correctAnswers - skippedAnswers;
  
      return (
        <div id="summary">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='50'%3E🏆%3C/text%3E%3C/svg%3E" alt="trophy" />
          <h2>Quiz Completed!</h2>
          
          <div id="summary-stats">
            <p>
              <span className="number">{correctAnswers}</span>
              <span className="text">Correct</span>
            </p>
            <p>
              <span className="number">{wrongAnswers}</span>
              <span className="text">Wrong</span>
            </p>
            <p>
              <span className="number">{skippedAnswers}</span>
              <span className="text">Skipped</span>
            </p>
          </div>
  
          <ol>
            {QUESTIONS.map((question, index) => (
              <li key={question.id}>
                <h3>{index + 1}</h3>
                <p className="question">{question.text}</p>
                <p className={`user-answer ${
                  userAnswers[index] === null 
                    ? 'skipped' 
                    : userAnswers[index] === question.answers[0] 
                      ? 'correct' 
                      : 'wrong'
                }`}>
                  {userAnswers[index] === null 
                    ? 'Skipped' 
                    : userAnswers[index]
                  }
                </p>
              </li>
            ))}
          </ol>
        </div>
      );
    }
  
    return (
      <>
        <div id="quiz">
          <Question 
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
          />
        </div>
      </>
    );
  }