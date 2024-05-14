import "./CareerProgressBear.css"

import { ProgressBar } from "react-bootstrap";
import careerBearSleeping from "../../assets/career-bear/sleeping-career-bear.png"

import careerBearIntern from "../../assets/career-bear/career-bear-2-neutral.png"
import { useRef, useEffect, useState, ReactElement } from "react";

export type Bear = "career" | "intern" 

export function CareerProgressBear({curr, total, mode} : {curr : number, total : number, mode : Bear}) : JSX.Element {
    
    const [bearImage, setBearImage] = useState<string>()

    const [progressConstant, setProgressConstant] = useState(0);

    const [integerProgression, setIntegerProgression] = useState(0);

    const [width, setWidth] = useState<number>(0);

    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProgressConstant((curr / total) * 100);
        setIntegerProgression(curr === 1 ? 0 : curr);
    }, [curr, total])


    useEffect( () => {
        if(element.current){
            setWidth(element.current.offsetWidth);
        }
    })

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
        <div className="progress-bar-bootstrap">
            <div ref={element} className="progress-bar--component">
                <ProgressBar ref={element} now={progressConstant} className="custom-progress-bar" color="#6c4c41"/>
            </div>
            <img src = {careerBearSleeping} alt = "" className = "progress-bear-image" style = {{left :  `${ curr > 1 && curr <= total ? width* (curr-1)/total: curr <=1? 0: width}px`}} />
      </div>
    )   
}