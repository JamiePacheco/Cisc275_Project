/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState} from "react"
import { HomePageHeader } from "./Components/HomePageHeader/HomePageHeader"
import "./HomePage.css"
import { HomePageSignUpWidget } from "./Components/HomePageSignUpWidget/HomePageSignUpWidget"
import { HomePageQuizSelectionWidget } from "./Components/HomePageQuizSelectionWidget/HomePageQuizSelectionWidget"
import { useNavigate, useParams } from "react-router-dom"

export function HomePage() : React.JSX.Element {
    const [signedIn, setSignedIn] = useState<boolean>(false)

    const {id} = useParams();

    const loggedUser = useMemo(
        () => {
            localStorage.getItem("CURRENT_USER")
        },
        [signedIn]
    );

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