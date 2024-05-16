import React from "react";
import './CareerSuggestion.css'
import { CareerFieldSuggestion } from '../../../../../Interfaces/Results/CareerFieldSuggestion'
import { Col, Container, Row } from "react-bootstrap";

export function CareerSuggestionView({data, getJobDetails} : {data : CareerFieldSuggestion, getJobDetails : (job : string) => void}) : React.JSX.Element {

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

                        </Col>



                    </Row>
                </div>
            </Container>


        </div>
    )
}