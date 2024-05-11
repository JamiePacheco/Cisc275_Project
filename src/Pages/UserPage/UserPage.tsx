import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "./UserPageProps";
import { UserPageWidgetsView } from "./Components/UserPageWidgets/UserPageWidgets";
import { User } from "../../Interfaces/User/User";
import { ErrorScreen } from "../../Components/ErrorScreen/ErrorScreen";

import fitzWilliam from "../../assets/career-intern/confused-intern.png"

import "./UserPage.css"

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
    }, [nav])




    if (userData === undefined) {
        return <div> <ErrorScreen></ErrorScreen> </div>
    }

    return (
        <div className = "user-page">
            <div className = "user-page--content">
                {userData !== undefined && <UserPageWidgetsView user={userData}/> }

                <img src={fitzWilliam} alt = "fitz-willy" className = "user-page--fitz"/>
            </div>
        </div>
    )
}