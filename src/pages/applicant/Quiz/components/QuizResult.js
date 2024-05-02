import React from 'react'

function QuizResult(props) {
  return (
    <div className='result'>
      <div className='show-score'>
        Your Score:{props.score}<br />
        Total Score:{props.totalScore}
      </div>
      <div className='btns'>
      <button id="next-button" onClick={props.tryAgain}>Try Again</button>
      <button id="next-button" onClick={props.toHome}>Home</button>
      </div>
    </div>
  )
}

export default QuizResult