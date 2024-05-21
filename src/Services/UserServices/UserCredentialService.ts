import axios, { AxiosResponse } from "axios"
import { User } from "../../Interfaces/User/User"
import { ApiCallResponse } from "../../Interfaces/Responses/ApiCallResponse";

//api url 
const BASE_USER_URL = process.env.REACT_APP_API_KEY + "/user";
// const BASE_USER_URL = "http://localhost:8080/api/v1/user"


export function createUser(user : User) : Promise<AxiosResponse<ApiCallResponse<User>>>{
    console.log(BASE_USER_URL)
    return axios.post(`${BASE_USER_URL}/save-user`, user);
}

export function authenticateUser(email : string, password: string) : Promise<AxiosResponse<ApiCallResponse<User>>> {
    const response = axios.get(`${BASE_USER_URL}/authenticate-user`, {
        params : {
            email,
            password
        }
    })
    return response;
}
