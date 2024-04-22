import { BearAnswer } from "./BearAnswer";
import { BearQuestion } from "./BearQuestion";

export type QuizType = "short" | "long"


export interface Quiz {
    type : QuizType;
    startDate : string;
    questions : BearQuestion[]
    answers : BearAnswer[]
} 