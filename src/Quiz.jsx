import React, { useState } from 'react';
import { resultInitialState } from './constants';

function Quiz({questions}) {

    const [currentQuestion,setCurrentQuestion]=useState(0)

    const {question,choices,correctAnswer}=questions[currentQuestion]
    
    const [answerIndex,setAnswerIndex]= useState(null)

    const [CorrectAnswer,setCorrectAnswer]= useState(null)

    const [result,setResult]=useState(resultInitialState)
    
    const [showResult ,setShowResult] = useState(false)


    const onAnswerClick = (answer,index)=>{

        setAnswerIndex(index);
        if (answer === correctAnswer){

            setCorrectAnswer(true)

        }else{
            setCorrectAnswer(false)
        }

    }
    const onClickNext = () => {
        setAnswerIndex(null);
        setResult((prev) => {
          return CorrectAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
              };
        });
        console.log(result)
      
        if (currentQuestion !== questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setCorrectAnswer(null);
        } else {
          setCurrentQuestion(0);
          setShowResult(true);
        }
      };
      
const onTryAgain = ()=>{
    setResult(resultInitialState)
    setShowResult(false)
}
    return (
        <div className='quiz-container'>
            {!showResult ? (<>
         <span className='active-question-nbr'>{currentQuestion+1}</span>
         <span className='total-questions'>/{questions.length}</span>
         <h2>{question}</h2>
         <ul>
            {
                choices.map( (answer,index) => (
                    <li key={answer} 
                    onClick={()=> onAnswerClick(answer,index)}
                    className={answerIndex === index ? 'selected-answer' : null}
                    >
                        {answer}
                    </li>
                ))
            }
         </ul>
         <div className='footer'>
            <button onClick={()=>{onClickNext()}} disabled={answerIndex === null}>
                {currentQuestion === questions.length - 1 ? "Finish":"Next"}
            </button>
         </div>
            </>):(<div className='result'>
            <h3>Result</h3>
            <p>Total Questions : <span>{questions.length}</span></p>
            <p>Total Score : <span>{result.score}</span></p>
            <p>Total Of Correct Answers : <span>{result.correctAnswers}</span></p>
            <p>Total of wrong Answers : <span>{result.wrongAnswers}</span></p>
            <button onClick={()=> onTryAgain()}>Try Again</button>
            </div>)}
            
         
        </div>
    );
}

export default Quiz;