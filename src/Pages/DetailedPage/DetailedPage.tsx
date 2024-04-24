// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
import { initalizeCareerBear, sendMessageToCareerBear } from "../../Services/CareerBear";
import { Button, Form } from "react-bootstrap";
import "./DetailedPage.css";

export function DetailedPage(): React.JSX.Element {

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  
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
    if (!initalized && careerBearTalking && !paused) {
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
  }, [careerBearTalking, initalized, paused])

  useEffect(() => {
    if (!careerBearTalking) {
      setCareerBearMessage("...(thinking)");
    } 
  }, [careerBearTalking])

  function answerQuestion() {
    setCareerBearTalking(false);
    sendMessageToCareerBear(userMessage).then((value) => {
      if (value !== null && value !== undefined) {
        const bearMessage = value.choices[0].message.content;
        console.log(bearMessage)
        if (bearMessage !== undefined && bearMessage !== null) {
          setCareerBearMessage(bearMessage);
          setCareerBearTalking(true);
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
        <button onClick={answerQuestion}> Send </button>
        <button onClick={() => setPaused(prev => !prev)}> {paused ? "Start" : "Pause"} </button>
      </div>
    </div>
  );
}