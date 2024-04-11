import { Col, Container, Form, Row} from "react-bootstrap"
import "./SignUpPage.css"

export function SignUpPage() : React.JSX.Element {
    return (
        <div className = "sign-up-page">
            <div className = "sign-up-page--content">
                <h1 className = "sign-up-page--form-header">Let's Make An Account! </h1>
                <div className = "sign-up-page--form-container"> 
                    <div className = "form-container--content">
                        <Form>
                            <Container fluid>
                                <Row className="form--row-padding">
                                    <Form.Label > Name </Form.Label>
                                    <Col>
                                        <Form.Group>
                                            <Form.FloatingLabel label = "First Name">
                                                <Form.Control placeholder="First Name">
                                                </Form.Control>
                                            </Form.FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.FloatingLabel label = "Last Name">
                                                <Form.Control placeholder="Last Name">
                                                </Form.Control>
                                            </Form.FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="form--row-padding">
                                    <Form.Group>
                                        <Form.Label>Gender</Form.Label> 
                                        <Form.Select className = "Form--Selection">
                                            <option value = "Male"> Male </option>
                                            <option value = "Female"> Female </option>
                                            <option value = "N/A"> Prefer Not To Say</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}