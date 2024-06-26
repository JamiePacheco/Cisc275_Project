import React, { useEffect, useState } from "react";
import { CareerBearPrompt } from "./Components/CareerBearPrompt/CareerBearPrompt";
import { evaluateUserCareerFromQuiz, initalizeCareerBear, sendMessageToCareerBear } from "../../Services/DetailedQuiz/CareerBear";
import { Form } from "react-bootstrap";
import "./DetailedPage.css";

import background from "../../assets/images/background.jpg"

import { UPSET_PHRASES, WORKING_INITAL_MESSAGE } from "./CareerBearPhrases";
import { BearInteraction } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { DetailedPageProps } from "./DetailedPageProps";
import { QuizResults } from "../../Interfaces/Results/QuizResults";
import { LoadingScreen } from "../../Components/LoadingScreen/LoadingScreen";
import { saveDetailedQuizData } from "../../Services/UserServices/UserDataService";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ApiCallResponse } from "../../Interfaces/Responses/ApiCallResponse";
import { ReportsResults } from "../../Interfaces/Reports/ReportsResults";
import { CareerProgressBear } from "../../Components/ProgressBar/ProgressBar";
import { SettingsDialogBox } from "./Components/SettingsDialogBox/SettingsDialogBox";

export type BearEmotion = "neutral" | "sad" | "happy" | "sleeping"

const debuggingPhrases = ["Hello my name is career bear!" , "Currently we are in debugging mode!", "I love to gamble!", "(I should decrease Fitz's pay...)", "Concentrate every minute like a Roman—like a man—on doing what’s in front of you with precise and genuine seriousness, tenderly, willingly, with justice. And on freeing yourself from all other distractions. Yes, you can—if you do everything as if it were the last thing you were doing in your life, and stop being aimless, stop letting your emotions override what your mind tells you, stop being hypocritical, self-centered, irritable. You see how few things you have to do to live a satisfying and reverent life? If you can manage this, that’s all even the gods can ask of you"]

