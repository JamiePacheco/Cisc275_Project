import React, {useMemo, useState } from "react";
import './FileView.css'
import { CareerSuggestion } from "../../../../../Interfaces/Results/CareerSuggestion";
import { getDayInLifeForJob, getRequirementsForJob, getSalaryInformation } from "../../../../../Services/DetailedQuiz/CareerBear";

import internSearching from "../../../../../assets/career-intern/fitzsearching.gif"
import internConfused from "../../../../../assets/career-intern/confused-intern.png"
import careerBearSleeping from "../../../../../assets/career-bear/sleeping-career-bear.png"

import { CareerMetric } from "./CareerMetric";

interface JobRequirments {
    overview : string,
    requirements : string[]
}

interface JobStatistics {
    salary : {
        high: string,
        average : string,
        low : string,
    }, 
    employmentRate : string,
    nationalJobs : string 
}


export function FileView({data} : {data : CareerSuggestion}) : React.JSX.Element {

    const [dayInLifeDetails, setDayInLifeDetails] = useState("");
    const [requirements, setRequirements] = useState<JobRequirments>();
    const [salaryInformation, setSalaryInformation] = useState<JobStatistics>();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);


    useMemo(() => {
        if(!loaded){
            getDayInLifeForJob(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setDayInLifeDetails(message);
                    }
                }
            }).catch((e) => {
                setError(true);
                setLoaded(true)
            })

            getRequirementsForJob(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setRequirements(JSON.parse(message));
                        console.log(message);
                    }
                }
            }).catch((e) => {
                setError(true);
                setLoaded(true)
            })

            getSalaryInformation(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setSalaryInformation(JSON.parse(message));
                        console.log( message);
                        setTimeout(() => {
                            setLoaded(true);
                        }, 3000)
                    }
                }
            }).catch((e) => {
                setLoaded(true)
                setError(true)
            })
        }
    }, [data, loaded])


    if (!loaded) {
        return (
            <div>
                <img className="file-image" src={internSearching} alt = "fitz is searching"/>
                <h4> Fitz is gathering your data </h4>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <img className="file-image" src={internConfused} alt = "confused intern"/>
                <h4> fitz cannot find your career data... </h4>
            </div>
        )
    }


    return (
        <div className = "career-tab-containers">
            <div className = "tab-content">

                <h2 className = "tab-content-heading">  {data.career} </h2>

                <div className="tab-main-content">
                    <div className = "career-section">
                        <h5 className = "career-section-header">
                            {data.career} Overview
                        </h5>
                        <p className = "career-section-body">
                            {data.careerDescription}
                        </p>
                    </div>
                    
                    <div className = "career-section">
                        <h5 className = "career-section-header">
                            Career Bear's Career Logic
                        </h5>
                        <p className = "career-section-body">
                            {data.careerLogic}
                        </p>
                    </div>

                    <div className = "career-section">
                        <h5 className = "career-section-header">
                            What a day might look like
                        </h5>
                        <p className = "career-section-body">
                            {dayInLifeDetails}
                        </p>
                    </div>

                    <div className = "career-section">
                        <h5 className = "career-section-header">
                            Job Requrements
                        </h5>

                        <div>
                            <p className = "career-section-body"> {requirements?.overview} </p>

                            <ul className = "career-requirements-list"> 
                                <li className = "listHeader"> Some general criteria for this career: </li>
                                {requirements && requirements?.requirements.map((req) => {
                                    return <li> {req} </li>
                                })}
                            </ul>
                        </div>
                        
                    </div>

                    <div className="career-section image-container">

                        <img className = "sleeping-bear" src = {careerBearSleeping} alt = "sleeping bear"/>
                    </div>
                </div>
                
                {
                    salaryInformation && (
                        <div className = "tab-finacial-content">
                            <h4 className="career-section-header"> Career Bear's Career Statistics </h4>    
                            
                            <div className = "finacial-content--metrics">
                                    <CareerMetric name="Employment Rate" metric={ salaryInformation?.employmentRate} />
                                    <CareerMetric name="Upper Bound Salary" metric={ salaryInformation?.salary.high} />
                                    <CareerMetric name="Average Salary" metric={ salaryInformation?.salary.average} />
                                    <CareerMetric name="Lower Bound Salary" metric={ salaryInformation?.salary.low} />
                                    <CareerMetric name="Avaliable Jobs (U.S.A)" metric={ salaryInformation?.nationalJobs} />
                            </div>

                            <p className = "career-bear-disclosure"> *Note, we are pretty sure that Career Bear made these numbers up </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}