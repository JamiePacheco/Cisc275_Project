import "./CareerProgressBear.css"

import { ProgressBar } from "react-bootstrap";
import careerBearSleeping from "../../assets/career-bear/sleeping-career-bear.png"
import internRunning from "../../assets/career-intern/blankfitzrunning.gif"
import internSearching from "../../assets/career-intern/fitzsearching.gif"

import careerBearIntern from "../../assets/career-bear/career-bear-2-neutral.png"
import {useEffect, useState } from "react";

export type Bear = "career" | "intern" 

export function CareerProgressBear({curr, total, mode} : {curr : number, total : number, mode : Bear}) : JSX.Element {
    
    const [bearImage, setBearImage] = useState<string>()

    const [progressConstant, setProgressConstant] = useState(0);

    const [filled, setFilled] = useState(false);


    useEffect(() => {
        setProgressConstant((curr / total) * 100);
    }, [curr, total])

    useEffect(() => {
        if (curr === total && total > 0) {
            setFilled(true);
        }
    }, [curr, total])

    useEffect(() => {
        
        if (mode === "career") {
            setBearImage(careerBearSleeping);
        } else if (mode === "intern") {
            setBearImage(careerBearIntern);
        }

    }, [mode, bearImage])
    
    console.log(curr); 
    console.log(total)
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
                style = {{left :  `${ curr > 1 && curr <= total ? 100 * (curr-1)/total: curr <=1? 0: 100}px`}} />
            }

            {
                mode === "intern" && <img 
                src = {filled ? internSearching : internRunning} 
                alt = "" 
                className = {`progress-intern-image ${filled ? "progress-intern-searching-image" : ""}`}  
                style = {{left : `${ (curr > 1 && curr <= total) ? 200 * (curr): 0}px`}}
            />}

      </div>
    )   
}