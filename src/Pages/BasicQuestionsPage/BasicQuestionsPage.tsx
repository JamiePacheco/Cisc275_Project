/* eslint-disable @typescript-eslint/no-unused-vars */
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { useState } from 'react';


export function BasicQuestionsPage() : React.JSX.Element {

    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader/>
            <GeneralQuestions/>
        </div>
    );
}