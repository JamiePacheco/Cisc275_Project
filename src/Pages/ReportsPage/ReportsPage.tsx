import React, { useEffect, useState } from 'react'
import { FolderBackground } from './Components/Folder-Background/FolderBackground'
import { DetailedQuiz } from '../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz'

export function ReportsPage() : JSX.Element{

    const [quizData, setQuizData] = useState<DetailedQuiz | null>(null);

    useEffect(() => {
        const quizSessionData = sessionStorage.getItem("DETAILED_QUIZ_DATA");
        if(quizSessionData){
            setQuizData(JSON.parse(quizSessionData));
        }
    }, [])

    return(
        <div className="reports-page">
            <FolderBackground quizData={quizData}></FolderBackground>
        </div>
    )
};
