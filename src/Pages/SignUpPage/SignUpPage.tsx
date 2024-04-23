import {Col, Container, Form, Row} from "react-bootstrap"
import "./SignUpPage.css"
import { FormEvent, useState } from "react";
import { User } from "../../Interfaces/User";
import { Link, useNavigate } from "react-router-dom";

export function SignUpPage() : React.JSX.Element {

    //TODO extract password input into own component perhaps???
    //TODO create hyperlink to login page and vise versa
    //TODO check if email is already in use

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const nav = useNavigate();

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

    function createUserObject() : User {
        const age = getAge();
        const newAccount : User = {
            userId: 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthday: birthday,
            age: age,
            password: password
        } 

        return newAccount;
    }
 
    function createAccount(event : FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true)
            return;
        } else {
            const newAccount = createUserObject();
            const accountJSONString = JSON.stringify(newAccount);
            localStorage.setItem("USER_ACCOUNT", accountJSONString);
            sessionStorage.setItem("CURRENT_USER", accountJSONString);
            nav("/home");
        }   
    }

    return (
        <div className = "sign-up-page">
            <div className = "sign-up-page--content">
                <h1 className = "sign-up-page--form-header">Let's Make An Account! </h1>
                <div className = "sign-up-page--form-container"> 
                    <div className = "form-container--content">
                        <Form noValidate validated = {validated} onSubmit={createAccount}>
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