import axios, { AxiosResponse } from "axios";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "../../Interfaces/User/User";
import { UserQuizData } from "../../Interfaces/User/UserQuizData";
import { ApiCallResponse } from "../../Interfaces/Responses/ApiCallResponse";
import { BasicQuiz } from "../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";

// const BASE_USER_DATA_URL = process.env.REACT_APP_API_KEY + "/quiz" 
const BASE_USER_DATA_URL = "http://localhost:8080/api/v1/quiz"

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
export async function saveDetailedQuizData(quizData : DetailedQuiz, user : User) : Promise<AxiosResponse<ApiCallResponse<DetailedQuiz>>> {
    
    const response = await axios.post(`${BASE_USER_DATA_URL}/save-quiz-data`, quizData, {
        params : {
            "userId" : user.id
        }
    });

    return response;
}

export async function saveBasicQuestionData(user : User, basicQuizData : BasicQuiz) : Promise<AxiosResponse<ApiCallResponse<BasicQuiz>>> {
    
    const response = await axios.post(`${BASE_USER_DATA_URL}/save-basic-quiz-data`, basicQuizData, {
        params : {
            "userId" : user.id
        }
    });

    return response;
}

export async function getDetailedQuizData(user : User) : Promise<AxiosResponse<ApiCallResponse<DetailedQuiz[]>>> {

    const response = await axios.get(`${BASE_USER_DATA_URL}/get-quiz-data`, {
        params : {
            "userId" : user.id
        }
    });

    return response;
}

export async function getBasicQuizData(user : User) : Promise<AxiosResponse<ApiCallResponse<BasicQuiz[]>>> {

    const response = await axios.get(`${BASE_USER_DATA_URL}/get-basic-quiz-data`, {
        params : {
            "userId" : user.id
        }
    })

    return response;
}

