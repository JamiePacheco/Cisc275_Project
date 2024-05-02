import React from "react"
import "./HomePageQuizSelectionWidget.css"
import { useNavigate } from "react-router-dom"  

export function HomePageQuizSelectionWidget() : JSX.Element {

    const nav = useNavigate();

    return (
        <div className = "home-page-quiz-selection-widget">  
            <h1> Let's Get Started!</h1>
            <h2 className = "selection-widget--sub-header"> Choose the quiz that suits your career needs </h2>
            <div className = "quiz-selection-widget--text-content">
                <div className = "quiz-selection-widget--choice-card">
                    <h2 className = "choice-card--header">In a rush?</h2>
                    <button className = "choice-card--button" onClick={() => nav('/short-quiz')}>Short Quiz</button>
                    <p className = "quiz-selection-description-text">In this short quiz, you will have a brief test administered by CareerBear's intern where they'll suggest a career based off of your selected answers!</p>
                </div> 
                <div className = "quiz-selection-widget--choice-card">
                    <h2 className = "choice-card--header"> Chat with CareerBear!</h2>
                    <button className = "choice-card--button" onClick={() => nav('/detailed-quiz')}>Long Quiz </button>
                    <p className = "quiz-selection-description-text">In the detailed quiz, you will have a one-on-one consultation with CareerBear himself! He's bear-y excited to get to know you.</p>
                </div> 
            </div>
        </div>
    )
}