import axios, { AxiosResponse } from "axios"
import { User } from "../../Interfaces/User/User"

//api url 
// const BASE_USER_URL = process.env.REACT_APP_API_KEY + "/user";
const BASE_USER_URL = "http://localhost:8080/api/v1/user"


console.log(BASE_USER_URL);

export async function createUser(user : User) : Promise<AxiosResponse<User>>{
    console.log(BASE_USER_URL)
    return await axios.post(`${BASE_USER_URL}/save-user`, user);
}

export async function authenticateUser(email : string, password: string) : Promise<AxiosResponse<User>> {
    const response = await axios.get(`${BASE_USER_URL}/authenticate-user`, {
        params : {
            email,
            password
        }
    })
    return response;
}
