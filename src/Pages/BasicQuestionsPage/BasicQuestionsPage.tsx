import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { GeneralQuestions } from "./Components/GeneralQuestionWidget/GeneralQuestionWidget";
import { ReviewWidget } from "./ReviewAnswersWidget/ReviewAnswersWidget";
import { generateBasicQuiz} from './Components/GeneralQuestionWidget/QuestionFunctions';

import clipboard from "../../assets/images/clipboard-clip.png"
import { LoadingScreen } from '../../Components/LoadingScreen/LoadingScreen';

import background from "../../assets/images/background.jpg"

export function BasicQuestionsPage(): JSX.Element {
    const [isVisible, setIsVisible] = useState(true);
    const [reviewIsVisible, setReviewIsVisible] = useState(false);
    // const [quiz] = useState(() => quizObjects());
    //added new method of generating quiz that contains question list is presented order
    const [quiz, setQuiz] = useState(() => generateBasicQuiz()) 
    const [answers, setAnswers] = useState<string[]>(() => Array(quiz.questionList.length).fill(""));
    const [startingIndex, setStartingIndex] = useState<number>(quiz.currentQuestion - 1)
    const [loading, setLoading] = useState<boolean>(false);


    //TODO implement fitz speaking to the side of the clipboard (one day...)
    //State largely to control the speech and image of fitz willy
    //will use this value in future feature
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [startedQuiz, setStartedQuiz] = useState<boolean>(false);
    // const [fitzEmotion, setFitzEmotion] = useState<fitzEmotion>("happy")


    if (loading) {
        return <LoadingScreen></LoadingScreen>
    }


    //TODO fix sizing to have background fit more nicely
    console.log("question index: " + startingIndex)
    console.log("started quiz: " + startedQuiz)
    return (
        <div className='BasicQuestionsPage'
            style={
                {
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundRepeat: "repeat"
                }
            } 
        >
            <div className = "BasicQuestionsPage-Content">
                <div className = "BasicQuestionPage-clipboard-container">
                    <img src = {clipboard} alt = "clip" className = "clip"/>
                    <div className = {`clip-board-container ${reviewIsVisible ? "review-clipboard" : "quiz-clipboard"}`}>
                        <div className = "quiz-display" style={{ display: isVisible ? 'block' : 'none' }}>
                            <GeneralQuestions 
                                isVisible={isVisible}
                                setIsVisible={setIsVisible}
                                setReviewIsVisible={setReviewIsVisible}
                                quiz={quiz}
                                displayOrder={quiz.displayOrder} 
                                answers={answers}
                                setAnswers={setAnswers}
                                startingIndex={startingIndex}
                                setQuiz={setQuiz}
                                setStarted = {setStartedQuiz}
                            />
                        </div>
                        <div style={{ display: reviewIsVisible ? 'block' : 'none' }}>
                            <ReviewWidget 
                                quizData={quiz}
                                setReviewIsVisible={setReviewIsVisible}
                                setIsVisible={setIsVisible}
                                questions={quiz.questionList}
                                displayOrder={quiz.displayOrder} 
                                answers={answers}
                                setStartingIndex = {setStartingIndex}
                                setLoading={setLoading}
                            />
                        </div>
                    </div>
                </div>
                {/* <CareerInternModel emotion={fitzEmotion} started = {startedQuiz}/> */}
            </div>
        </div>
    );
}
