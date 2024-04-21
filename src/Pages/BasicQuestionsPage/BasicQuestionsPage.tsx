import './BasicQuestionsPage.css';
import { BasicQuestionsPageHeader } from "./Components/BasicQuestionsPageHeader/BasicQuestionsPageHeader";
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { QuizInteraction } from './Components/QuizInteraction/QuizInteraction';


export function BasicQuestionsPage() : React.JSX.Element {
    return (
        <div className='BasicQuestionsPage'> 
            <BasicQuestionsPageHeader></BasicQuestionsPageHeader>
            <GeneralQuestions></GeneralQuestions>
            <QuizInteraction></QuizInteraction>
        </div>
    );
}