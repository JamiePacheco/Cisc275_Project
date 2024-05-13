import React, { useState, useEffect } from 'react';
import './BasicQuestionsPage.css';
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { ReviewWidget } from "./ReviewAnswersWidget/ReviewAnswersWidget";
import { generateBasicQuiz} from './Components/GeneralQuestionWidget/QuestionFunctions';

import clipboard from "../../assets/images/clipboard-clip.png"

export function BasicQuestionsPage(): JSX.Element {
    const [isVisible, setIsVisible] = useState(true);
    const [reviewIsVisible, setReviewIsVisible] = useState(false);
    // const [quiz] = useState(() => quizObjects());
    //added new method of generating quiz that contains question list is presented order
    const [quiz, setQuiz] = useState(() => generateBasicQuiz()) 
    const [answers, setAnswers] = useState<string[]>(() => Array(quiz.questionList.length).fill(""));
    const [startingIndex, setStartingIndex] = useState<number>(quiz.currentQuestion - 1)

    useEffect(() => {
        console.log("Display Order on Quiz Init in BasicQuestionsPage:", quiz.displayOrder);
        console.log(quiz)
        console.log("Answers in BasicQuestionsPage:", answers);
    }, [quiz.displayOrder, answers, quiz.questionList, quiz]);

    console.log("question index: " + startingIndex)
    return (
        <div className='BasicQuestionsPage'>
            <div className = "BasicQuestionsPage-Content">
                <img src = {clipboard} alt = "clip" className = "clip"/>
                <div className = "clip-board-container">
                    <div className = "quiz-display" style={{ display: isVisible ? 'block' : 'none' }}>
                        <GeneralQuestions 
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            setReviewIsVisible={setReviewIsVisible}
                            quiz={quiz}
                            displayOrder={quiz.displayOrder} 
                            answers={answers}
                            setAnswers={setAnswers}
                            startingIndex={startingIndex}
                            setQuiz={setQuiz}
                        />
                    </div>
                    <div style={{ display: reviewIsVisible ? 'block' : 'none' }}>
                        <ReviewWidget 
                            quizData={quiz}
                            setReviewIsVisible={setReviewIsVisible}
                            setIsVisible={setIsVisible}
                            questions={quiz.questionList}
                            displayOrder={quiz.displayOrder} 
                            answers={answers}
                            setStartingIndex = {setStartingIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}