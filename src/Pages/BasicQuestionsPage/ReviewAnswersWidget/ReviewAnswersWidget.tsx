import "./ReviewAnswersWidget.css";
import { Question } from "../../../Interfaces/BasicQuestionInterfaces/QuestionInterface";
import { evaluateUserCareerFieldFromBasicQuiz } from "../../../Services/DetailedQuiz/CareerBear";
import { BasicQuiz } from "../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";

interface ReviewWidgetProps {
    quizData : BasicQuiz,
    setReviewIsVisible: (isVisible: boolean) => void;
    setIsVisible:  React.Dispatch<React.SetStateAction<boolean>>
    questions: Question[];
    displayOrder: number[];
    answers: string[];
    setStartingIndex : React.Dispatch<React.SetStateAction<number>>
}

export function ReviewWidget({quizData, setReviewIsVisible, setIsVisible, questions, displayOrder, answers, setStartingIndex }: ReviewWidgetProps): JSX.Element {
    console.log("Answers in ReviewWidget:", answers); //debug test
    console.log("Display Order in ReviewWidget:", displayOrder); //debug test


    function submitBasicQuiz() {
        evaluateUserCareerFieldFromBasicQuiz(quizData).then((value) => {
            if (value === undefined) {
                return;
            }
            const data = value.choices[0].message.content;
            if (data !== null) {
                const jsonData = JSON.parse(data);
                console.log(JSON.stringify(jsonData, null, 4))
            }
        })
    }

    return (
        <div>
            <div className="review-header"><h2>🐻 Review Answers 🐻</h2></div>
            <div className="review-container">
                {displayOrder.map((index, position) => {
                    const question = questions[position]; //get the question based on position
                    const answer = answers[position]; //get the answer based on the original question index
                    return (
                        <div key={index} className="question-answer-container">
                        <h3 className="question-name">{position + 1}. {question.name}</h3>
                        <div className="answer-text-default">
                            <strong>You Chose:</strong> <span className="answer-text">{answer}</span>
                        </div>
                        <button onClick={() => {
                            setStartingIndex(displayOrder[index - 1] - 1);
                            setReviewIsVisible(false);
                            setIsVisible(true);
                        }} 
                        > 
                            Change Answer 
                        </button>
                    </div>
                );
                })}

                <div>
                    <button className = "submit-test-button" onClick={() => submitBasicQuiz()}> 
                        Submit Test
                    </button>
                </div>
            </div>
        </div>
    );
}