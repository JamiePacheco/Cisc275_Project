import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Question, placeholders } from "../BasicQuestionInterface";
import { Form } from "react-bootstrap";

export function GeneralQuestions({index}: { index:number}): JSX.Element { 
  const [choice, setChoice] = useState<string>(""); // for the radio buttons
  const [answers, setAnswers] = useState<Record<number, string>>({}); // answers is a record of chosen answers used for calculating the progress bar. 

  const currQuestion: Question = placeholders[index]; //current question

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers: Record<number, string> = Object.assign({}, answers)
    newAnswers[currQuestion.questionNumber] = choice;

    setAnswers(newAnswers);
    setChoice(event.target.value);
  };

  return (
    <div className="question-component--content">
      <div className="progress-bar-bootstrap"> 
        <ProgressBar now={(Object.keys(answers).length * 100) / 7}/>
      </div>
      <h1 className="question--heading">
        {placeholders[index].questionNumber}.<span> {currQuestion.name}</span>
      </h1>
      <div className="question--choices">
        {placeholders[index].options.map((options: string) => (
          <Form.Check
            type="radio"
            onChange={updateValues}
            id={`basic-${currQuestion.questionNumber}-${options}`}
            label={options.toUpperCase()}
            value={options}
            checked={choice === options}
          />
        ))}
      </div>
    </div>
  );
}
