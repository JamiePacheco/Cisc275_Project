// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";


import "./DetailedPage.css";
import { initalizeCareerBear, sendMessageToCareerBear } from "../../Services/CareerBear";
import { ChatCompletion } from "openai/resources";
import { Button, Form } from "react-bootstrap";

export function DetailedPage(): React.JSX.Element {

  const [initalized, setInitalized] = useState<boolean>(false);
  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  const [careerBearMessages, setCareerBearMessages] = useState<string[]>([]);
  
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    window.addEventListener('beforeunload', alterUser)
    return () => {
      window.removeEventListener('beforeunload', alterUser)
    }
  }, []);

  const alterUser = (e : Event) => {
    e.preventDefault();
  }

  useMemo(() => {
    console.log(initalized)
    if (!initalized) {
      initalizeCareerBear().then((value) => {
          if (value !== null &&  value !== undefined) {
          const bearMessage = value.choices[0].message.content
          console.log(bearMessage)
          if (bearMessage !== undefined && bearMessage !== null) {
            setInitalized(true);
            setCareerBearMessage(bearMessage);
          }
        }
      }).catch((reason) => {

      })
    }
  }, [initalized])

  function answerQuestion() {
    sendMessageToCareerBear(userMessage).then((value) => {
      if (value !== null && value !== undefined) {
        const bearMessage = value.choices[0].message.content
        console.log(bearMessage)
        if (bearMessage !== undefined && bearMessage !== null) {
          setCareerBearMessage(bearMessage)
        }
      }
    })
  }

  return (
    <div className="detailed-quiz">
      <div className="detailed-quiz--content">
        <CareerBearPrompt message={careerBearMessage} ></CareerBearPrompt>
        <Form.Control 
        type = "area" 
        value = {userMessage} 
        onChange={(e) => {
          setUserMessage(e.target.value)
          console.log(userMessage)
        }}>
        </Form.Control>
        <Button onClick={() => answerQuestion()}> Send </Button>
      </div>
    </div>
  );
}
