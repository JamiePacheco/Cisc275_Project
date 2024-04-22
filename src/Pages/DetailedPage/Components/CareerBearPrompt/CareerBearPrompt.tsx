import { Form } from "react-bootstrap";

import "./CareerBearPrompt.css"
import { useTypeWriter } from "../../../../Hooks/useTypeWriter";

export function CareerBearPrompt({message} : {message : string}) : React.JSX.Element { 

    const displayText = useTypeWriter(message);

    return (
        <div className = "career-bear-prompt">
            <span>
                {displayText}
            </span>
        </div>
    )
}