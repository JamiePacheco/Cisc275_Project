import { User } from "../../Interfaces/User";

export interface UserPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}