import { useState } from 'react';
import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { QuizInteraction } from './Components/QuizInteraction/QuizInteraction';
import { placeholders } from "./Components/Interfaces/BasicQuestionInterface";
export function BasicQuestionsPage() : React.JSX.Element {
    const [index, setIndex] = useState<number>(0); // index in the list of placeholder questions

    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader></BasicQuestionsPageHeader>
            <GeneralQuestions question = {placeholders[index]}></GeneralQuestions>
            <QuizInteraction setIndex = {setIndex} index = {index}></QuizInteraction>
        </div>
    );
}