import {Col, Container, Form, Row} from "react-bootstrap"
import "./SignUpPage.css"
import { FormEvent, useEffect, useState } from "react";
import { User } from "../../Interfaces/User/User";
import { Link, useNavigate } from "react-router-dom";
import { SignUpPageProps } from "./SignUpPageProps";
import { createUser } from "../../Services/UserServices/UserCredentialService";
import axios, {AxiosError, AxiosResponse } from "axios";
import { ApiCallResponse } from "../../Interfaces/Responses/ApiCallResponse";
import { CredentialLoadingScreen } from "../../Components/LoadingScreen/CredentialLoadingScreen";

export function SignUpPage({setUser} : SignUpPageProps) : React.JSX.Element {

    //TODO extract password input into own component perhaps???

    //all state to hold the value of the respective fields
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const [emailMessage, setEmailMessage] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    //used to scroll to the top when landing on page
    //easiest solution to workaround being unable to access browser history
    //cursed hash router...
    const [onLanding, setOnLanding] = useState(true);

    useEffect(() => {
        if (onLanding) {
        window.scrollTo(0, 0)
        setOnLanding(false);
        }
    }, [onLanding])

    //not really used but might always be good to have
    function getAge() : number {

        let today = new Date();
        let birthdayDate = new Date(birthday)
        let age = today.getFullYear() - birthdayDate.getFullYear();
        let month = today.getMonth() - birthdayDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthdayDate.getDate())) {
            age--;
        }
        return age;
    }

    //as the name suggests
    function createUserObject() : User {
        const age = getAge();
        const newAccount : User = {
            //is only temporary, will get actual user Id from backend
            id: -1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthday: birthday,
            age: age,
            password: password,
            newAccount: true
        } 

        return newAccount;
    }
    
    function createAccount(event : FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        //checks if the form and input fields are actually valid or not
        if (!form.checkValidity()) {
            setEmailMessage("Invalid Email")

            event.preventDefault();
            event.stopPropagation();
            setValidated(true)
            return;
        } else {
            const newAccount = createUserObject();
            setLoading(true);
            
            //sends request to the backend to create new user account
            createUser(newAccount).then((response : AxiosResponse<ApiCallResponse<User>>) => {
                setLoading(false);
                const responseData = response.data;

                //parses the data into a string and saves it to the session storage
                const accountJSONString = JSON.stringify(responseData.responseContent, null, 4);
                sessionStorage.setItem("CURRENT_USER", accountJSONString);
                setUser(responseData.responseContent);
                nav("/home")
            //for whatever reason it may fail
        }).catch((e : AxiosError<ApiCallResponse<User>>) => {
                setLoading(false);
                if (axios.isAxiosError(e) && e.response && e.response.data) {
                    const errorResponse = e.response?.data;

                    //really there is only one backend error and that is the email is already in use.
                    //future will have email validation here to check if email exists.
                    //Also profanity check might be good just in case any hooligans decide to be funny...
                    if (errorResponse.detailedMessage.includes("email")) {
                        setEmailMessage(errorResponse.detailedMessage);
                    }
                }
            })
        }   
    }

    if (loading) {
        return <CredentialLoadingScreen></CredentialLoadingScreen>
    }

    return (
        <div className = "sign-up-page">
            <div className = "sign-up-page--content">
                <h1 className = "sign-up-page--form-header">Let's Make An Account! </h1>
                <div className = "sign-up-page--form-container"> 
                    <div className = "form-container--content">
                        <Form noValidate validated = {validated} onSubmit={(e) => createAccount(e)}>
                            <Container fluid>
                                <Row className="form--row-padding">
                                    <Form.Label className = "form--label-heading"> Name </Form.Label>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                            required
                                            className = "form--font" 
                                            placeholder="First Name"
                                            size = "lg" 
                                            value = {firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                console.log(firstName)
                                            }}
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                First Name Required
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                            required
                                            className = "form--font" 
                                            placeholder="Last Name"
                                            size = "lg"
                                            value = {lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                console.log(lastName)
                                            }}
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                Last Name Required
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
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
                                            isInvalid = {emailMessage !== ""}
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
                                            pattern=".{7,}"
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type = "invalid">
                                                Invalid Password
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="form--row-padding">
                                    <Form.Label className="form--label-heading">Birthday</Form.Label>
                                    <Form.Group>
                                        <Form.Control
                                            required
                                            value={birthday}
                                            type = "date"
                                            className = "form--date-picker"
                                            size = "lg"
                                            onChange={(e) => {
                                                setBirthday(e.target.value);
                                                console.log(birthday)
                                            }}
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type = "invalid">
                                            Birthday Required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className = "form--button-padding justify-content-center">
                                    <button
                                    type="submit"
                                    className = "form--submit-button"
                                    > Create Account </button>
                                </Row>
                            </Container>
                            <span> Have an account? Sign in <Link to = "/login" relative="path">here</Link></span>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}