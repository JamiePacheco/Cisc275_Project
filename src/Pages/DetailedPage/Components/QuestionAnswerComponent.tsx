import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { placeholders } from "./DetailedPage-interface";
import "./QuestionAnswerComponent.css";

export function QuestionAnswer(): React.JSX.Element {
  const [q, setQuestion] = useState<number>(0);

  return (
    <div className="question-component">
      <div className="question-component--content">
        <h1 id="question-number"> {`Question ${q + 1}`}</h1>
        <h3>{placeholders[q].name}</h3>
        {placeholders[q].type === "radio" ? (
          placeholders[q].options.map((question: string) => (
            <Form.Check
              type="radio"
              name="response"
              label={question}
              className="radio-buttons"
            />
          ))
        ) : (
          <Form.Group>
            <Form.Control />
          </Form.Group>
        )}
        <div className="buttons-navigation">
          <Button
            id="back-button"
            disabled={q === 0 ? true : false}
            onClick={() => setQuestion(q - 1)}
          >
            Previous
          </Button>
          <Button
            id="forward-button"
            disabled={q === 6 ? true : false}
            onClick={() => setQuestion(q + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
