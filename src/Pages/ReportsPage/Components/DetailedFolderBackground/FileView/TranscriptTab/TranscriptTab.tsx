import { useMemo, useState } from "react";
import { BearInteraction } from "../../../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction";

import "./TranscriptTab.css"
import { User } from "../../../../../../Interfaces/User/User";

export function TranscriptTab({interactions} : {interactions : BearInteraction[]}) : React.JSX.Element {
    
    const [user, setUser] = useState<User>()

    useMemo(() => {
        const curUser = sessionStorage.getItem("CURRENT_USER");
        if (curUser) {
            setUser(JSON.parse(curUser));
        }
    }, [])


    const mappedInteractions = interactions.map((interaction, i) => {
        return (<div className = "interaction">
            <p> <strong>Career Bear:</strong>  {interaction.careerBearPrompt.prompt} </p>
            <p> <strong>{user ? user.firstName : "User"}:</strong> {interaction.userResponse.response} </p>
        </div>)
    })

    return (
        <div className = "transcript">
            <h3 className="transcript-header"> Recorded With Career Bear </h3>

            {mappedInteractions}

            <p> [END] </p>
        </div>
    )
}