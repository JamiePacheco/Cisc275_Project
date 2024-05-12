import { BasicQuizResults } from "../Results/BasicQuizResults";
import { User } from "../User/User";
import { Question } from "./QuestionInterface";

export interface BasicQuiz{
    basicQuizId?: number;
    dateTaken: string;
    questionList: Question[]; 
    numAnswered: number;     
    currentQuestion : number; 
    displayOrder: number[];
    basicQuizResults? : BasicQuizResults;
    user? : User;   
}
