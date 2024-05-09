import { useNavigate } from "react-router-dom"
import { useMemo, useState } from "react";
import { User } from "../../Interfaces/User/User";

import lightLogo from "../../assets/logos/career-bear-logo-1-light.png"

import "./AppHeader.css"

export function AppHeader({user} : {user : User | null}) : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false);
    const nav = useNavigate()

    useMemo(() => {
      setSignedIn(user !== null);
    }, [user])

    return (
        <header className="app-header">
          {/* <img className = "heading--logo" src={logo} alt = "Career Bear"></img> */}

          <h1 className = "app-header--heading"  onClick={() => {nav("/")}}>
            <img className = "heading--logo" src={lightLogo} alt = "Career Bear"/>
          </h1>

          <div className = "app-header--profile-container">
            <div 
            className = "profile-container--profile-tab" 
            > 
            {
              signedIn && 
                <span 
                className = "profile-tab-header"
                onClick={() => nav("/user-page")}
                > {`${user?.firstName} ${user?.lastName}`} </span>
            }
            {
              !signedIn && 
                <span className = "profile-tab--header"
                onClick={() => {
                  console.log("click!")
                  nav("/login")
                }}> Login </span>
            }
            </div>
          </div>
        </header>
    )
}