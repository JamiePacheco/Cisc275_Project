import { useEffect, useState } from "react";

import neutralBear from "../../../../assets/career-bear/neutral_career_bear.png";
import sadBear from "../../../../assets/career-bear/sad-career-bear-2.png"
import sleepingBear from "../../../../assets/career-bear/sleeping-career-bear.png"

import "./CareerBearModel.css";
import { CareerBearModelProps } from "./CareerBearModelProps";
import { BearEmotion } from "../../DetailedPage";

const careerBearImages : Record<BearEmotion, string> = {
    "neutral" : neutralBear,
    "sad" : sadBear,
    "happy" : "",
    "sleeping" : sleepingBear
}

export function CareerBearModel({onBearClick, bearEmotion} : CareerBearModelProps) : React.JSX.Element {

    const [bearImage, setBearImage] = useState<string>("");

    useEffect(() => {
        setBearImage(careerBearImages[bearEmotion]);
    }, [bearEmotion])


    return (<div className = "career-bear-model">
        <img alt = "career-bear" src = {bearImage} onClick={() => onBearClick()}/>
    </div>)
}