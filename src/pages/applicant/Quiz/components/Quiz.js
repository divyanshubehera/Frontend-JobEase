import React, { useState } from 'react'
import QuizResult from './QuizResult';
function Quiz(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);


    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < props.quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true)
        }
    }
    const updateScore = () => {
        if (clickedOption === props.quizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }

    const toHome = ()=>{
        window.location = '/applicant/quiz';
    }
    return (
        <div className='quiz-main-container'>
            <div className='quiz-wrapper'>
                <div className="quiz-container">
                    {showResult ? (
                        <QuizResult score={score} totalScore={props.quizData.length} tryAgain={resetAll} toHome = {toHome} />
                    ) : (
                        <>
                            <div className="question">
                                <span id="question-number">{currentQuestion + 1}. </span>
                                <span id="question-txt">{props.quizData[currentQuestion].question}</span>
                            </div>
                            <div className="option-container">
                                {props.quizData[currentQuestion].options.map((option, i) => {
                                    return (
                                        <button
                                            className={`option-btn ${clickedOption === i + 1 ? "checked" : null
                                                }`}
                                            key={i}
                                            onClick={() => setClickedOption(i + 1)}
                                        >
                                            {option}
                                        </button>
                                    )
                                })}
                            </div>
                            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                        </>)}
                </div>
            </div>
        </div>
    )
}

export default Quiz