import { QuizResults } from "../../Results/QuizResults";
import { User } from "../../User/User";
import { BearInteraction } from "./BearInteraction";

export interface DetailedQuiz {
    //Backend sends in this name and too lazy to change rn...
    bearInteractions?: BearInteraction[];
    detailedQuizId? : number;
    dateTaken : string;
    bearClicked : number
    interactions : BearInteraction[];
    results? : QuizResults;
    user? : User;
} 