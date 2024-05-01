import "./HomePageApiKeyWidget.css"

import fitzWilly from "../../../../assets/career-bear/career-bear-2-neutral.png"
import { useState } from "react";
import { Form } from "react-bootstrap";


export function HomePageApiKeyWidget() : React.JSX.Element{

    const [internMessage, setInternMessage] = useState("I promise not to steal it");
    const [userKey, setUserKey] = useState("");


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
                        <img src = {fitzWilly}/>
                    </div>

                    <div className = "content--api-key-input">
                        <Form.Control 
                            className = "api-key-input--input-box"
                            
                            value = {userKey}
                            onChange = {(e) => setUserKey(e.target.value)}
                            placeholder="api key here"  
                        />

                        <button className = "content--submit-button"> Hand Over Key </button>
                    </div>
            </div>
            </div>
        </div>
    )
}