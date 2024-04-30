// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CAREER_BEAR_PERSONALITY, evaluateUserCareerFromQuiz, getQuizSessionData, initalizeCareerBear, notifyUser, sendMessageToCareerBear } from "../../Services/DetailedQuiz/CareerBear";
import { Form } from "react-bootstrap";
import "./DetailedPage.css";

import background from "../../assets/images/career-bear-forest.jpg"
import { UPSET_PHRASES } from "./CareerBearPhrases";
import { BearInteraction } from "../../Interfaces/QuizInterfaces/BearInteraction";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuiz";

export type BearEmotion = "neutral" | "sad" | "happy"

export function DetailedPage(): React.JSX.Element {

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [validKey, setValidKey] = useState<boolean>(false);

  //state to specifically keep track of whether to progress the quiz or not
  //if career bear is mad, sad, etc and dialouge is not related to user's career this will not progress
  const [consulting, setConsulting] = useState<boolean>(true);
  
  //current emotion is career bear is feeling...
  const [careerBearEmotion, setCareerBearEmotion] = useState<BearEmotion>("neutral");
  //the amount of thoughtful, valid interactions the user has had with career bear
  const [interactions, setInteractions] = useState<number>(0);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  const [userMessage, setUserMessage] = useState("");

  const [bearClicked, setBearClicked] = useState<number>(0);
  const [quizData, setQuizData] = useState<DetailedQuiz>();

  const onBearClick = () => {
    setBearClicked(prev => prev + 1);
    setCareerBearMessage("")
  }
  
  const alterUser = (e : Event) => {
    e.preventDefault();
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

  useEffect(() => {
    setConsulting(careerBearEmotion !== "sad")
  }, [careerBearEmotion])

  function notifyUserResults() {
    console.log(interactions)
    if (interactions >= 3) {
      notifyUser().then((value) => {
        if (value !== null && value !== undefined) {
          const bearMessage = value.choices[0].message.content;
          console.log(bearMessage);
          if (bearMessage !== undefined && bearMessage !== null) {
            setCareerBearMessage(bearMessage)
          }
        }
      }).catch((reason : Error) => {
        console.log(reason.message);
      }) 
    }
  }

  //Initalized career bear is user has pressed start and there is a valid key 
  useMemo(() => {
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
          setCareerBearMessage("(It appears career bear does not like your key...)")
        }
      })
    }
  }, [careerBearTalking, initalized, paused, validKey])

  function updateQuizData() {
    const interaction : BearInteraction = {
      careerBearPrompt : {
        prompt : careerBearMessage
      },
      userResponse : {
        response : userMessage
      }
    };

    if (quizData !== undefined){
      setQuizData(
        {
          interactions : [
            ...quizData.interactions, interaction
          ]
        }
      )
    } else {
      setQuizData(
        {
          interactions : [interaction]
        }
      )
    }
  }

  //called when user sends message to career bear that changes state and sends message
  function answerQuestion() {
    setCareerBearTalking(false);
    sendMessageToCareerBear(userMessage).then((value) => {
      if (value !== null && value !== undefined) {
        const bearMessage = value.choices[0].message.content;
        console.log(bearMessage)
        if (bearMessage !== undefined && bearMessage !== null) {
          updateQuizData();
          setCareerBearMessage(bearMessage);
          setCareerBearTalking(true);
          console.log(`Consulting : ${consulting}`)
          if (consulting) {
            setInteractions(prev => prev + 1);
            notifyUserResults();
          }
          if (bearMessage.trim() === "...") {
            setCareerBearEmotion("sad");
          } else {
            setCareerBearEmotion("neutral")
          }
          console.log(careerBearEmotion)
        }
      }
    })
  }

  function getResults() {
    setCareerBearTalking(false);
    notifyUser().then((value) => {
      if (value !== null && value !== undefined) {
        const bearMessage = value.choices[0].message.content;
        if (bearMessage !== undefined && bearMessage !== null) {
          setCareerBearMessage(bearMessage);
          setCareerBearTalking(true);
          setPaused(true);
        }
      }
    })
  }

  function getData() {
    console.log(quizData);
    if (quizData !== undefined){
      evaluateUserCareerFromQuiz(quizData).then((value) => {
        if (value !== null && value !== undefined) {
          const data = value.choices[0].message.content;
          console.log(data);
        }
      })
    }
  }

  console.log(careerBearMessage)

  return (
    <div className="detailed-quiz" style={{backgroundImage: `url(${background})`}}>
      <div className="detailed-quiz--content">
        <CareerBearPrompt 
          message={careerBearMessage} 
          bearClickHandler = {onBearClick}
          bearEmotion={careerBearEmotion} 
        />
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
            <button 
              onClick={answerQuestion} 
              disabled={!initalized}
            > 
              Send 
            </button>

            <button 
              onClick={() => setPaused(prev => !prev)}
              disabled={!validKey}  
            >
                {paused ? "Start" : "Pause"} 
              </button>

            <button
              onClick = {getResults}
              disabled={!initalized}
            >
              End Session
            </button>

            <button
              onClick = {getData}
              disabled = {!initalized}
            >
              Get Data
            </button>

            <button
              onClick = {() => setCareerBearEmotion(careerBearEmotion === "neutral" ? "sad" : "neutral")}
            >
              manipulate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}