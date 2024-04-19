import { useNavigate } from "react-router-dom"
import "./AppHeader.css"
import { useMemo, useState } from "react";
import { User } from "../../Interfaces/User";


export function AppHeader() : React.JSX.Element {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const nav = useNavigate()

    useMemo(() => {
      const userString = sessionStorage.getItem("CURRENT_USER");
      setUser(userString === null ? userString : JSON.parse(userString));
      setSignedIn(userString !== null);
    }, [])

    return (
        <header className="app-header">
          <h1 className = "app-header--heading"  onClick={() => {nav("/")}}> Helpi </h1>

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