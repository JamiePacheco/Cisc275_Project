import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "./UserPageProps";
import { UserPageWidgetsView } from "./Components/UserPageWidgets/UserPageWidgets";
import { User } from "../../Interfaces/User/User";
import { ErrorScreen } from "../../Components/ErrorScreen/ErrorScreen";

export function UserPage({setUser} : UserPageProps) : React.JSX.Element{

    const [userData, setUserData] = useState<User | undefined>(undefined);
  
    const nav = useNavigate();
    
    //Checks the current logged user and reroutes if the user is undefined or null
    useEffect(() => {
        const loggedUser = sessionStorage.getItem("CURRENT_USER");
        if (loggedUser !== null && loggedUser !== undefined) {
            setUserData(JSON.parse(loggedUser));
        } else {
            nav("/home")
        }
    }, [])

    //button to log out of the application
    function userLogout() {
        sessionStorage.removeItem("CURRENT_USER");
        setUser(null);
        nav("/home", {replace: true});
    }


    if (userData === undefined) {
        return <div> <ErrorScreen></ErrorScreen> </div>
    }

    return (
        <div className = "user-page">
            <div className = "user-page--content">
                <div className = "content--header">

                    <h1> Hello {userData.firstName} </h1>

                    {userData !== undefined && <UserPageWidgetsView user={userData}/> }
                
                    <button onClick = {() => userLogout()}> Logout </button>
                </div>
            </div>
        </div>
    )
}