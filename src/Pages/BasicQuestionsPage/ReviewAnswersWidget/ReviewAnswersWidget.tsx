import "./ReviewAnswersWidget.css";
import { BasicQuestion } from "../../../Interfaces/BasicQuestionInterfaces/QuestionInterface";
import { evaluateUserCareerFieldFromBasicQuiz } from "../../../Services/DetailedQuiz/CareerBear";
import { BasicQuiz } from "../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { BasicQuizResults } from "../../../Interfaces/Results/BasicQuizResults";
import { saveBasicQuestionData } from "../../../Services/UserServices/UserDataService";
import { ReportsResults } from "../../../Interfaces/Reports/ReportsResults";
import { useNavigate } from "react-router-dom";

interface ReviewWidgetProps {
    quizData : BasicQuiz,
    setReviewIsVisible: (isVisible: boolean) => void;
    setIsVisible:  React.Dispatch<React.SetStateAction<boolean>>
    questions: BasicQuestion[];
    displayOrder: number[];
    answers: string[];
    setStartingIndex : React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function ReviewWidget({quizData, setReviewIsVisible, setIsVisible, questions, displayOrder, answers, setStartingIndex, setLoading}: ReviewWidgetProps): JSX.Element {
    console.log("Answers in ReviewWidget:", answers); //debug test
    console.log("Display Order in ReviewWidget:", displayOrder); //debug test


    const nav = useNavigate()

    function submitBasicQuiz() {
        const userBasicQuizData = {...quizData}
        setLoading(true);
        evaluateUserCareerFieldFromBasicQuiz(quizData).then((value) => {
            if (value === undefined) {
                return;
            }
            const data = value.choices[0].message.content;
            if (data !== null) {
                const jsonData : BasicQuizResults = JSON.parse(data);
                userBasicQuizData.basicQuizResults = jsonData;
                
                const userData = sessionStorage.getItem("CURRENT_USER");
                if (userData !== null) {
                    const parsedUserData = JSON.parse(userData)
                    saveBasicQuestionData(parsedUserData, userBasicQuizData).then((res) => {
                        console.log(JSON.stringify(userBasicQuizData, null, 4 ))
                    }).catch((err) => {
                        console.log(err)
                    })
                }

                const quizData : ReportsResults = {
                    quizResultsType: "basic",
                    data: userBasicQuizData
                };

                
                sessionStorage.setItem("QUIZ_DATA", JSON.stringify(quizData))
                setLoading(false);
                nav("/reports")
            }
        })
    }

    return (
        <div>
            <div className="review-container">
                <h2 className = "review-header"> Assessment Overview </h2>
                <div className="review-content">
                    {displayOrder.map((index, position) => {
                        const question = questions[position]; //get the question based on position
                        const answer = answers[position]; //get the answer based on the original question index
                        return (
                            <div key={index} className="question-answer-container">

                                <button 
                                    className = "question-change-action"
                                    onClick={() => {
                                    setStartingIndex(index - 1);
                                    setReviewIsVisible(false);
                                    setIsVisible(true);
                                }} 
                                > 
                                    Q{position + 1} 
                                </button>
                                
                                <div>
                                    <h5 className="question-name"><strong>Q. </strong>{question.name}</h5>
                                    <h5><strong>A. </strong>{answer}</h5>
                                </div>
                            </div>
                    );
                    })}
                </div>
                <div className = "actions">
                    <button className = "submit-test-button" onClick={() => submitBasicQuiz()}> 
                        Submit Test
                    </button>

                    <button 
                        className = "change-answers-button"
                        onClick={() => {
                            setStartingIndex(0);
                            setReviewIsVisible(false);
                            setIsVisible(true);
                        }}     
                    >
                        Go To Start
                    </button>
                </div>
            </div>
        </div>
    );
}