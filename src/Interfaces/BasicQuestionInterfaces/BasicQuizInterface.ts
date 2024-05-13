import { BasicQuizResults } from "../Results/BasicQuizResults";
import { User } from "../User/User";
import { BasicQuestion } from "./QuestionInterface";

export interface BasicQuiz{
    basicQuizId?: number;
    dateTaken: string;
    questionList: BasicQuestion[]; 
    numAnswered: number;     
    currentQuestion : number; 
    displayOrder: number[];
    basicQuizResults? : BasicQuizResults;
    user? : User;   
}
