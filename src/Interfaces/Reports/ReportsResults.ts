import { BasicQuiz } from "../BasicQuestionInterfaces/BasicQuizInterface";
import { DetailedQuiz } from "../QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";


export type quizType = "basic" | "detailed";

export interface ReportsResults {
    quizResultsType : quizType;
    data : DetailedQuiz | BasicQuiz;
}