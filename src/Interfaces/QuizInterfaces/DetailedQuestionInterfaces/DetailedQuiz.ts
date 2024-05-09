import { QuizResults } from "../../Results/QuizResults";
import { User } from "../../User/User";
import { BearInteraction } from "./BearInteraction";

export interface DetailedQuiz {
    id? : number;
    dateTaken : string;
    bearClicked : number
    interactions : BearInteraction[];
    results? : QuizResults;
    user? : User;
} 