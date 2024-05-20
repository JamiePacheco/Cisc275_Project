import { useEffect, useState } from "react"
import "./HomePageHeader.css"
import { HomePageProps } from "./HomePageProps"

import darkLogo from "../../../../assets/logos/career-bear-logo-2-dark.png"

export function HomePageHeader({user} : HomePageProps) : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log(`User ${JSON.stringify(user)}`)
        console.log(signedIn)
        if (user !== null) {
            setSignedIn(true);
        } else {
            setSignedIn(false)
        }
    }, [signedIn, user])

    return (
        <div className = "home-page-header">
            <h1 className = "home-page-header--heading">
                {/* { 
                    signedIn ? `Discover your future, ${user?.firstName}` :  "Discover your future."
                }
                  */}
                <div>
                    <img src = {darkLogo} alt = "career bear"/>
                    <h4> he's beary helpful! </h4>
                </div>
            </h1>
            {/* <h3 className = "home-page-header--sub-heading"> no one is gonna do it for you </h3> */}
        </div>
    )
}