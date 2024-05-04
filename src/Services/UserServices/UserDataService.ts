import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "../../Interfaces/User/User";
import { UserQuizData } from "../../Interfaces/User/UserQuizData";

export function CreateNewUserInstance() {

}

export function createUserQuizData(user : User) {
    const userQuizData : UserQuizData = {
        basicQuizHistory: [],
        detailedQuizHistory: [],
        userAccount : user
    }

    localStorage.setItem("USER_DATA", JSON.stringify(userQuizData));
}


//method for saving detailed quiz session data to be shown in other views
//when backend is developed api call to RESTful app should be here
export function saveDetailedQuizData(quizData : DetailedQuiz) {
    
    const userQuizData = localStorage.getItem(`USER_DATA_`);

    if (userQuizData === null) {

    }


}