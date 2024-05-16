import { useEffect, useState } from "react"

import careerBearSleeping from "../../assets/career-bear/career-bear-sleeping.gif"

import "./LoadingScreen.css"
import { getRandomElement } from "../../Services/MiscServices"

// import { useTypeWriter } from "../../Hooks/useTypeWriter"

const funny_loading_quips = [
    "Career Bear is dreaming about your data...",
    "Career Bear is dreaming about lowering Fitz's pay...",
    "Career Bear is dreaming of ways to evade his taxes...",
    "Career Bear is dreaming of increasing Fitz's workload...",
    "Career Bear is running advanced bear algorithims on your data...",
    "Career Bear is thinking of giving himself another raise..."
] 

export function LoadingScreen() : React.JSX.Element {
    
    const [loadingMessage, setLoadingMessage] = useState<string>("")
 
    useEffect(() => {
        window.scrollTo(0,0); 
    })
    

    useEffect(() => {
        const intervalid = setInterval(() => {
            setLoadingMessage(getRandomElement(funny_loading_quips))
        }, 3000)

        return () => clearInterval(intervalid);
    }, [])

    useEffect(() => {
        setLoadingMessage(funny_loading_quips[Math.floor(Math.random() * funny_loading_quips.length)])
    }, [])

    return (
        <div className = "loading-screen-body">
            <div className = "loading-screen--image">
                <img src = {careerBearSleeping} alt = "bear chair" />
            </div>

            <div className = "loading-screen--message-container">
                <h1> {loadingMessage} </h1>
            </div>
        </div>
    )
}