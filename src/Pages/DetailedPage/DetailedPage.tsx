// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CAREER_BEAR_PERSONALITY, initalizeCareerBear, sendMessageToCareerBear } from "../../Services/CareerBear";
import { Form } from "react-bootstrap";
import "./DetailedPage.css";

import background from "../../assets/images/career-bear-forest.jpg"
import { UPSET_PHRASES } from "./CareerBearPhrases";

export function DetailedPage(): React.JSX.Element {

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [validKey, setValidKey] = useState<boolean>(false);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  
  const [userMessage, setUserMessage] = useState("");

  const [bearClicked, setBearClicked] = useState<number>(0);

  const onBearClick = () => {
    setBearClicked(prev => prev + 1);
    setCareerBearMessage("")
  }

  //used to prevent sudden page refresh
  useEffect(() => {
    window.addEventListener('beforeunload', alterUser)
    return () => {
      window.removeEventListener('beforeunload', alterUser)
    }
  }, []);

  //checks if user has clicked on career bear and prompts message
  useEffect(() => {
    if (bearClicked === 3 && paused) {
      setBearClicked(0);
      setCareerBearMessage(UPSET_PHRASES[Math.floor(Math.random() * UPSET_PHRASES.length)]);
    }
  }, [bearClicked, paused])

  //Checks if the user has a valid key stored otherwise presents message
  useEffect(() => {
    const userKey = localStorage.getItem("MYKEY")
    console.log(`User Key : '${userKey}'`);
    if (userKey !== "") {
      setValidKey(true);
    } else {
      console.log("invalid")
      setValidKey(false)
      setCareerBearMessage("hmmmm, I'm bear-y sorry, but I can only talk to you if you have an API key")
    }
  }, [])

  //Checks if career bear is talking or thinking of a response (awaiting gpt promise) and presents message
  useEffect(() => {
    if (!careerBearTalking) {
      setCareerBearMessage("(Career Bear is thinking...)");
    } 
  }, [careerBearTalking])

  const alterUser = (e : Event) => {
    e.preventDefault();
  }

  //Initalized career bear is user has pressed start and there is a valid key 
  useMemo(() => {
    console.log(initalized)
    if (!initalized && careerBearTalking && !paused && validKey) {
      initalizeCareerBear().then((value) => {
          if (value !== null &&  value !== undefined) {
          const bearMessage = value.choices[0].message.content
          console.log(bearMessage)
          if (bearMessage !== undefined && bearMessage !== null) {
            setInitalized(true);
            setCareerBearMessage(bearMessage);
          }
        }
      }).catch((reason : Error) => {
        if (reason.message.includes("Incorrect API")) {
          setCareerBearMessage("It appears your key is not working...")
        }
      })
    }
  }, [careerBearTalking, initalized, paused, validKey])

  //called when user sends message to career bear that changes state and sends message
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

  console.log(careerBearMessage)

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