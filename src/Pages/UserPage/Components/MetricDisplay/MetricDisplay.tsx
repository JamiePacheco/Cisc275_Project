import { useEffect, useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import { MetricCard } from "./MetricCard/MetricCard"
import "./MetricDisplay.css"

export function MetricDisplay({detailedQuizData} : {detailedQuizData : DetailedQuiz[] | undefined}) : React.JSX.Element {
    
    const [quizAmount, setQuizAmount] = useState<number>(0);
    const [bearTouched, setBearTouched] = useState<number>(0);

    useEffect(() => {

        if (detailedQuizData) {
            setQuizAmount(detailedQuizData.length);
            setBearTouched(detailedQuizData.map((quiz)=>quiz.bearClicked).reduce((prev, curr)=>prev+curr));
        }
    }, [detailedQuizData])

    return (
        <div className = "metric-display">

            <div className = "quiz-data-display--header">
                <h4 className = "quiz-data--heading"> Quiz Metrics </h4>
                <div> 
                    <button> Refresh </button>
                </div>
            </div>
            <div className = "metrics-data-card--content">
                <MetricCard metricTitle="Quizzes Taken" metric={quizAmount}/>
                <MetricCard metricTitle="Career Bear Pokes" metric={bearTouched} />
            </div>

        </div>
    )
}