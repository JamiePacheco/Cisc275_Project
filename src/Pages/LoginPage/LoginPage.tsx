import React, { FormEvent, useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/User";

export function LoginPage() : React.JSX.Element {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState(""); 

    const [emailMessage, setEmailMessage] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")

    const [validated, setValidated] = useState(false);

    const nav = useNavigate();

    //definitely should be a backend verification but...
    function validateLogin() : boolean{
        const accountJSONString = localStorage.getItem("USER_ACCOUNT")
        if (accountJSONString != null) {

            const userAccount : User  = JSON.parse(accountJSONString);

            if (userAccount.email === email && userAccount.password === password) {
                sessionStorage.setItem("CURRENT_USER", accountJSONString);
                return true;
            } else {
                setMessages(userAccount);
            }
        }
        return false;
    }

    //if time permits should have message be based on POST request error code from authentication API
    //but until then...
    function setMessages(userCredentials : User) {
        if (email === "") {
            setEmailMessage("Email is required");
        } else if (email !== userCredentials.email) {
            setEmailMessage("Not Valid Email");
            setPasswordMessage("invalid password");
            return;
        }

        if (password === "") {
            setPasswordMessage("Password required");
        } else if (password !== userCredentials.password) {
            setPasswordMessage("invalid password")
        }
    }


    function signIn(event : FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        if (!validateLogin() || !form.checkValidity()) {
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
                <h1 className = "sign-up-page--form-header">Sign In </h1>
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
                                            isInvalid = {emailMessage!==""}
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                {emailMessage}
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
                                            isInvalid = {passwordMessage!==""}
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                {passwordMessage}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className = "form--button-padding justify-content-center">
                                    <button
                                    type="submit"
                                    className = "form--submit-button"
                                    > Login </button>
                                </Row>
                            </Container>
                            <span> Don't have an account? Sign up <Link to = "/sign-up" relative="path">here</Link> </span>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}