export function DetailedPage({user} : DetailedPageProps): React.JSX.Element {

  //will enable debuggging mode which makes interactions radom text instead of GPT responses for yknow money saving purposes
  const [debugging, setDebugging] = useState(false);

  //checks if the settings dialog is open
  const [settings, setSettings] = useState(false);

  const [initalized, setInitalized] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [validKey, setValidKey] = useState<boolean>(false);

  const [loadingData, setLoading] = useState<boolean>(false);

  //state to specifically keep track of whether to progress the quiz or not
  //if career bear is mad, sad, etc and dialouge is not related to user's career this will not progress
  const [consulting, setConsulting] = useState<boolean>(false);
  
  //current emotion is career bear is feeling...
  const [careerBearEmotion, setCareerBearEmotion] = useState<BearEmotion>("sleeping");
  //the amount of thoughtful, valid interactions the user has had with career bear
  const [interactions, setInteractions] = useState<number>(0);
  const [requiredInteractions, setRequiredInteractions] = useState<number>(3);
  //state to check if the user has been notified about their session being able to be processed
  const [notified, setNotified] = useState<boolean>(false);

  //variable to keep trap of typewriter output speed
  const [bearTalkSpeed, setBearTalkSpeed] = useState<number>(30);

  const [careerBearTalking, setCareerBearTalking] = useState<boolean>(true);
  const [careerBearMessage, setCareerBearMessage] = useState<string>(WORKING_INITAL_MESSAGE);
  const [userMessage, setUserMessage] = useState("");

  const [bearClicked, setBearClicked] = useState<number>(0);

  const [interactionNumber, setInteractionNumber] = useState<number>(1);

  const [quizData, setQuizData] = useState<DetailedQuiz>(
    {
      bearClicked: 0,
      dateTaken : new Date().toISOString(),
      interactions: []
    }
  );

  const nav = useNavigate();
  
  //used to scroll to the top when landing on page
  //easiest solution to workaround being unable to access browser history
  //cursed hash router...
  const [onLanding, setOnLanding] = useState(true);

  useEffect(() => {
    if (onLanding) {
      window.scrollTo(0, 0)
      setOnLanding(false);
    }
  }, [onLanding])

  //Initalized career bear is user has pressed start and there is a valid key 
  useEffect(() => {
    console.log("initalizing career bear " + initalized)
    if (!initalized && careerBearTalking && !paused && validKey) {

      if (debugging) {
        setInitalized(true);
        setCareerBearMessage("Hi I am Fitz Ferguson, better know as Career Bear!")
        setCareerBearEmotion("neutral")
        return;
      }

      setCareerBearMessage("(Career Bear needs a minute to wake up)")
      initalizeCareerBear(user).then((value) => {
        if (value !== null &&  value !== undefined) {
          const bearMessage = value.choices[0].message.content
          console.log(bearMessage)
          if (bearMessage !== undefined && bearMessage !== null) {
            setCareerBearEmotion("neutral")
            setInitalized(true);
            setCareerBearMessage(bearMessage);
          }
        }
      }).catch((reason : Error) => {
        if (reason.message.includes("Incorrect API")) {
          setCareerBearMessage("(It appears Career Bear does not like your key...)")
          setValidKey(false);
        }
      })
    } 
  }, [careerBearTalking, initalized, paused, user, validKey, debugging])

  useEffect(() => {
    console.log(JSON.stringify(quizData, null, 4));
  }, [quizData])

  //used to prevent sudden page refresh
  useEffect(() => {
    window.addEventListener('beforeunload', alterUser)
    return () => {
      window.removeEventListener('beforeunload', alterUser)
    }
  }, []);

  //checks if user has clicked on career bear and prompts message
  useEffect(() => {
    if (bearClicked > 0 && bearClicked % 3 === 0 && paused && !consulting) {
      if (careerBearEmotion === "sleeping") {
        setCareerBearMessage("(Career Bear  Is Sleeping...)")
        return;
      }
      setCareerBearMessage(UPSET_PHRASES[Math.floor(Math.random() * UPSET_PHRASES.length)]);
    }
    console.log("Bear touched???\ntouched: " + bearClicked)
    console.log("consulting: " + consulting)
  }, [bearClicked, careerBearEmotion, consulting, paused])

  //Checks if the user has a valid key stored otherwise presents message
  useEffect(() => {
    const userKey = localStorage.getItem("MYKEY")
    if (userKey !== "" && userKey !== undefined && userKey !== null) {
      setValidKey(true);
    } else {
      setValidKey(false)
    }
  }, [])

  //Checks if career bear is talking or thinking of a response (awaiting gpt promise) and presents message
  useEffect(() => {
    if (!careerBearTalking) {
      setCareerBearMessage("(Career Bear is thinking...)");
    } 
  }, [careerBearTalking])

  //checks if career bear is consuling the user based on his emotions (only is consulting if neutral)
  useEffect(() => {
    setConsulting(careerBearEmotion === "neutral" && !paused)
  }, [careerBearEmotion, paused])

  
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
        bearClicked: bearClicked,
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
  function formBearMessage(bearMessage : string) : string {
    console.log(interactions)
    if (interactions >= requiredInteractions && !notified) {
      setNotified(true);
      return bearMessage + "\n\nAlso I'm bear-y excited to say that I have the bear minimum to compile your results! So whenever you feel ready click the 'Get Report' button or feel free to contiue!"
    }
    return bearMessage;
  }

  function handleFlowControl() {
    if (!initalized) {
      if (validKey) {
        setPaused(false);
      } else {
        setCareerBearMessage("(it appears your invalid api key cannot wake the career bear...)"
        )
      }
    } else {
      setPaused(prev => !prev)
    }
    
  }

  //updates the current quiz session data
  function updateQuizData() {
    const interaction : BearInteraction = {
      position : interactionNumber,
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

    setInteractionNumber(prev => prev + 1);
  }

  //called when user sends message to career bear that changes state and sends message
  function answerQuestion() {

    setCareerBearTalking(false);
    if (!debugging && userMessage.trim() !== undefined) {
      sendMessageToCareerBear(userMessage, careerBearMessage).then((value) => {
        if (value !== null && value !== undefined) {
          const bearMessage = value.choices[0].message.content;
          setCareerBearTalking(true);
          if (bearMessage !== undefined && bearMessage !== null) {
            updateQuizData();
            if (consulting) {
              setInteractions(prev => prev + 1);

              setCareerBearMessage(formBearMessage(bearMessage));
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
      })
    } else {
      setCareerBearTalking(false);
      setCareerBearMessage(formBearMessage(debuggingPhrases[Math.floor(Math.random() * debuggingPhrases.length)]));
      setInteractions(prev => prev + 1);
      setCareerBearTalking(true)
    }
  }

  //makes career bear compile all of the data from the session convo
  function getData() {

    if (quizData !== undefined && !debugging){
      setCareerBearTalking(false);
      setLoading(true);

      //calls OpenAI api to evaluate all questions and answers
      evaluateUserCareerFromQuiz(quizData).then((value) => {
        if (value !== null && value !== undefined) {
          const data = value.choices[0].message.content;
          setLoading(false)
          if (data !== null){
            setCareerBearTalking(true)
            const jsonData = JSON.parse(data);
            setPaused(true);

            //saves the compiled results data into the overarching quiz object
            const requestData = computeResultData(jsonData);
            
            // if the user is logged in then begin the user save progress
            if (user !== null && user !== undefined) {
              requestData.user = user;
            
              //send post error to backend to save the data
              saveDetailedQuizData(requestData, user).then((res : AxiosResponse<ApiCallResponse<DetailedQuiz>>) => {
                console.log("Data has been successfully saved")
                console.log("Request status: " + res.status)
              }).catch((e : AxiosError<ApiCallResponse<DetailedQuiz>>) => {
                console.log(`Error saving data: ${e.message}`);
              })
            }

            //creates a general reports object to send to the reports page
            const reportsObject : ReportsResults = {
              quizResultsType : "detailed",
              data : requestData
            }

            //saves teh reports object locally to easily access
            sessionStorage.setItem("QUIZ_DATA", JSON.stringify(reportsObject))
            nav("/reports")
          }
        }
      }).catch((e) => {
          setCareerBearTalking(true);
          setCareerBearMessage("Hmmm I'm beary sorry but there appears to be an issue with the bear algorithims...(Open AI appears to be failing, try again later).")
        }
      )
    }
  }

  if (loadingData) {
    return (<LoadingScreen/>)
  }
   
  return (
    <div 
      style={
        {
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
      } 
      className="detailed-quiz"
    >
      <div className="detailed-quiz--content">


        {
          settings && 
          <SettingsDialogBox 
            debuggingMode={debugging}
            talkSpeed={bearTalkSpeed}
            interactions={requiredInteractions}
            setDebugging={setDebugging} 
            setBearTalkSpeed={setBearTalkSpeed} 
            setRequiredInteractions={setRequiredInteractions}
            setOpen={setSettings}
          />
        }

        <CareerProgressBear curr={interactions - 1} total={requiredInteractions} mode={"intern"}></CareerProgressBear>

        <CareerBearPrompt 
          message={careerBearMessage} 
          bearClickHandler = {onBearClick}
          bearEmotion={careerBearEmotion} 
          talkingSpeed = {bearTalkSpeed}
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
            {
              (!paused && initalized) && (
                <button 
                  onClick={answerQuestion} 
                  disabled={!initalized}
                > 
                <i className ="bi bi-send-fill"></i> Send 
                </button>
              )
            }
            <button 
              onClick={() => handleFlowControl()}
            >
              <i className ={`bi ${paused ? "bi-play-fill" : "bi-pause-fill"}`}/> {!initalized ?  "Start Session" : (paused ? "Continue" : "Pause")} 
            </button>

            {notified && <button
              onClick = {() => getData()}
              disabled={!initalized}
            >
              <i className="bi bi-folder-fill"></i> Get Report
            </button>
            }   

            <button
              onClick={() => setSettings(prev => !prev)}
            >
              <i className="bi bi-gear-fill"></i> Settings
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
