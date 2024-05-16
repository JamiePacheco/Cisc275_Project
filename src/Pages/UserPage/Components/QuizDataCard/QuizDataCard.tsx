import { useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import "./QuizDataCard.css"
import { User } from "../../../../Interfaces/User/User"
import { useNavigate } from "react-router-dom"
import { ReportsResults } from "../../../../Interfaces/Reports/ReportsResults"

export function QuizDataCard({detailedQuizData, userData} : {detailedQuizData : DetailedQuiz, userData : User}) : React.JSX.Element {
    
    const [detailedQuiz] = useState(detailedQuizData)

    const nav = useNavigate();

    // const quizChatLogs = detailedQuiz.bearInteractions !== undefined ? detailedQuiz.bearInteractions.map((interaction : BearInteraction) => {
        
    //     return (<div className = "quiz--message-logs">
    //         <p> <span className = "bold-span">Career Bear: </span> {interaction.careerBearPrompt.prompt} </p>
    //         <p> <span className = "bold-span">{userData.firstName}: </span> {interaction.userResponse.response} </p>
    //     </div>)
    // }) : "Logs Not Avaliable";

    function loadReportData() {

        const reportData : ReportsResults = {
            quizResultsType: "detailed",
            data: detailedQuiz
        }

        sessionStorage.setItem("QUIZ_DATA", JSON.stringify(reportData));
        nav("/reports")
    }

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
        <div className = "quiz-data-card" onClick={()=> loadReportData()}>
            <div className = "quiz-data-card--header">
                
            </div>

            <div className = "quiz-data-card--content">
                <h5> Date Taken: {detailedQuiz.dateTaken} </h5>
                <h6> Quiz Type: Detailed </h6>
                <h6> Interactions:  {detailedQuiz.bearInteractions && detailedQuiz.bearInteractions.length} </h6>
                <h6> PersonalityTraits: {traits && formatListingItems(traits)} </h6>
                <h6> Careers: {careers && formatListingItems(careers)} </h6>
            </div>
        </div>
    )
}