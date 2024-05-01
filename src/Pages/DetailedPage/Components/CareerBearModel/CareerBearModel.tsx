import { useEffect, useState } from "react";

import neutralBear from "../../../../assets/career-bear/neutral_career_bear.png";
import sadBear from "../../../../assets/career-bear/sad-career-bear-2.png"

import "./CareerBearModel.css";
import { CareerBearModelProps } from "./CareerBearModelProps";
import { BearEmotion } from "../../DetailedPage";

const careerBearImages : Record<BearEmotion, string> = {
    "neutral" : neutralBear,
    "sad" : sadBear,
    "happy" : ""
}

export function CareerBearModel({onBearClick, bearEmotion} : CareerBearModelProps) : React.JSX.Element {

    const [bearImage, setBearImage] = useState<string>("");

    useEffect(() => {
        setBearImage(careerBearImages[bearEmotion]);
    }, [bearEmotion])


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (<div className = "career-bear-model">
        <img alt = "career-bear" src = {bearImage} onClick={() => onBearClick()}/>
    </div>)
}