import "./ReviewAnswersWidget.css";
import { Question } from "../../../Interfaces/BasicQuestionInterfaces/QuestionInterface";

interface ReviewWidgetProps {
    setReviewIsVisible: (isVisible: boolean) => void;
    setIsVisible: (isVisible: boolean) => void;
    questions: Question[];
    displayOrder: number[];
    answers: string[];
}

export function ReviewWidget({ setReviewIsVisible, setIsVisible, questions, displayOrder, answers }: ReviewWidgetProps): JSX.Element {
    console.log("Answers in ReviewWidget:", answers); //debug test
    console.log("Display Order in ReviewWidget:", displayOrder); //debug test

    return (
        <div>
            <div className="review-header"><h2>Review Answers</h2></div>
            <div className="review-container">
                {displayOrder.map((index, position) => {
                    const question = questions[position]; //get the question based on position
                    const answer = answers[displayOrder[position]]; //get the answer based on the original question index
                    return (
                        <div key={index}>
                            <h3>{position + 1}. {question.name}</h3>
                            <p>Answer: {answer}</p>
                        </div>
                    );
                })}
                <button className="change-answers-button" onClick={() => {
                    setReviewIsVisible(false);
                    setIsVisible(true);
                }}>Change Answers</button>
            </div>
        </div>
    );
}