import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Question, placeholders } from "../interface";
import { Form } from "react-bootstrap";

export function GeneralQuestions(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [choice, setChoice] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);

  const currQuestion: Question = placeholders[index]; //current question

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(
      answers.find((a: number): boolean => currQuestion.questionNumber === a)
        ? answers
        : [...answers, currQuestion.questionNumber]
    );
    setChoice(event.target.value);
    setTimeout(() => {
      setIndex(index < 6 ? index + 1 : index);
      setChoice(index + 1 < 7 ? "" : event.target.value);
    }, 300);
  };

  return (
    <div className="question-header">
      <div className="progress-bar-bootstrap">
        <ProgressBar now={(answers.length * 100) / 7}/>
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
