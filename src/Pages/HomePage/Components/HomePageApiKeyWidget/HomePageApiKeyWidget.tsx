import "./HomePageApiKeyWidget.css"

import fitzWilly from "../../../../assets/career-bear/career-bear-2-neutral.png"
import { useEffect, useState } from "react";
import {Form, InputGroup } from "react-bootstrap";
import { HomePageApiKeyWidgetProps } from "./HomePageApiKeyWidgetProps";

const quips = ["I promise not to lose it!", "I'll be bear-y careful", "I wonder if I can sell it..."]

export function HomePageApiKeyWidget({handleKeyClear, handleKeySubmit} : HomePageApiKeyWidgetProps) : React.JSX.Element{

    const [internMessage, setInternMessage] = useState("");
    
    const [userKey, setUserKey] = useState("");

    const [inputKey, setInputKey] = useState("");
    
    useEffect(() => {
        setInternMessage(quips[Math.floor(Math.random() * 3)]);
    }, [])

    useEffect(() => {
        const key = localStorage.getItem("MYKEY");
        if (key !== null && key !== "") {
            setUserKey(key)
        }
    }, [userKey])

    function saveApiKey() {
        setUserKey(inputKey);
        handleKeySubmit(inputKey);
    }

    function clearApiKey() {
        setUserKey("");
        handleKeyClear();
    }

    return (
        <div className = "home-page-api-key-widget">
            <h1> Heads Up! </h1>
            <div className = "api-key-widget--content">
                <div className = "api-key-widget--text-content">
                    <div>
                        <p> CareerBear utilizes OpenAI's api to give you the greatest experience.</p>
                        <p> To get the most functionality make sure you have an api key on record.</p>
                        <p> Don't worry Career Bear's Intern will keep it bear-y safe!</p>
                    </div> 
                
                    <div className = "content--fitz-widget">
                        <span className = "fitz-widget--speech"> {internMessage} </span>
                        <img src = {fitzWilly} alt = "career bear intern"/>
                    </div>
                    

                        <div className = "content--api-key-input">
                            {
                                userKey === "" &&
                                <div className = "input-container">
                                <InputGroup>
                                    <Form.Control 
                                        className = "api-key-input--input-box"
                                        type={"password"}
                                        value = {inputKey}
                                        onChange = {(e) => {
                                            setInputKey(e.target.value)
                                            console.log(userKey)
                                        }}
                                        placeholder="api key here"  
                                    />
                                </InputGroup>
                            
                            
                                <button 
                                    className = "content--submit-button"
                                    onClick = {() => saveApiKey()}
                                > Give Key </button>
                                </div>
                            }    

                            {
                                userKey !== "" && 
                                    <div className = "input-container">
                                        <div className = "clear-key-container">
                                            <p> API Key has been saved.</p>
                                            <button 
                                                className = "clear-api-key--button"
                                                onClick={() => clearApiKey()}    
                                            > Add New Key </button>
                                            <span className = "clear-warning"> (adding new key completely deletes old key)</span>

                                        </div>

                                    </div>
                                
                            }
                        </div>

                    
            </div>
            </div>
        </div>
    )
}