import { BasicQuiz } from "../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";

export function isBasicQuiz(reportResult : BasicQuiz | DetailedQuiz) : reportResult is BasicQuiz {
    return true;
} 

export function isDetailedQuiz(reportResult : BasicQuiz | DetailedQuiz) : reportResult is DetailedQuiz {
    return true;
}