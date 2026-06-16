import React, { useState } from "react";
import './quiz.css';
import questions from "./quizdata";
import QuizResult from "./quizResult";

const Quiz = () => {
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [CorrectAns, setCorrectAns] = useState(0);
    const [clicked, setClicked] = useState(false);
    const handleAnswerOption = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 5);
            setCorrectAns(CorrectAns + 1);
        }
        setClicked(true);
    };

    const handleNextOption = () => {
        setClicked(false);
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setcurrentQuestion(nextQuestion);
        }
        else {
            setShowResult(true);
        }

    };
    const handlePlayAgain = () => {
        setcurrentQuestion(0);
        setScore(0);
        setCorrectAns(0);
        setShowResult(false);
    }
    return (
        <>
            <div className="app">
                {showResult ? (<QuizResult score={score} CorrectAns={CorrectAns} handlePlayAgain={handlePlayAgain} />) : (<>
                    <div className="question-section ">
                        <h5>Scors:{score}</h5>
                        <div className="question-count">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                        </div>
                        <div className="question-text">
                            {questions[currentQuestion].questionText}
                        </div>
                    </div>
                    <div className="answer-section ">
                        {questions[currentQuestion].answerOptions.map((ans, i) => (
                        
                            <button
                                className={`button ${clicked & ans.isCorrect ? "correct" : "button"}`}
                                disabled={clicked}
                                ket={i} onClick={() => handleAnswerOption(ans.isCorrect)} > {ans.answerText}
                            </button>
                            

                        ))}

                        <div className="actions">
                            <button onClick={handlePlayAgain}>Quit</button>
                            <button disabled={!clicked} onClick={handleNextOption}>Next</button>
                        </div>
                    </div>
                </>)}

            </div>
        </>
    )
}

export default Quiz

























