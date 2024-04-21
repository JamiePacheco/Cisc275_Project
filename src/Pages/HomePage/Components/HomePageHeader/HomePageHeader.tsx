import { useEffect, useState } from "react"
import "./HomePageHeader.css"
import { HomePageProps } from "./HomePageProps"

export function HomePageHeader({user} : HomePageProps) : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log(`User ${JSON.stringify(user)}`)
        if (user !== null) {
            setSignedIn(true);
        } else {
            setSignedIn(false)
        }
    }, [user])

    return (
        <div className = "home-page-header">
            <h1 className = "home-page-header--heading">
                { 
                    signedIn ? `Discover your future, ${user?.firstName}` :  "Discover your future."
                }
                 
            </h1>
            <h3 className = "home-page-header--sub-heading"> no one is gonna do it for you </h3>
        </div>
    )
}