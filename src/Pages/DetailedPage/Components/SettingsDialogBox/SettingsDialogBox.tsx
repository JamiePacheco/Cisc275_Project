import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

import "./SettingsDialogBox.css"

interface SettingsDialogBoxProps {
    debuggingMode : boolean;
    interactions: number;
    talkSpeed: number;
    setDebugging : React.Dispatch<React.SetStateAction<boolean>>;
    setRequiredInteractions : React.Dispatch<React.SetStateAction<number>>
    setBearTalkSpeed : React.Dispatch<React.SetStateAction<number>>
    setOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

//dialog box to control some of the settings within the detailed quiz
export function SettingsDialogBox({debuggingMode, interactions, talkSpeed, setDebugging, setRequiredInteractions, setBearTalkSpeed, setOpen} : SettingsDialogBoxProps) {

    //TODO fix issue with talk speed chaange not rendering to career bear speech

    const [debuggingSelected, setLocalDebugging] = useState<boolean>(debuggingMode);
    const [interactionsSelected, setInteractions] = useState<number>(interactions);
    const [talkSpeedSelected, setTalkSpeed] = useState<number>(talkSpeed);

    function changeDebugging() {
        setLocalDebugging(prev => !prev);
        setDebugging(prev => !prev);
    }

    function changeMinInteractions(e: ChangeEvent<HTMLInputElement>) {

        let interactions = Math.floor(Number(e.target.value) / 10)

        if (interactions < 3) {
            interactions = 3;
        }

        setInteractions(interactions)
        setRequiredInteractions(interactions)
    }

    function changeTalkingSpeed(e: ChangeEvent<HTMLInputElement>) {

        let talkingSpeed = Number(e.target.value)

        setTalkSpeed(talkingSpeed);
        setBearTalkSpeed(talkSpeed);
    }

    return (
        <Modal show = {true} centered >
            <Modal.Header className="dialog-header" >
                <Modal.Title> CareerBear Settings </Modal.Title>
                <button className = "exit-button" onClick={() => setOpen(prev => !prev)} > <i className="bi bi-x-lg"></i>  </button>
            </Modal.Header>

            <Modal.Body className = "dialog-body">
                
                <Form.Group>
                    <Form.Label> Quiz Min Interactions: {interactionsSelected} </Form.Label>
                    <Form.Range className = "dialog-range-input" onChange={(e) => changeMinInteractions(e)}/> 
                </Form.Group>

                <Form.Group>
                    <Form.Label> Career Bear Talking Speed: {talkSpeedSelected} yaps/min </Form.Label>
                    <Form.Range className = "dialog-range-input" onChange={(e) => changeTalkingSpeed(e)} />
                </Form.Group>


                <Form.Group>
                    <Form.Label> Debugging Mode </Form.Label>
                    <Form.Check
                        className = "dialog-switch"
                        type = "switch"
                        checked = {debuggingSelected}    
                        onChange={() => changeDebugging()}               
                    /> 
                </Form.Group>


            </Modal.Body>
        </Modal>
    )




}