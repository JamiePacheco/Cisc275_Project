import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { placeholders } from "./DetailedPage-interface";
import "./QuestionAnswerComponent.css";

export function QuestionAnswer(): React.JSX.Element {

  return (
    <div className="question-component">
      <div className="question-component--content">
        <h1 id="question-number"> {`Question`}</h1>
        <div className = "detailed-quiz-content">
        </div>  
      </div>
    </div>
  );
}
