import { useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import { MetricCard } from "./MetricCard/MetricCard"
import "./MetricDisplay.css"

export function MetricDisplay({detailedQuizData} : {detailedQuizData : DetailedQuiz[] | undefined}) : React.JSX.Element {
    
    const [quizzes] = useState(detailedQuizData?.length)


    
    return (
        <div className = "metric-display">
            <MetricCard metricTitle="Quizzes Taken" metric={quizzes !== undefined ? quizzes : 0}/>
        </div>
    )
}