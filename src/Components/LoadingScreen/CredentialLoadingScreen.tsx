import { useEffect, useState } from "react"
import "./LoadingScreen.css"

import internRunning from "../../assets/career-intern/blankfitzrunning.gif"
import { getRandomElement } from "../../Services/MiscServices";

const funny_intern_quips = ["Fitz is hurrying to sign you in...", "Fitz is trying his best to get you signed in...", "Fitz wants to quit and become a florist..."]

//Loading screen for signing and logging in
export function CredentialLoadingScreen() : React.JSX.Element {

    //holds the presented messaged
    const [loadingMessage, setLoadingMessage] = useState(getRandomElement(funny_intern_quips));

    //used to generate a new messaged every 3 seconds for the lolz
    useEffect(() => {
        const intervalid = setInterval(() => {
            setLoadingMessage(getRandomElement(funny_intern_quips))
        }, 3000)

        return () => clearInterval(intervalid);
    })


    return (<div className = "loading-screen-body">
    <div className = "loading-screen--image">
        <img src = {internRunning} alt = "intern running" />
    </div>

    <div className = "loading-screen--message-container">
        <h1> {loadingMessage} </h1>
    </div>
</div>)
}