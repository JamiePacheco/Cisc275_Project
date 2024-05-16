import React, { useState } from "react";
import './CareerSuggestion.css'
import { CareerFieldSuggestion } from '../../../../../Interfaces/Results/CareerFieldSuggestion'
import { Col, Container, Row } from "react-bootstrap";
import SleepingBearSticker from '../../../CareerBasicSticker/CareerBasicSticker'

export function CareerSuggestionView({data} : {data : CareerFieldSuggestion}) : React.JSX.Element {

    const [jobDetails, setJobDetails] = useState(""); 

    function getJobDetails(job : string) {
        setJobDetails(`${job} is pretty cool!`);
    }

    return (
        <div className = 'career-tab-containers'>
            <h3> {data.careerField} </h3>

            <Container>
                <div>
                    <Row>
                        <Col>

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
                            
                            <div className="career-bear-sticker-container">
                                <SleepingBearSticker/>
                            </div>

                        </Col>

                        {
                            jobDetails !== "" && <span> {jobDetails} </span>
                        }

                    </Row>
                </div>
            </Container>


        </div>
    )
}