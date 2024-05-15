import React, { FormEvent, useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/User/User";
import { LoginPageProps } from "./LoginPageProps";
import { authenticateUser } from "../../Services/UserServices/UserCredentialService";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiCallResponse } from "../../Interfaces/Responses/ApiCallResponse";

export function LoginPage({setUser} : LoginPageProps) : React.JSX.Element {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState(""); 

    //will use this but until then...
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [emailMessage, setEmailMessage] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")

    const [validated, setValidated] = useState(false);

    const nav = useNavigate();

    function setErrorMessages() {
        if (email === "") {
            setEmailMessage("Email is required");
        }

        if (password === "") {
            setPasswordMessage("Password is required")
        }
    }

    //definitely should be a backend verification but...
    //THERE IS NOW A BACKEND!!!!!
    function signIn(event : FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true)
            setErrorMessages();
            return;
        }

        authenticateUser(email, password).then((response : AxiosResponse<ApiCallResponse<User>>) => {
                const user = response.data.responseContent;
                if (user !== null) {
                    sessionStorage.setItem("CURRENT_USER", JSON.stringify(user));   
                    setUser(user); 
                    nav("/home"); 
                }
        }).catch((e : AxiosError<ApiCallResponse<User>>) => {
            if (axios.isAxiosError(e) && e.response && e.response.data) {
                console.log(e)
                //placeholder until I can deduce proper embeded type...
                //Proper typing has been deduced :)
                const message = e.response.data;

                if (message !== undefined){
                    if (message.detailedMessage.toLowerCase().includes("email")) {
                        setEmailMessage(message.detailedMessage);
                        setPasswordMessage("");
                    } 
                    if (message.detailedMessage.toLowerCase().includes("password")) {
                        setPasswordMessage(message.detailedMessage);
                        setEmailMessage("");
                    }
                }


            }
        })
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
                                            placeholder="password123" 
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