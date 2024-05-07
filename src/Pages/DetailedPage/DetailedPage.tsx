import React, { useEffect, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
import { evaluateUserCareerFromQuiz, initalizeCareerBear, notifyUser, sendMessageToCareerBear } from "../../Services/DetailedQuiz/CareerBear";
import { Form } from "react-bootstrap";
import "./DetailedPage.css";

import { UPSET_PHRASES } from "./CareerBearPhrases";
import { BearInteraction } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { DetailedPageProps } from "./DetailedPageProps";
import { QuizResults } from "../../Interfaces/Results/QuizResults";
import { LoadingScreen } from "../../Components/LoadingScreen/LoadingScreen";
import { saveDetailedQuizData } from "../../Services/UserServices/UserDataService";
import { AxiosResponse } from "axios";

export type BearEmotion = "neutral" | "sad" | "happy"

export function DetailedPage({user} : DetailedPageProps): React.JSX.Element {

  const [debugging, setDebugging] = useState(true);

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [validKey, setValidKey] = useState<boolean>(false);

  const [loadingData, setLoading] = useState<boolean>(false);

  //state to specifically keep track of whether to progress the quiz or not
  //if career bear is mad, sad, etc and dialouge is not related to user's career this will not progress
  const [consulting, setConsulting] = useState<boolean>(true);
  
  //current emotion is career bear is feeling...
  const [careerBearEmotion, setCareerBearEmotion] = useState<BearEmotion>("neutral");
  //the amount of thoughtful, valid interactions the user has had with career bear
  const [interactions, setInteractions] = useState<number>(0);
  //state to check if the user has been notified about their session being able to be processed
  const [notified, setNotified] = useState<boolean>(false);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>("");
  const [userMessage, setUserMessage] = useState("");

  const [bearClicked, setBearClicked] = useState<number>(0);
  const [quizData, setQuizData] = useState<DetailedQuiz>(
    {
      dateTaken : new Date().toISOString(),
      interactions: []
    }
  );
  
  //Initalized career bear is user has pressed start and there is a valid key 
  useEffect(() => {
    console.log("initalizing career bear " + initalized)
    if (!initalized && careerBearTalking && !paused && validKey) {
      initalizeCareerBear(user).then((value) => {
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
  }, [careerBearTalking, initalized, paused, user, validKey])

  useEffect(() => {
    if (debugging) {
      console.log(JSON.stringify(quizData, null, 4));
    }
  }, [quizData, debugging])

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

  
  const onBearClick = () => {
    setBearClicked(prev => prev + 1);
    setCareerBearMessage("")
  }
  
  const alterUser = (e : Event) => {
    e.preventDefault();
  }


  //saves the generated results to the current quiz session 
  function computeResultData(generatedResults :  QuizResults) : DetailedQuiz {

    setQuizData((prev) => {
      return {
        ...prev,
        results: generatedResults
      }
    }
  )

    //return the most up-to-date user data to send to backend server
    return {
      ...quizData,
      results: generatedResults
    }
    
  }


  //notifies the user that the results may be compiled
  function notifyUserResults() : boolean {
    console.log(interactions)
    if (interactions >= 3 && !notified) {
      notifyUser().then((value) => {
        if (value !== null && value !== undefined) {
          const bearMessage = value.choices[0].message.content;
          console.log(bearMessage);
          if (bearMessage !== undefined && bearMessage !== null) {
            setCareerBearMessage(bearMessage)
            setNotified(true);
          }
          return true
        }
      }).catch((reason : Error) => {
        console.log(reason.message);
      }) 
    }
    return false;
  }

  //updates the current quiz session data
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
          ...quizData,
          interactions : [
            ...quizData.interactions, interaction
          ]
        }
      )
    }
  }

  //called when user sends message to career bear that changes state and sends message
  function answerQuestion() {
    setCareerBearTalking(false);
    sendMessageToCareerBear(userMessage, careerBearMessage).then((value) => {
      if (value !== null && value !== undefined) {
        const bearMessage = value.choices[0].message.content;
        setCareerBearTalking(true);
        if (bearMessage !== undefined && bearMessage !== null) {
          updateQuizData();
          if (consulting) {
            const resultsReady = notifyUserResults();
            setInteractions(prev => prev + 1);
            
            if (!resultsReady) {
              setCareerBearMessage(bearMessage);
              console.log(`Consulting : ${consulting}`)
              if (bearMessage.trim() === "...") {
                setCareerBearEmotion("sad");
              } else {
                setCareerBearEmotion("neutral")
              }
              console.log(careerBearEmotion)
            }
          }
        }
      }
    })
  }

  //this function lets the user know that career bear has sufficient infomation to give them a career suggestion
  // function notifyOfProcessing() {
  //   setCareerBearTalking(false);
  //   notifyUser().then((value) => {
  //     if (value !== null && value !== undefined) {
  //       const bearMessage = value.choices[0].message.content;
  //       if (bearMessage !== undefined && bearMessage !== null) {
  //         setCareerBearMessage(bearMessage);
  //         setCareerBearTalking(true);
  //         setPaused(true);
  //       }
  //     }
  //   })
  // }

  //makes career bear compile all of the data from the session convo
  function getData() {
    console.log(quizData);
    if (quizData !== undefined){
      setCareerBearTalking(false);
      setLoading(true);
      evaluateUserCareerFromQuiz(quizData).then((value) => {
        if (value !== null && value !== undefined) {
          const data = value.choices[0].message.content;
          setLoading(false)
          if (data !== null){
            setCareerBearTalking(true)
            const jsonData = JSON.parse(data);
            //TODO remove after reports page is done
            setCareerBearMessage("I have compiled your results! Check the console to view them! (Make sure to enable debugging)")
            setPaused(true);
            const requestData = computeResultData(jsonData);
            
            if (user !== null) {
              requestData.userAccount = user;
              saveDetailedQuizData(requestData, user.userId).then((res : AxiosResponse<DetailedQuiz>) => {
                console.log("Data saved!!!!")
                console.log(JSON.stringify(res.data, null, 2))
              }) 
            } 
          }
        }
      })
    }
  }

  if (loadingData) {
    return (<LoadingScreen/>)
  }

  return (
    //style={{backgroundImage: `url(${background})`}}
    <div className="detailed-quiz">
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
                {paused ? "Continue" : "Pause"} 
              </button>

            <button
              onClick = {getData}
              disabled={!initalized}
            >
              End Session
            </button>

            <button
              onClick = {() => setCareerBearEmotion(careerBearEmotion === "neutral" ? "sad" : "neutral")}
            >
              manipulate
            </button>

            <button
              onClick = {() => setDebugging(prev => !prev)}
            >
              {!debugging ? "Start Debugging Mode" : "Stop Debugging Mode"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}