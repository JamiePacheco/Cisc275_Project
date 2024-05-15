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

                        <div>
                            <h5>Suggested Jobs</h5>
                            <p>{data.careerFieldJobs}</p>
                        </div>

                        </Col>

                        <Col>
                        </Col>

                    </Row>
                </div>
            </Container>


        </div>
    )
}