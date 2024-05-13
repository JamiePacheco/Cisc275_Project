import { useState } from "react"
import "./QuizDataCard.css"
import { User } from "../../../../Interfaces/User/User"
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface"

export function BasicQuizDataCard({basicQuizData, userData} : {basicQuizData : BasicQuiz, userData : User}) : React.JSX.Element {
    
    const [detailedQuiz] = useState(basicQuizData)

    // const quizChatLogs = detailedQuiz.bearInteractions !== undefined ? detailedQuiz.bearInteractions.map((interaction : BearInteraction) => {
        
    //     return (<div className = "quiz--message-logs">
    //         <p> <span className = "bold-span">Career Bear: </span> {interaction.careerBearPrompt.prompt} </p>
    //         <p> <span className = "bold-span">{userData.firstName}: </span> {interaction.userResponse.response} </p>
    //     </div>)
    // }) : "Logs Not Avaliable";

    function formatListingItems(array : string[]) {

        const firstNELements = array.slice(0, -1).join(", ");
        console.log(firstNELements)
        const lastEmement = array.slice(-1)

        return firstNELements + ", and " + lastEmement;
    }

    const traits = basicQuizData.basicQuizResults?.personalityTraits.map((p) => p.trait);

    const careers = basicQuizData.basicQuizResults?.careerFieldSuggestions.map((f) => f.careerField);

    return (
        <div className = "quiz-data-card">
            <div className = "quiz-data-card--header">
                
            </div>

            <div className = "quiz-data-card--content">
                <h5> Date Taken: {detailedQuiz.dateTaken.split("T")[0]} </h5>
                <h6> Quiz Type: Basic </h6>
                <h6> Personality Traits: {traits && formatListingItems(traits)} </h6>
                <h6> Careers: {careers && formatListingItems(careers)} </h6>
                <h6> Did you like bears?: "{basicQuizData.questionList[basicQuizData.questionList.length-1].answer}"" </h6>
            </div>
        </div>
    )
}