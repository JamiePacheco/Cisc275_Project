import { useNavigate } from "react-router-dom";
import { User } from "../../../Interfaces/User/User";
import { Dispatch, SetStateAction, useState } from "react";

export function ProfileTab({user, setUser} : {user : User | null, setUser : Dispatch<SetStateAction<User | null>>}) : React.JSX.Element {

    const nav = useNavigate();
    const [extended, setExtended] = useState<boolean>(false);

    //button to log out of the application
    function userLogout() {
        sessionStorage.removeItem("CURRENT_USER");
        setUser(null);
        setExtended(false);
        nav("/home")
    }

    return (
        <div className = "profile-container--profile-tab"> 
            {
              user && 
                <div className = {`profile-tab--content ${extended ? "tab-extended" : "tab-closed"}`} onMouseLeave={() => setExtended(false)}>
                    <span className = "profile-tab-header" onClick={() => setExtended(true)}> 
                        <i className="bi bi-person-circle"></i>
                        <span>{`${user?.firstName} ${user?.lastName}`} </span>
                    </span>

                    {
                        extended
                        &&
                        (
                            <div className = "profile-tab-items">
                                <span className = "profile-tab-item" onClick={() => {nav("/user-page")}} >
                                    <i className="bi bi-folder-fill"></i>
                                    <span> Quiz Data </span>
                                </span>

                                <span className = "profile-tab-item" onClick={() => userLogout()}>
                                    <i className="bi bi-door-closed-fill"></i>
                                    <span> Sign Out </span>
                                </span>
                            </div>
                        )


                    }
                </div>
            }
            {
              !user && 
                <span className = "profile-tab--header"
                onClick={() => {
                  console.log("click!")
                  nav("/login")
                }}> Login </span>
            }
            </div>
    )
}