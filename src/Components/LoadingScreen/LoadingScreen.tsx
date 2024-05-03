import BearChairRight from "../../assets/career-bear/bear-in-chair_right.png"
import BearChairLeft from "../../assets/career-bear/bear-in-chair_left.jpg"
import { useEffect, useState } from "react"

const images = [BearChairLeft, BearChairRight]

export function LoadingScreen({message} : {message : string}) : React.JSX.Element {
    
    const [currentImage, setCurrentImage] = useState<number>(0);

    useEffect(() => {
        const intervalid = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 1000)

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