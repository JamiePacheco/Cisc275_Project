import axios, { AxiosResponse } from "axios"
import { User } from "../../Interfaces/User/User"

const BASE_USER_URL = process.env.api_key;

export function createUser(user : User) : Promise<AxiosResponse<User>>{
    return axios.post(`${BASE_USER_URL}/save-user`, user);
}

