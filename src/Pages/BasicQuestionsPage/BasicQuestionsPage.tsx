import React, { useState, useEffect } from 'react';
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { ReviewWidget } from "./ReviewAnswersWidget/ReviewAnswersWidget";
import { quizObjects } from './Components/GeneralQuestionWidget/QuestionFunctions';

export function BasicQuestionsPage(): JSX.Element {
    const [isVisible, setIsVisible] = useState(true);
    const [reviewIsVisible, setReviewIsVisible] = useState(false);
    const [quiz] = useState(() => quizObjects()); 
    const [answers, setAnswers] = useState<string[]>(() => Array(quiz.questionList.length).fill(""));

    useEffect(() => {
        console.log("Display Order on Quiz Init in BasicQuestionsPage:", quiz.displayOrder);
        console.log("Answers in BasicQuestionsPage:", answers);
    }, [quiz.displayOrder, answers]);

    return (
        <div className='BasicQuestionsPage'>
            <div style={{ display: isVisible ? 'block' : 'none' }}>
                <BasicQuestionsPageHeader />
                <GeneralQuestions 
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setReviewIsVisible={setReviewIsVisible}
                    quiz={quiz}
                    displayOrder={quiz.displayOrder} 
                    answers={answers}
                    setAnswers={setAnswers}
                />
            </div>
            <div style={{ display: reviewIsVisible ? 'block' : 'none' }}>
                <ReviewWidget 
                    setReviewIsVisible={setReviewIsVisible}
                    setIsVisible={setIsVisible}
                    questions={quiz.questionList}
                    displayOrder={quiz.displayOrder} 
                    answers={answers}
                />
            </div>
        </div>
    );
}