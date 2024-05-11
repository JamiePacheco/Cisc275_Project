import { useNavigate } from "react-router-dom"
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { User } from "../../Interfaces/User/User";

import lightLogo from "../../assets/logos/career-bear-logo-1-light.png"

import "./AppHeader.css"
import { ProfileTab } from "./ProfileTab/ProfileTab";

export function AppHeader({user, setUser} : {user : User | null, setUser : Dispatch<SetStateAction<User | null>>}) : React.JSX.Element {

    const nav = useNavigate()

    return (
        <header className="app-header">
          {/* <img className = "heading--logo" src={logo} alt = "Career Bear"></img> */}

          <h1 className = "app-header--heading"  onClick={() => {nav("/home")}}>
            <img className = "heading--logo" src={lightLogo} alt = "Career Bear"/>
          </h1>

          <div className = "app-header--profile-container">
            {<ProfileTab user={user} setUser = {setUser}></ProfileTab>}
          </div>
        </header>
    )
}