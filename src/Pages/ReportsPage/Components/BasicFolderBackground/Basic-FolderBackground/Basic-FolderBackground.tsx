import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
// import { BasicQuiz } from '../../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface';
import './Basic-FolderBackground.css';
import React, { useState } from 'react';
import signature from '../../../../../assets/logos/signature.png'
import { BasicQuiz } from '../../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface'
import { CareerSuggestionView } from '../CareerSuggestionView/CareerSuggestion';
import { PersonalityView } from '../PersonalityView/PersonalityView';
import { getJobsDetailsFromSuggestedJob } from '../../../../../Services/DetailedQuiz/CareerBear';
import { useTypeWriter } from '../../../../../Hooks/useTypeWriter';

import fitz from "../../../../../assets/career-intern/fitzemotehappy.png"
import { PERSONALITY_PHRASES } from './InternMessages';
import { getRandomElement } from '../../../../../Services/MiscServices';


export function BasicFolderBackground({quizData} : {quizData : BasicQuiz | null}) : JSX.Element{
    const[key, setKey] = useState('tab4');
    const [internmessage, setInternMessage] = useState("I am beary excited to show your results!"); 

    const setInternMessageOnTabChange = (key : string) => {
      setKey (key as string)

      if (key === "tab5") {
        setInternMessage(getRandomElement(PERSONALITY_PHRASES))
        return;
      }

      if (key === "tab1" || key === "tab2" || key === "tab3") {
        setInternMessage("Feel free to click on any of the suggested jobs for more information!")
        return;
      }
    }


    const getJobDetails = (job : string) => {

        setInternMessage("(Career Bear is thinking...)")
        getJobsDetailsFromSuggestedJob(job).then((response) => {
            if (response !== null) {
                const message = response?.choices[0].message.content;

                if (message !== null && message !== undefined) {
                    setInternMessage(message)
                } else {

                }
            }
        })
    }

    const careerBearMessage = useTypeWriter(internmessage);

    const tabs = quizData?.basicQuizResults?.careerFieldSuggestions.map((career, i) => {
        return (
          <Tab eventKey={`tab${i + 1}`}  title={<span className = 'tab-name'>{career.careerField}</span>}>
            <CareerSuggestionView data={career} getJobDetails = {getJobDetails}></CareerSuggestionView>
          </Tab>
        )})
  
    return(

        <div className = "manillafolder">
            <Tabs
                id="careerFile"
                activeKey ={key}
                onSelect = {(k) => {
                  if (k !== null){
                    setInternMessageOnTabChange(k)
                  }
                }}
            >
        
        <Tab eventKey="tab4" title={<span className = 'tab-name'>Overview</span>}>
         <Container>
          <div>
            <Row className = "tabs-content">
                <Col>

                <div className = "careerfile-intro">
                  <p>I, CareerBear, have been hard at work sorting out all the necessary information needed to deliver to you your personalized CareerFile! In this file, you will be able to read all about what aspects of your personality lead my decision, as well as any other important information!</p>
                </div>

                <div className = "careerintro-personality">
                <h5>Your Personality</h5>
                <p>
                I, CareerBear, found you to be <span style = {{"fontWeight" : "bold"}}>{quizData?.basicQuizResults?.personalityTraits.map(trait => trait.trait).slice(0, -1).join(', ') + ', and ' + quizData?.basicQuizResults?.personalityTraits.map(trait => trait.trait).pop()}</span>. In the next section of the CarrerFile, we'll go into depth on these traits, and how they factored into the careers selected for you.
                </p>
                </div>

                <div className = "careerintro-careers">
                <h5>Your Careers</h5>
                <p>After close examination of your results, the career fields that I found to most fit you are the following: <span style = {{"fontWeight" : "bold"}}>{quizData?.basicQuizResults?.careerFieldSuggestions.map(career => career.careerField).slice(0, -1).join(', ') + ', and ' + quizData?.basicQuizResults?.careerFieldSuggestions.map(career =>career.careerField).pop()} </span>. We will further go into detail about these further in your file!</p>
                </div>

                </Col>
                <Col>
                    <div className = "careerbear-oath">
                    <h5>The CareerBear Oath</h5>
                    <p>
                    It can be bear-y challenging and stressful when planning for the future! That's why when I became the CareerBear, I swore to help everyone as best as I can find a career that is fun and relevant to their interests. 
                    If you feel as if these careers do not fit you, my oath as CareerBear, is to help until you feel confident in the choices I deliver!
                    </p>
                    </div>

                    <div className = "transition-intro">
                      <h5>Moving Forward</h5>
                      <p>
                       Now, without further ado, please check out your Career Files! Each tab will give you a peek into each career meant for you...
                      </p>
                    </div>

                    <div>
                      <img src = {signature} width="354" height="250" alt="CareerBear signature"/>
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
        </Tab>

        <Tab className = "personality-tab" eventKey={"tab5"} title = {<span className = 'tab-name'>Personality</span>}>
        <h2 className = 'personality-header'>Your personality</h2>
          <p className='personality-header-content'>The following is a list of your personality traits, along with how I chose them!</p>
          <PersonalityView personalityData={quizData?.basicQuizResults?.personalityTraits} />
        </Tab>


        {tabs}
        </Tabs>

        {
          key !== "tab4" && (
            <div className="career-bear-sticker-container">
              <span className = 'text-for-careerbear'>
                  {careerBearMessage}
              </span>

              <img src = {fitz} alt = "happy fitz boy" />                                 
            </div>
          )
        }
        

      </div>

    )
}