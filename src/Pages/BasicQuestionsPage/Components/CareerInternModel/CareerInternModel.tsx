import fitzSlushi from "../../../../assets/career-intern/fitzwithslushie.png"
import fitzsHappy from "../../../../assets/career-intern/fitzemotehappy.png"

import { useEffect, useMemo, useState } from "react";
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";

import "./CareerInternModel.css"
import { startingScript } from "./CareerInternScript";

export type fitzEmotion = "happy" | "sad" | "mad" | "thirsty"

export const emotionImageMapping : Record<fitzEmotion, string> = {
    "happy" : fitzsHappy,
    "thirsty" : fitzSlushi,
    "mad" : fitzsHappy,
    "sad" : fitzsHappy
};

export function CareerInternModel({emotion, started} : {emotion : fitzEmotion, started : boolean}) : React.JSX.Element {

    //image of fitz william being used
    const [fitzFit, setFitzFit] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    
    const [talking, setTalking] = useState(true);

   
    




    useEffect(() => {
        setFitzFit(emotionImageMapping[emotion])
    }, [emotion])

    const displayMessage = useTypeWriter(message);
    return (
        <div className = "fitzModelContainer">
            
            <div className="intern-content--text-box">
                {talking && <span className = "content--text"> {displayMessage} </span>}
            </div>
            <div>
                <img className = "the-intern" alt="HELP ME THEY TOOK MY BODY!!!!!" src = {fitzFit} />
            </div>
        </div>
    )

}