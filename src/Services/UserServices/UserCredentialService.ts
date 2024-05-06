import axios, { AxiosResponse } from "axios"
import { User } from "../../Interfaces/User/User"

//api url 
const BASE_USER_URL = process.env.REACT_APP_API_KEY + "/user";

console.log(BASE_USER_URL);

export function createUser(user : User) : Promise<AxiosResponse<User>>{
    console.log(BASE_USER_URL)
    return axios.post(`${BASE_USER_URL}/save-user`, user);
}

export function authenticateUser(email : string, password: string) : Promise<AxiosResponse<User>> {
    const response = axios.get(`${BASE_USER_URL}/authenticate-user`, {
        params : {
            email,
            password
        }
    })
    return response;
}
