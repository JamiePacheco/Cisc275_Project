import { useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import { User } from "../../Interfaces/User";
import "./AppHeader.css"

export function AppHeader({user} : {user : User | null}) : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false);
    const nav = useNavigate()

    useMemo(() => {
      if (user !== null) {
        setSignedIn(true);
      }
    }, [user])


    useMemo(() => {
      setSignedIn(user !== null);
    }, [user])

    return (
        <header className="app-header">
          <h1 className = "app-header--heading"  onClick={() => {nav("/")}}> Career Bear </h1>

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