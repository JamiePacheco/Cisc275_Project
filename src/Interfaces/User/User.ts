//TODO finish implementing user interface properties

export interface User {
    userId: number;
    firstName : string;
    lastName : string;
    age: number;
    birthday: string;
    email: string;
    password: string;
    //have they taken a detailed quiz yet?
    newAccount: boolean;
}