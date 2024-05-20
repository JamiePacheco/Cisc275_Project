import { useEffect, useMemo, useState } from "react";
import { User } from "../../../../Interfaces/User/User";
import { MetricDisplay } from "../MetricDisplay/MetricDisplay";
import { QuizDataDisplay } from "../QuizDataDisplay/QuizDataDisplay";

import "./UserPageWidgetsView.css"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { getBasicQuizData, getDetailedQuizData } from "../../../../Services/UserServices/UserDataService";
import { AxiosError, AxiosResponse } from "axios";
import { ApiCallResponse } from "../../../../Interfaces/Responses/ApiCallResponse";

import internSearching from "../../../../assets/career-intern/fitzsearching.gif"
import fitzWilliam from "../../../../assets/career-intern/confused-intern.png"
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";

export function UserPageWidgetsView({user} : {user : User}) : React.JSX.Element {

    const [detailedQuizData, setDetailedQuizData] = useState<DetailedQuiz[]>()

    const [basicQuizData, setBasicQuizData] = useState<BasicQuiz[]>();

    const [dataError, setDataError] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    //used to scroll to the top when landing on page
    //easiest solution to workaround being unable to access browser history
    //cursed hash router...
    const [onLanding, setOnLanding] = useState(true);

    useEffect(() => {
        if (onLanding) {
        window.scrollTo(0, 0)
        setOnLanding(false);
        }
    }, [onLanding])


    useMemo(() => {
        getDetailedQuizData(user).then((res : AxiosResponse<ApiCallResponse<DetailedQuiz[]>>) => {
            setDetailedQuizData(res.data.responseContent);
        }).catch((e : AxiosError<ApiCallResponse<DetailedQuiz[]>>) => {
            setDataError(true)
            console.log(e)
        })
        getBasicQuizData(user).then((res : AxiosResponse<ApiCallResponse<BasicQuiz[]>>) => {
            setBasicQuizData(res.data.responseContent);

        }).catch((e : AxiosError<ApiCallResponse<BasicQuiz[]>>) => {
            setDataError(true)
            console.log(e)
        })

        setTimeout(() => {
            setLoading(false)
        }, 5000)

    }, [user])

    function getTimeBasedGreeting() {

        const time = new Date().toLocaleTimeString()
        
        const hour = Number(time.split(":")[0]);

        const timeOfDay = time.split(" ")[1];

        console.log(hour)
        console.log(timeOfDay)

        if (hour < 12 && hour >= 5 && timeOfDay === "AM") {
            return "Good Morning"
        }

        if ((hour <= 12 && hour > 6 && timeOfDay === "PM") || (hour >= 12 && hour < 6 && timeOfDay === "AM") ) {
            return "Good Evening"
        }

        if (hour <= 6 && timeOfDay === "PM") {
            return "Good Afternoon"
        }

        return "Welcome Back"

    }

    if (loading) {
        return (
            <div>
                <img src={internSearching} alt = "fitz is searching"/>
                <h4> Fitz is gathering your data </h4>
            </div>
        )
    }

    return (
        <div className = "user-page-widget-view">

            <h1 className = "user-page--greeting"> {`${getTimeBasedGreeting()}, ${user.firstName}`}</h1>

            {
                !dataError &&
                <div className = "user-page--widget-view-content">
                    <MetricDisplay detailedQuizData={detailedQuizData} basicQuizData={basicQuizData}></MetricDisplay>
                    {(detailedQuizData !== undefined && basicQuizData !== undefined) && <QuizDataDisplay quizData={detailedQuizData} basicData={basicQuizData} userData={user} loading = {loading}></QuizDataDisplay>}
                </div> 
            }

            {
                dataError && 
                <div className = "user-page--widget-view-content">
                    <img src={fitzWilliam} alt = "fitz-willy" className = "user-page--fitz"/>
                    <h1> Fitz could not find your data...  </h1>
                </div>
                
            }

           
        </div>
    )
}