import axios, { AxiosResponse } from "axios";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "../../Interfaces/User/User";
import { UserQuizData } from "../../Interfaces/User/UserQuizData";


const BASE_USER_DATA_URL = process.env.REACT_APP_LOCAL_API_KEY + "/quiz" 
console.log(BASE_USER_DATA_URL);

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
export async function saveDetailedQuizData(quizData : DetailedQuiz, userId : number) : Promise<AxiosResponse<DetailedQuiz>> {
    
    const response = await axios.post(`${BASE_USER_DATA_URL}/save-quiz-data`, quizData, {
        params : {
            userId
        }
    })

    return response;
}