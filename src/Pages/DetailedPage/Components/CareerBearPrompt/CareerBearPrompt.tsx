import "./CareerBearPrompt.css"
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";
import { useEffect, useMemo, useState } from "react";

import { CareerBearModel } from "../CareerBearModel/CareerBearModel";
import { CareerBearPromptProps } from "./CareerBearPromptProps";

export function CareerBearPrompt(
    {message, bearClickHandler, bearEmotion, talkingSpeed} : CareerBearPromptProps 
) : React.JSX.Element { 

    const [displayText, setDisplayText] = useState("");
    const [talkSpeed, setTalkSpeed] = useState(30);


    useEffect(() => {
        setTalkSpeed(talkingSpeed);
    }, [talkingSpeed])

    useMemo(() => {
        setDisplayText(message)
    }, [message])

    const typedMessage = useTypeWriter(displayText, talkSpeed);

    return (
        <div className = "career-bear-prompt">
            <div className = "career-bear-prompt--content">
                
                {typedMessage !== "" && 
                   <div className = "content--text-box">
                        <span className = "content--text">
                            {typedMessage}
                        </span>
                    </div>
                }

                <CareerBearModel 
                    onBearClick = {bearClickHandler}
                    bearEmotion = {bearEmotion}    
                />
            </div>
        </div>
    )
}