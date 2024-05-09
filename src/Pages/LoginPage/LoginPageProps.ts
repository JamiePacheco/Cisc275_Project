import { User } from "../../Interfaces/User/User";

export interface LoginPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}