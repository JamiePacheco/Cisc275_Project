import { useState} from "react"
import { HomePageHeader } from "./Components/HomePageHeader/HomePageHeader"
import "./HomePage.css"
import { HomePageSignUpWidget } from "./Components/HomePageSignUpWidget/HomePageSignUpWidget"
import { HomePageQuizSelectionWidget } from "./Components/HomePageQuizSelectionWidget/HomePageQuizSelectionWidget"

export function HomePage() : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false)

    return (
        <div className="homepage">
            <div className = "homepage--content">
                <HomePageHeader loggedIn={signedIn}></HomePageHeader>

                {!signedIn && <HomePageSignUpWidget></HomePageSignUpWidget>}

                <HomePageQuizSelectionWidget></HomePageQuizSelectionWidget>
            </div>
        </div>
    )
}