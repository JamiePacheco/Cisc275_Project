import "./CareerBearPrompt.css"
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";
import { useMemo, useState } from "react";

export function CareerBearPrompt({message} : {message : string}) : React.JSX.Element { 

    const [displayText, setDisplayText] = useState("");
    const typedMessage = useTypeWriter(message);


    useMemo(() => {
        setDisplayText(typedMessage)
    }, [typedMessage])

    return (
        <div className = "career-bear-prompt">
            <span>
                {displayText}
            </span>
        </div>
    )
}