import fitzSlushi from "../../../../assets/career-intern/fitzwithslushie.png"
import fitzsHappy from "../../../../assets/career-intern/fitzemotehappy.png"

import { useEffect, useMemo, useState } from "react";
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";

import "./CareerInternModel.css"
import { startingScript } from "./CareerInternScript";
import { useStackState } from "rooks";

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
    const [previousMeditation, setPreviousMeditation] = useState<string[]>()
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([...startingScript]);


    const [inProgress, setInProgress] = useState<boolean>(false);

    const [internYapConstant, setInternYapConstant] = useState(5000);


    useEffect(() => {
        console.log("In Progress: " + inProgress)
        console.log("Started: " + started);
        if (started && !inProgress) {
            setInProgress(true);
        }
    }, [inProgress, started])


    useMemo(() => {
        const interval = setInterval(() => {
            console.log("setting interval")
            const messagePopped = messages[0];
            if (messagePopped) {
                setMessage(messagePopped);
                setMessages(messages.slice(1))
                console.log("Message popped: " + messagePopped)
            }   

        }, internYapConstant)

        return () => clearInterval(interval)
    }
    ,[internYapConstant, messages])

    useEffect(() => {
        setFitzFit(emotionImageMapping[emotion])
    }, [emotion])

    console.log(messages)

    const displayMessage = useTypeWriter(message);
    return (
        <div className = "fitzModelContainer">
            
            <div className="content--text-box">
                <span className = "content--text"> {displayMessage} </span>
            </div>
            <div>
                <img className = "the-intern" alt="HELP ME THEY TOOK MY BODY!!!!!" src = {fitzFit} />
            </div>
        </div>
    )

}