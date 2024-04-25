import "./CareerBearPrompt.css"
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";
import { useMemo, useState } from "react";

import { CareerBearModel } from "../CareerBearModel/CareerBearModel";
import { CareerBearPromptProps } from "./CareerBearPromptProps";

export function CareerBearPrompt(
    {message, bearClickHandler} : CareerBearPromptProps 
) : React.JSX.Element { 

    const [displayText, setDisplayText] = useState("");

    useMemo(() => {
        setDisplayText(message)
    }, [message])

    const typedMessage = useTypeWriter(displayText);

    return (
        <div className = "career-bear-prompt">
            <div className = "career-bear-prompt--content">
                <div className = "content--text-box">
                    {typedMessage !== "" && <span className = "content--text">
                        {typedMessage}
                    </span>}
                </div>
                <CareerBearModel onBearClick = {bearClickHandler}/>
            </div>
        </div>
    )
}