/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState} from "react"
import { HomePageHeader } from "./Components/HomePageHeader/HomePageHeader"
import "./HomePage.css"
import { HomePageSignUpWidget } from "./Components/HomePageSignUpWidget/HomePageSignUpWidget"
import { HomePageQuizSelectionWidget } from "./Components/HomePageQuizSelectionWidget/HomePageQuizSelectionWidget"
import { User } from "../../Interfaces/User"

import darkLogo from "../../assets/logos/career-bear-logo-2-dark.png"
import { HomePageApiKeyWidget } from "./Components/HomePageApiKeyWidget/HomePageApiKeyWidget"

export function HomePage({user, handleKeySubmit, handleKeyClear} : {
    user : User | null
    handleKeySubmit : (newKey : string) => void,
    handleKeyClear : () => void
}) : React.JSX.Element {

    const [signedIn, setSignedIn] = useState<boolean>(false);

    useMemo(
        () => {
            setSignedIn(user !== null);
        },
        [user]
    );

    return (
        <div className="homepage">
            <div className = "homepage--content">
                <HomePageHeader user={user}></HomePageHeader>

                {!signedIn && <HomePageSignUpWidget></HomePageSignUpWidget>}

                <HomePageApiKeyWidget handleKeyClear={handleKeyClear} handleKeySubmit={handleKeySubmit}/>

                <HomePageQuizSelectionWidget></HomePageQuizSelectionWidget>
            </div>
        </div>
    )
}