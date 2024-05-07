import { QuizResults } from "../../Results/QuizResults";
import { User } from "../../User/User";
import { BearInteraction } from "./BearInteraction";

export interface DetailedQuiz {
    id? : number;
    dateTaken : string;
    interactions : BearInteraction[];
    results? : QuizResults;
    userAccount? : User;
} 