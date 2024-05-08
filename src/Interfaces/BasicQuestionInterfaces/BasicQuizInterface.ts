import { Question } from "./QuestionInterface";

export interface BasicQuiz{
    questionList: Question[]; 
    numAnswered: number;      
    displayOrder: number[];   
}
