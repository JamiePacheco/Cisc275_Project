import React, { useEffect, useState } from "react";
import './FileView.css'
import { CareerSuggestion } from "../../../../../Interfaces/Results/CareerSuggestion";
import { getDayInLifeForJob, getRequirementsForJob, getSalaryInformation } from "../../../../../Services/DetailedQuiz/CareerBear";

interface JobRequirments {
    overview : string,
    requirements : string[]
}

interface SalaryData {
    high: string,
    average : string,
    low : string,
}

export function FileView({data} : {data : CareerSuggestion}) : React.JSX.Element {

    const [dayInLifeDetails, setDayInLifeDetails] = useState("");
    const [requirements, setRequirements] = useState<JobRequirments>();
    const [salaryInformation, setSalaryInformation] = useState<SalaryData>();


    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        if(!loaded){
            setLoaded(true);
            getDayInLifeForJob(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setDayInLifeDetails(message);
                    }
                }
            })

            getRequirementsForJob(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setRequirements(JSON.parse(message));
                        console.log(message);
                    }
                }
            })

            getSalaryInformation(data.career).then((res) => {
                if (res) {
                    const message = res.choices[0].message.content;

                    if (message && message !== undefined) {
                        setSalaryInformation(JSON.parse(message));
                        console.log("Salary" + message);
                    }
                }
            })
        }
    }, [data, loaded])


    console.log(JSON.stringify(salaryInformation, null, 4))
    return (
        <div className = 'career-tab-containers'>
            <h1> {data.career} </h1>

            <p> {data.careerDescription} </p>

            <p> {data.careerLogic} </p>

            <p> {dayInLifeDetails} </p>

            <p> {requirements?.overview} </p>

            <ul>
                {requirements && requirements?.requirements.map((req) => {
                    return (<li>{req}</li>)
                })}
            </ul>

            <p> Salary Information </p>
            
            {   salaryInformation &&
            
                <div>
                    <ul>
                    <li>  High: {salaryInformation["high"]} </li>
                    <li>  Mean: {salaryInformation.average} </li>
                    <li>  Low: {salaryInformation.low} </li>
                    </ul>
                    <h1> {salaryInformation.average} </h1>
                </div>
                 
            }
           


        </div>
    )
}