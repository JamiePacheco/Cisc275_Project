import { useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import "./QuizDataCard.css"
import { BearInteraction } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction"
import { User } from "../../../../Interfaces/User/User"

export function QuizDataCard({detailedQuizData, userData} : {detailedQuizData : DetailedQuiz, userData : User}) : React.JSX.Element {
    
    const [detailedQuiz] = useState(detailedQuizData)

    const quizChatLogs = detailedQuiz.bearInteractions !== undefined ? detailedQuiz.bearInteractions.map((interaction : BearInteraction) => {
        
        return (<div className = "quiz--message-logs">
            <p> <span style = {{fontWeight : 400}}>Career Bear: </span> {interaction.careerBearPrompt.prompt} </p>
            <p> <span style = {{fontWeight : 400}}>{userData.firstName}: </span> {interaction.userResponse.response} </p>
        </div>)
    }) : "Logs Not Avaliable";

    return (
        <div className = "quiz-data-card">
            <div className = "quiz-data-card--content">
                <h5> {detailedQuiz.dateTaken} </h5>
                {quizChatLogs}
            </div>
        </div>
    )
}