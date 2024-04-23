/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { QuizInteraction } from './Components/QuizInteraction/QuizInteraction';
import { ProgressBarWidget } from './Components/ProgressBarWidget/ProgressBarWidget';

export function BasicQuestionsPage() : React.JSX.Element {

    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader/>
            <GeneralQuestions/>
        </div>
    );
}