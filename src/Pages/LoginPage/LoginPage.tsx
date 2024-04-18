import React, { FormEvent, useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function LoginPage() : React.JSX.Element {
    
    const [email, setEmail] = useState<string>("");
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    function validateLogin() {
        const accountJSONString = localStorage.getItem("USER_ACCOUNT")
        if (accountJSONString != null) {
            
            sessionStorage.setItem("CURRENT_USER", accountJSONString);
        }
    }


    function signIn(event : FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true)
            return;
        } else {
           
            nav("/home");
        }   
    }


    return (
        <div className = "sign-up-page">
            <div className = "sign-up-page--content">
                <h1 className = "sign-up-page--form-header">Let's Make An Account! </h1>
                <div className = "sign-up-page--form-container"> 
                    <div className = "form-container--content">
                        <Form noValidate validated = {validated} onSubmit={signIn}>
                            <Container fluid>
                                <Row className="form--row-padding">
                                    <Form.Label className = "form--label-heading"> Email </Form.Label>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                            required
                                            className = "form--font" 
                                            placeholder="example@email.com" 
                                            value = {email}
                                            size = "lg"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                console.log(e)
                                            }}
                                            pattern="[A-Za-z0-9.]+@[a-zA-Z]+[.]+[a-zA-Z]+"
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                Email Required
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="form--row-padding">
                                    <Form.Label className = "form--label-heading"> Password </Form.Label>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                            required
                                            className = "form--font" 
                                            placeholder="password123 (Please Don't Use This...)" 
                                            value = {password}
                                            size = "lg"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                console.log(e)
                                            }}
                                            pattern=".{7,}"
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                Invalid Password
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className = "form--button-padding justify-content-center">
                                    <button
                                    type="submit"
                                    className = "form--submit-button"
                                    > Create Account </button>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}