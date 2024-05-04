import { QuizResults } from "../../Results/QuizResults";
import { BearInteraction } from "./BearInteraction";

export interface DetailedQuiz {
    id? : number;
    dateTaken : string;
    interactions : BearInteraction[];
    results? : QuizResults
} 