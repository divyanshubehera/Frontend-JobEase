import React, { useState } from 'react';
import Quiz from './Quiz';
import { QuizData as QuizData1 } from '../Data/QuizData1';
import { QuizData as QuizData2 } from '../Data/QuizData2';

function QuizSelector() {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleSelectQuiz = (quizData) => {
        setSelectedQuiz(quizData);
    };

    return (
        <div>
            <h1>Quiz Selector</h1>
            <button onClick={() => handleSelectQuiz(QuizData1)}>Quiz 1</button>
            <button onClick={() => handleSelectQuiz(QuizData2)}>Quiz 2</button>
            <hr />
            {selectedQuiz && <Quiz quizData={selectedQuiz} />}
        </div>
    );
}

export default QuizSelector;