import { BasicQuiz } from "../BasicQuestionInterfaces/BasicQuizInterface";
import { DetailedQuiz } from "../QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "./User";

export interface UserQuizData {
    basicQuizHistory : BasicQuiz[];
    detailedQuizHistory : DetailedQuiz[];
    userAccount : User;
}