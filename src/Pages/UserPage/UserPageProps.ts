import { User } from "../../Interfaces/User/User";

export interface UserPageProps {
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}