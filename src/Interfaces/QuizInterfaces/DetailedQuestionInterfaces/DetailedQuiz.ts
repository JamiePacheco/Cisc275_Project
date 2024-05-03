import { QuizResults } from "../../Results/QuizResults";
import { BearInteraction } from "./BearInteraction";

export interface DetailedQuiz {
    interactions : BearInteraction[];
    results? : QuizResults
} 