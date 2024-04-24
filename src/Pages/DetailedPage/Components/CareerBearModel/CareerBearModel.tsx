import { useState } from "react";

import neutralBear from "../../../../assets/career-bear/neutral_career_bear.png";

import "./CareerBearModel.css";



export type BearEmotion = "neutral" | "sad" | "happy"


export function CareerBearModel() : React.JSX.Element {

    const [emotion, setEmotion] = useState<BearEmotion>("neutral")

    return (<div className = "career-bear-model">
        <img alt = "career-bear" src = {neutralBear}/>
    </div>)
}