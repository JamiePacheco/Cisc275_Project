import React, { useState } from 'react';
import {ReportsHeader} from '../ReportsHeader/ReportsHeader'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './FolderBackground.css';
import { DetailedQuiz } from '../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz';
import { FileView } from '../FileView/FileView';
import signature from '../../../../assets/logos/signature.png'
import { PersonalityTab } from '../ViewPersonality/PersonalityTab';


export function FolderBackground({quizData} : {quizData : DetailedQuiz | null}): JSX.Element {
  const [key, setKey] = useState('tab4');

  const tabs = quizData?.results?.careerSuggestions.map((career, i) => {
    return (
      <Tab eventKey={`tab${i + 1}`}  title={career.career}>
        <FileView data={career}></FileView>
      </Tab>
    )})
 
  
  
  return (
    <div className="manilla-folder">
      <ReportsHeader></ReportsHeader>
      <Tabs
        id="manilla-folder"
        activeKey={key}
        onSelect={(k) => setKey(k as string)}
      >
        {/* content for overview tab */}
         <Tab eventKey="tab4" title="Overview">
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
                I, CareerBear, found you to be <span style = {{"fontWeight" : "bold"}}>{quizData?.results?.personalityTraits.map(trait => trait.trait).slice(0, -1).join(', ') + ', and ' + quizData?.results?.personalityTraits.map(trait => trait.trait).pop()}</span>.
                In the next section of the CarrerFile, we'll go into depth on these traits, and how they factored into the careers selected for you.
                </p>
                </div>

                <div className = "careerintro-careers">
                <h5>Your Careers</h5>
                <p>After close examination of your results, the careers that I found to most fit you are the following: <span style = {{"fontWeight" : "bold"}}>{quizData?.results?.careerSuggestions.map(career => career.career).slice(0, -1).join(', ') + ', and ' + quizData?.results?.careerSuggestions.map(career =>career.career).pop()} </span>. We will further go into detail about these further in your file!</p>
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
        
        <Tab eventKey={"tab5"} title="Personality">
          <h3>Your personality</h3>
          <PersonalityTab personalityData={quizData?.results?.personalityTraits}  />
        </Tab>

        {tabs}
      </Tabs>
    </div>
  );
}