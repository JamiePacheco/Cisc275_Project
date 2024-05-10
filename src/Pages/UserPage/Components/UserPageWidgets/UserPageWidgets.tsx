import { useEffect, useMemo, useState } from "react";
import { User } from "../../../../Interfaces/User/User";
import { MetricDisplay } from "../MetricDisplay/MetricDisplay";
import { QuizDataDisplay } from "../QuizDataDisplay/QuizDataDisplay";

import "./UserPageWidgetsView.css"
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { getDetailedQuizData } from "../../../../Services/UserServices/UserDataService";
import { AxiosResponse } from "axios";

export function UserPageWidgetsView({user} : {user : User}) : React.JSX.Element {

    const [quizData, setQuizData] = useState<DetailedQuiz[]>()

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getDetailedQuizData(user).then((res : AxiosResponse<DetailedQuiz[]>) => {
            setQuizData(res.data);
            setLoading(false)
        })
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

        if ((hour <= 12 && hour > 6 && timeOfDay === "PM") || (hour >= 1 && hour < 6 && timeOfDay === "AM") ) {
            return "Good Evening"
        }

        if (hour <= 6 && timeOfDay === "PM") {
            return "Good Afternoon"
        }

    }

    return (
        <div className = "user-page-widget-view">

            <h1 className = "user-page--greeting"> {`${getTimeBasedGreeting()}, ${user.firstName}`}</h1>

            <MetricDisplay detailedQuizData={quizData} ></MetricDisplay>

            {quizData !== undefined && <QuizDataDisplay quizData={quizData} userData={user} loading = {loading}></QuizDataDisplay>}
        </div>
    )
}