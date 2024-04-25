/* eslint-disable @typescript-eslint/no-unused-vars */
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { RevealAnswers } from './Components/QuizInteraction/RevealAnswersButton/RevealAnswersButton';
import { useState } from 'react';


export function BasicQuestionsPage() : React.JSX.Element {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader/>
            <GeneralQuestions/>
            <RevealAnswers/>
        </div>
    );
}