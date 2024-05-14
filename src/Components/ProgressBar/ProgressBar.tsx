import "./CareerProgressBear.css"

import { ProgressBar } from "react-bootstrap";
import careerBearSleeping from "../../assets/career-bear/sleeping-career-bear.png"
import internRunning from "../../assets/career-intern/blankfitzrunning.gif"

import careerBearIntern from "../../assets/career-bear/career-bear-2-neutral.png"
import { useEffect, useState } from "react";

export type Bear = "career" | "intern" 

export function CareerProgressBear({curr, total, mode} : {curr : number, total : number, mode : Bear}) : JSX.Element {
    
    const [bearImage, setBearImage] = useState<string>()

    const [progressConstant, setProgressConstant] = useState(0);

    const [integerProgression, setIntegerProgression] = useState(0);

    useEffect(() => {
        setProgressConstant((curr / total) * 100);
        setIntegerProgression(curr === 1 ? 0 : curr);
    }, [curr, total])

    useEffect(() => {
        
        if (mode === "career") {
            setBearImage(careerBearSleeping);
        } else if (mode === "intern") {
            setBearImage(careerBearIntern);
        }

    }, [mode, bearImage])
    
    console.log(integerProgression); 
    console.log((progressConstant)* 45)
    return (
        <div className = {`progress-bar-bootstrap ${mode === "career" ? "progress-bar-career" : "progress-bar-intern"}`}>
            <ProgressBar
                now={progressConstant}  
                color="#6c4c41"
                className = "custom-progress-bar"
            />
            {
                mode === "career" && <img 
                src = {careerBearSleeping} 
                alt = "" 
                className = "progress-bear-image"  
                style = {{left : `${(integerProgression/2) * 45}px`}} />
            }

            {
                mode === "intern" && <img 
                src = {internRunning} 
                alt = "" 
                className = "progress-intern-image" 
                style = {{left : `${integerProgression * progressConstant}px`}}
            />}

      </div>
    )
}