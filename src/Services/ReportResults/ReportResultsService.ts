import { BasicQuiz } from "../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { quizType } from "../../Interfaces/Reports/ReportsResults";

export function isBasicQuiz(reportResult : BasicQuiz | DetailedQuiz, quizType : quizType) : reportResult is BasicQuiz {
    return quizType === "basic"
} 

export function isDetailedQuiz(reportResult : BasicQuiz | DetailedQuiz, quizType : quizType) : reportResult is DetailedQuiz {
    return quizType === "detailed"
}