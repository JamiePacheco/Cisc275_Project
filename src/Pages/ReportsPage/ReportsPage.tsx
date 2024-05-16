import React, { useEffect, useState } from 'react'
import { FolderBackground } from './Components/DetailedFolderBackground/Folder-Background/FolderBackground'
import { BasicFolderBackground } from './Components/BasicFolderBackground/Basic-FolderBackground/Basic-FolderBackground'

import "./ReportsPage.css"
import { useNavigate } from 'react-router-dom'
import { ReportsResults, quizType } from '../../Interfaces/Reports/ReportsResults'
import { isBasicQuiz, isDetailedQuiz } from '../../Services/ReportResults/ReportResultsService'
import { DataSetOne } from './TestingData/TestingData'
import { DetailedQuiz } from '../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz'
import { BasicQuiz } from '../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface'
import { BasicDataSetOne } from './TestingData/BasicTestingData'

export function ReportsPage() : JSX.Element{

    const [quizData, setQuizData] = useState<ReportsResults | null>(null);

    //changes whether reports page uses mock data or data from localhost so set to true or false depending on what you want to test out
    const [debugging] = useState(false);

    const nav = useNavigate();

    //gets the stored quiz data locally and parses it as a string
    useEffect(() => {
        //gets the stored string

        if (!debugging){
            const quizSessionData = sessionStorage.getItem("QUIZ_DATA");

            //checks if it exists first
            if(quizSessionData){
                //sets the ReportsResults.ts object to the quizdata state

                const parsedQuizObject : ReportsResults = JSON.parse(quizSessionData);

                setQuizData(parsedQuizObject);
            } else {
                nav("/home")
            }
        } else {

            //uncommnet whatever one you want to use

            //gets the data from data set one if debugging
            const detailedData : DetailedQuiz = DataSetOne;

            //gets the data from data set one of basic questions
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const basicData : BasicQuiz = BasicDataSetOne;

            //change to whatever type is beign tested
            const testQuizType : quizType = "detailed"

            setQuizData({
                quizResultsType : testQuizType,
                data: detailedData
            });
        }
    }, [debugging, nav])

    

    
    return(
        <div className="reports-page">

            {
                (quizData?.data !== undefined && isDetailedQuiz(quizData?.data, quizData.quizResultsType)) && (<FolderBackground quizData={quizData.data}></FolderBackground>)

            }

            {

                // This is for when the quiz data is from basic qustions, uncomment when working with it and when the component exists.

                (quizData?.data !== undefined && isBasicQuiz(quizData?.data, quizData.quizResultsType)) && (<BasicFolderBackground quizData={quizData.data}></BasicFolderBackground>)

            } 
        </div>
    )
};
