/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { QuizInteraction } from './Components/QuizInteraction/QuizInteraction';

export function BasicQuestionsPage() : React.JSX.Element {

    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader/>
            <GeneralQuestions/>
        </div>
    );
}