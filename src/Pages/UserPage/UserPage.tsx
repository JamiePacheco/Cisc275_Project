import React from "react";
import { useNavigate } from "react-router-dom";

export function UserPage() : React.JSX.Element{

    const nav = useNavigate();

    function userLogout() {
        sessionStorage.setItem("CURRENT_USER", "")
        nav("/home")
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