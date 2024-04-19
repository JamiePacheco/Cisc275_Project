/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState} from "react"
import { HomePageHeader } from "./Components/HomePageHeader/HomePageHeader"
import "./HomePage.css"
import { HomePageSignUpWidget } from "./Components/HomePageSignUpWidget/HomePageSignUpWidget"
import { HomePageQuizSelectionWidget } from "./Components/HomePageQuizSelectionWidget/HomePageQuizSelectionWidget"
import { useNavigate, useParams } from "react-router-dom"
import { User } from "../../Interfaces/User"

export function HomePage() : React.JSX.Element {

    const [user, setUser] = useState<User | undefined>(undefined);

    const [signedIn, setSignedIn] = useState<boolean>(false);

    useMemo(
        () => {
            const userString = sessionStorage.getItem("CURRENT_USER");
            setUser(userString === null ? userString : JSON.parse(userString));
            setSignedIn(userString !== null);
        },
        []
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