import { useMemo, useState } from "react"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"
import { MetricCard } from "./MetricCard/MetricCard"
import "./MetricDisplay.css"
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface"

export function MetricDisplay(
    {detailedQuizData, basicQuizData}
    : 
    {
        detailedQuizData : DetailedQuiz[] | undefined,
        basicQuizData : BasicQuiz[] | undefined
    }
) : React.JSX.Element {
    
    const [quizAmount, setQuizAmount] = useState<number>(0);
    const [bearTouched, setBearTouched] = useState<number>(0);
    const [detailedQuizzesTaken, setdetailedQuizzesTaken] = useState<number>(0);
    const [basicQuizzesTaken, setBasicQuizzesTaken] = useState<number>(0);

    useMemo(() => {
        if (detailedQuizData && basicQuizData && detailedQuizData.length > 0 && basicQuizData.length > 0) {
            setQuizAmount(detailedQuizData.length + basicQuizData.length);
            setBearTouched(detailedQuizData.map((quiz)=>quiz.bearClicked).reduce((prev, curr)=>{
                    return prev+curr
                },10)
            );
            setBasicQuizzesTaken(basicQuizData.length);
            setdetailedQuizzesTaken(detailedQuizData.length)
        }    
    }, [basicQuizData, detailedQuizData])

    return (
        <div className = "metric-display">

            <div className = "quiz-data-display--header">
                <h4 className = "quiz-data--heading"> Quiz Metrics </h4>
                <div> 
                    {/* <button> Refresh </button> */}
                </div>
            </div>
            <div className = "metrics-data-card--content">
                <MetricCard metricTitle="Quizzes Taken" metric={quizAmount}/>
                <MetricCard metricTitle="Career Bear Pokes" metric={bearTouched} />
                <MetricCard metricTitle="Basic Quizzes Taken" metric={basicQuizzesTaken}/>
                <MetricCard metricTitle="Detailed Quizzes Taken" metric={detailedQuizzesTaken}/>
            </div>

        </div>
    )
}