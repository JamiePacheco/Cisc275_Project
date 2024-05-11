import { useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import "./QuizDataCard.css"
import { BearInteraction } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction"
import { User } from "../../../../Interfaces/User/User"

export function QuizDataCard({detailedQuizData, userData} : {detailedQuizData : DetailedQuiz, userData : User}) : React.JSX.Element {
    
    const [detailedQuiz] = useState(detailedQuizData)

    // const quizChatLogs = detailedQuiz.bearInteractions !== undefined ? detailedQuiz.bearInteractions.map((interaction : BearInteraction) => {
        
    //     return (<div className = "quiz--message-logs">
    //         <p> <span className = "bold-span">Career Bear: </span> {interaction.careerBearPrompt.prompt} </p>
    //         <p> <span className = "bold-span">{userData.firstName}: </span> {interaction.userResponse.response} </p>
    //     </div>)
    // }) : "Logs Not Avaliable";

    console.log(JSON.stringify(detailedQuizData, null, 4))

    function formatListingItems(array : string[]) {

        const firstNELements = array.slice(0, -1).join(", ");
        console.log(firstNELements)
        const lastEmement = array.slice(-1)

        return firstNELements + ", and " + lastEmement;
    }

    const traits = detailedQuizData.quizResults?.personalityTraits.map((pTrait) => pTrait.trait);

    const careers = detailedQuizData.quizResults?.careerSuggestions.map((career) => career.career);

    return (
        <div className = "quiz-data-card">
            <div className = "quiz-data-card--header">
                <h5> Date Taken: {detailedQuiz.dateTaken} </h5>
                <h5> Interactions:  {detailedQuiz.bearInteractions && detailedQuiz.bearInteractions.length} </h5>
                <h5> PersonalityTraits: {traits && formatListingItems(traits)} </h5>
                <h5> Careers: {careers && formatListingItems(careers)} </h5>
            </div>
        </div>
    )
}