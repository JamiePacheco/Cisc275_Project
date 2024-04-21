import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Question } from "../Interfaces/BasicQuestionInterface";
import { Form } from "react-bootstrap";

export function GeneralQuestions({
  question,
}: {
  question: Question;
}): JSX.Element {
  const [choice, setChoice] = useState<string>(""); // for the radio buttons
  const [answers, setAnswers] = useState<Record<number, string>>({}); // answers is a record of chosen answers used for calculating the progress bar.

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers: Record<number, string> = Object.assign({}, answers);
    newAnswers[question.questionNumber] = choice;

    setAnswers(newAnswers);
    setChoice(event.target.value);
  };

  return (
    <div className="question-component--content">
      <div className="progress-bar-bootstrap">
        <ProgressBar now={(Object.keys(answers).length * 100) / 7} />
      </div>
      <h1 className="question--heading">
        {question.questionNumber}.<span> {question.name}</span>
      </h1>
      <div className="question--choices">
        {question.options.map((options: string) => (
          <Form.Check
            type="radio"
            onChange={updateValues}
            id={`basic-${question.questionNumber}-${options}`}
            label={options.toUpperCase()}
            value={options}
            checked={choice === options}
          />
        ))}
      </div>
    </div>
  );
}
