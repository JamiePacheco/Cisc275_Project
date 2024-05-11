import BearChairRight from "../../assets/career-bear/bear-in-chair_right.png"
import BearChairLeft from "../../assets/career-bear/bear-in-chair_left.jpg"
import { useEffect, useState } from "react"

import careerBearSleeping from "../../assets/career-bear/career-bear-sleeping.gif"

import "./LoadingScreen.css"

// import { useTypeWriter } from "../../Hooks/useTypeWriter"

const images = [BearChairLeft, BearChairRight]

const funny_loading_quips = [
    "career bear is processing user data...",
    "career bear is snacking on some grapes...",
    "career bear is thinking about what's for dinner...",
    "career bear is getting sleepy..."
] 

export function LoadingScreen() : React.JSX.Element {
    
    const [currentImage] = useState<number>(0);

    const [loadingMessage, setLoadingMessage] = useState<string>("")

    // useEffect(() => {
    //     const intervalid = setInterval(() => {
    //         setCurrentImage(prev => (prev + 1) % images.length)
    //     }, 1000)

    //     return () => clearInterval(intervalid);
    // }, [])

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