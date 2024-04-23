import { User } from "../../Interfaces/User";

export interface SignUpPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}