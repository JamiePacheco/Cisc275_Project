import BearChairRight from "../../assets/career-bear/bear-in-chair_right.png"
import BearChairLeft from "../../assets/career-bear/bear-in-chair_left.jpg"
import { useEffect, useState } from "react"
import { useTypeWriter } from "../../Hooks/useTypeWriter"

const images = [BearChairLeft, BearChairRight]

const funny_loading_quips = [
    "'career bear is processing user data...'",
    "'career bear is snacking on some grapes...'",
    "'career bear is thinking about what's for dinner...'",
    "'career bear is getting sleepy...'"
]

export function LoadingScreen() : React.JSX.Element {
    
    const [currentImage, setCurrentImage] = useState<number>(0);

    const [loadingMessage, setLoadingMessage] = useState<number>(0)

    const message = useTypeWriter(funny_loading_quips[loadingMessage])

    useEffect(() => {
        const intervalid = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 1000)

        return () => clearInterval(intervalid);
    }, [])

    useEffect(() => {
        const intervalid = setInterval(() => {
            setLoadingMessage(prev => (prev + 1) % funny_loading_quips.length)
        }, 5000)

        return () => clearInterval(intervalid);
    }, [])

    return (
        <div className = "loading-screen-body">
            <div className = "loading-screen--image">
                <img src = {images[currentImage]} alt = "bear chair" />
                <h1> {message} </h1>
            </div>
        </div>
    )
}