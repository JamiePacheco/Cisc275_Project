import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "./UserPageProps";
import { UserPageWidgetsView } from "./Components/UserPageWidgets/UserPageWidgets";
import { User } from "../../Interfaces/User/User";

export function UserPage({setUser} : UserPageProps) : React.JSX.Element{

    const [userData, setUserData] = useState<User | undefined>(undefined);

    const nav = useNavigate();
    
    useEffect(() => {
        const loggedUser = sessionStorage.getItem("CURRENT_USER");
        if (loggedUser !== null && loggedUser !== undefined) {
            setUserData(JSON.parse(loggedUser));
        } else {
            nav("/home")
        }
    }, [userData])

    function userLogout() {
        sessionStorage.removeItem("CURRENT_USER");
        setUser(null);
        nav("/home", {replace: true});
    }

    return (
        <div className = "user-page">
            <div className = "user-page--content">
                <div className = "content--header">

                    {userData !== undefined && <UserPageWidgetsView user={userData}/> }
                
                    <button onClick = {() => userLogout()}> Logout </button>
                </div>



            </div>
        </div>
    )
}