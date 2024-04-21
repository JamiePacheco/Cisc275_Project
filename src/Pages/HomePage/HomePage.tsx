/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState} from "react"
import { HomePageHeader } from "./Components/HomePageHeader/HomePageHeader"
import "./HomePage.css"
import { HomePageSignUpWidget } from "./Components/HomePageSignUpWidget/HomePageSignUpWidget"
import { HomePageQuizSelectionWidget } from "./Components/HomePageQuizSelectionWidget/HomePageQuizSelectionWidget"
import { User } from "../../Interfaces/User"

export function HomePage({user} : {
    user : User | null
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

                <HomePageQuizSelectionWidget></HomePageQuizSelectionWidget>
            </div>
        </div>
    )
}