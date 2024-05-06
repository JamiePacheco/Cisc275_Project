import React, { FormEvent, useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/User/User";
import { LoginPageProps } from "./LoginPageProps";
import { authenticateUser } from "../../Services/UserServices/UserCredentialService";

export function LoginPage({setUser} : LoginPageProps) : React.JSX.Element {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState(""); 

    const [emailMessage, setEmailMessage] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")

    const [validated, setValidated] = useState(false);

    const nav = useNavigate();

    //definitely should be a backend verification but...
    //THERE IS NOW A BACKEND!!!!!
    async function signIn(event : FormEvent<HTMLFormElement>) {
        let user : User | null = null;
        const form = event.currentTarget;

        await authenticateUser(email, password).then((response) => {
                user = response.data;
                console.log(user)
                console.log(response);
                sessionStorage.setItem("CURRENT_USER", JSON.stringify(user));        
        }).catch((e : Error) => {
            setPasswordMessage(e.message);
        })

        console.log("User: " + user);
        if (user === null || !form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true)
            return;
        } else {          
            setUser(user); 
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