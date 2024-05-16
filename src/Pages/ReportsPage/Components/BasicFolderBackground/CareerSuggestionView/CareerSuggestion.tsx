import React, { useState } from "react";
import './CareerSuggestion.css'
import { CareerFieldSuggestion } from '../../../../../Interfaces/Results/CareerFieldSuggestion'
import { Col, Container, Row } from "react-bootstrap";
import SleepingBearSticker from '../../../CareerBasicSticker/CareerBasicSticker'
import { getJobsDetailsFromSuggestedJob } from "../../../../../Services/DetailedQuiz/CareerBear";
import { useTypeWriter } from "../../../../../Hooks/useTypeWriter";

export function CareerSuggestionView({data} : {data : CareerFieldSuggestion}) : React.JSX.Element {

    const [jobDetails, setJobDetails] = useState("if you want to know more about a particular job, feel free to click the job above"); 

    function getJobDetails(job : string) {

        setJobDetails("(Career Bear is thinking...)")
        getJobsDetailsFromSuggestedJob(job).then((response) => {
            if (response !== null) {
                const message = response?.choices[0].message.content;

                if (message !== null && message !== undefined) {
                    setJobDetails(message)
                } else {

                }
            }
        })
    }

    const careerBearMessage = useTypeWriter(jobDetails);

    return (
        <div className = 'career-tab-containers'>
            <h3> {data.careerField} </h3>

            <Container>
                <div>
                    <Row>
                        <Col>

                        <div className = "careertab-paragraphstyle">
                            <h5>Introduction</h5>
                            <p>
                            Congratulations on completing the CareerQuiz! Inside, you'll uncover one of three career fields I've paw-sonalized just for you. I hope you have a bear-y good time exploring, and may you find something that truly makes you roar with delight!
                            </p>
                        </div>

                        <div className = "careertab-paragraphstyle">
                            <h5>Description</h5>
                            <p>{data.careerFieldDescription}</p>
                        </div>

                        <div className = "careertab-paragraphstyle">
                            <h5>How These Were Selected</h5>
                            <p>
                                {data.careerFieldLogic}
                            </p>
                        </div>

                        </Col>

                        <Col>
                            <div className = "careertab-paragraphstyle">
                            <h5>Suggested Jobs</h5>
                            <p>Some examples of jobs that this field has are:</p>
                                <ul>
                                {data.careerFieldJobs.map((job, index) => (
                                    <li key={index} className = "career-tab--job" onClick={() => {getJobDetails(job)}}>{job}</li>
                                ))}
                                </ul>                            
                            </div>
                            <div className = 'careertab-paragraphstyle'>
                                <h5>Learn More</h5>
                            </div>
                    


                            <div className="career-bear-sticker-container">
                                <div className = 'text-for-careerbear'>
                                    {careerBearMessage}
                                </div>


                                
                                <SleepingBearSticker/>
                            </div>

                        </Col>



                    </Row>
                </div>
            </Container>


        </div>
    )
}