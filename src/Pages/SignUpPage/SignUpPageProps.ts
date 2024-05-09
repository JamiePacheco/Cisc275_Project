import { User } from "../../Interfaces/User/User";

export interface SignUpPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}