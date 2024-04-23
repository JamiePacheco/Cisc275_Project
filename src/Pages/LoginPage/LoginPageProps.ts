import { User } from "../../Interfaces/User";

export interface LoginPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}