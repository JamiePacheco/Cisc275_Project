import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "./UserPageProps";

export function UserPage({setSignedIn} : UserPageProps) : React.JSX.Element{

    const nav = useNavigate();

    function userLogout() {
        sessionStorage.removeItem("CURRENT_USER")
        setSignedIn(false);
        nav("/home", {replace: true})
    }

    return (
        <div className = "user-page">
            <div className = "user-page--content">
                <div className = "content--footer">
                    <button onClick = {() => userLogout()}> Logout </button>
                </div>
            </div>
        </div>
    )
}