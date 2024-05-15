import React, { useEffect, useState } from 'react'
import { FolderBackground } from './Components/Folder-Background/FolderBackground'
import { DetailedQuiz } from '../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz'
import { useNavigate } from 'react-router-dom';

export function ReportsPage() : JSX.Element{

    const [quizData, setQuizData] = useState<DetailedQuiz | null>(null);

    const nav = useNavigate();

    useEffect(() => {
        const quizSessionData = sessionStorage.getItem("QUIZ_DATA");
        if(quizSessionData){
            setQuizData(JSON.parse(quizSessionData));
            return;
        } else {
            nav("/home")
        }
    }, [nav])

    return(
        <div className="reports-page">
            <FolderBackground quizData={quizData}></FolderBackground>
        </div>
    )
};
