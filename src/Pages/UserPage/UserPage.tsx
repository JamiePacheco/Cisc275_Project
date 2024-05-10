import React, {useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "./UserPageProps";
import { UserPageWidgetsView } from "./Components/UserPageWidgets/UserPageWidgets";
import { User } from "../../Interfaces/User/User";

import "./UserPage.css"

export function UserPage({setUser} : UserPageProps) : React.JSX.Element{

    const [userData, setUserData] = useState<User | undefined>(undefined);

    const nav = useNavigate();
    
    useMemo(() => {
        const loggedUser = sessionStorage.getItem("CURRENT_USER");
        if (loggedUser !== null && loggedUser !== undefined) {
            setUserData(JSON.parse(loggedUser));
        }
    }, [])

    function userLogout() {
        sessionStorage.removeItem("CURRENT_USER");
        setUser(null);
        nav("/home", {replace: true});
    }

    return (
        <div className = "user-page">
            <div className = "user-page--content">
                {userData !== undefined && <UserPageWidgetsView user={userData}/> }
            
                <button onClick = {() => userLogout()}> Logout </button>
            </div>
        </div>
    )
}