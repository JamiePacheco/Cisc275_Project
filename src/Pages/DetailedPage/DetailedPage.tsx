// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
import { CAREER_BEAR_PERSONALITY, initalizeCareerBear, sendMessageToCareerBear } from "../../Services/CareerBear";
import { Form } from "react-bootstrap";
import "./DetailedPage.css";

import background from "../../assets/images/career-bear-forest.jpg"

export function DetailedPage(): React.JSX.Element {

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  
  const [userMessage, setUserMessage] = useState("");

  const [bearClicked, setBearClicked] = useState<number>(0);

  const onBearClick = () => {
    setBearClicked(prev => prev + 1);
    setCareerBearMessage("")
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alterUser)
    return () => {
      window.removeEventListener('beforeunload', alterUser)
    }
  }, []);

  useEffect(() => {
    if (bearClicked === 3 && paused) {
      setBearClicked(0);
      setCareerBearMessage("That's not bear-y nice...")
    }
  }, [bearClicked, paused])

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
      setCareerBearMessage("(Career Bear is thinking...)");
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
    <div className="detailed-quiz" style={{backgroundImage: `url(${background})`}}>
      <div className="detailed-quiz--content">
        <CareerBearPrompt message={careerBearMessage} bearClickHandler = {onBearClick} ></CareerBearPrompt>
        <div className = "content--user-interface">

          <div className = "user-interface--user-prompts">
            <Form.Control 
              type = "area" 
              value = {userMessage} 
              placeholder="Enter Response Here (Remember to be bear-y nice to Career Bear)"
              className = "user-prompts--user-input"
              onChange={(e) => {
                setUserMessage(e.target.value)
                console.log(userMessage)
              }}>
            </Form.Control>
          </div>
          
          <div className = "user-interface--buttons">
            <button onClick={answerQuestion} disabled={!initalized}> Send </button>
            <button onClick={() => setPaused(prev => !prev)}> {paused ? "Start" : "Pause"} </button>
          </div>
        </div>
      </div>
    </div>
  );
}