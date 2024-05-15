import React from "react";
import './CareerSuggestion.css'
import { CareerFieldSuggestion } from '../../../../../Interfaces/Results/CareerFieldSuggestion'
import { Col, Container, Row } from "react-bootstrap";

export function CareerSuggestionView({data} : {data : CareerFieldSuggestion}) : React.JSX.Element {

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
                                <p>
                                {data.careerFieldJobs.slice(0, -1).join(', ') + ', and ' + data.careerFieldJobs[data.careerFieldJobs.length - 1]}</p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </Container>


        </div>
    )
}