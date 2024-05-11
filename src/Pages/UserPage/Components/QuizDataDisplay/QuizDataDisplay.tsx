import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "../../../../Interfaces/User/User";
import { QuizDataCard } from "../QuizDataCard/QuizDataCard";
import "./QuizDataDisplay.css"

export function QuizDataDisplay({quizData, userData, loading} : {quizData : DetailedQuiz[], userData : User , loading: boolean}) : React.JSX.Element {

    const mappedQuizData = quizData.map((quiz) => {
        return (
            <QuizDataCard detailedQuizData={quiz} userData={userData} key = {quiz.detailedQuizId} />
        )})

    return (
        <div className="quiz-data-display">
            
            <div className = "quiz-data-display--header">
                <h4 className = "quiz-data--heading"> Quiz History </h4>
                <div> 
                    <button> Sort </button>
                </div>
            </div>
            

            { !loading && 
                mappedQuizData
            }
        </div>
    )
}