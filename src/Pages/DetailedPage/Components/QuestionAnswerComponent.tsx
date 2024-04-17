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
        <Form.Group>
          <Form.Label> {placeholders[q].body}</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </div>
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
  );
}
