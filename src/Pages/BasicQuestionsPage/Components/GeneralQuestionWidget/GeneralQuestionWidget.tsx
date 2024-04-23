import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Question, placeholders } from "../Interfaces/BasicQuestionInterface";
import { Form } from "react-bootstrap";
import { QuizInteraction } from "../QuizInteraction/QuizInteraction";

export function GeneralQuestions(): JSX.Element {
  const [choice, setChoice] = useState<string>(""); // for the radio buttons
  const [answers, setAnswers] = useState<Record<number, string>>({}); // answers is a record of chosen answers used for calculating the progress bar.
  const [index, setIndex] = useState<number>(0); // index in the list of placeholder questions

  const question : Question = placeholders[index];

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers: Record<number, string> = Object.assign({}, answers);
    newAnswers[question.questionNumber] = event.target.value;
    question.answer = event.target.value;
    setAnswers(newAnswers);
    setChoice(question.answer);
  };

  const restoreAnswer = () => { //attempt at restoring the answer will be used as a prop 
    setChoice(question.answer);
  }

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
            value={`${question.questionNumber}-${options}`}
            checked={choice === `${question.questionNumber}-${options}`}
          />
        ))}
      </div>
      <QuizInteraction setIndex = {setIndex} index = {index} restoreAnswer={restoreAnswer}/>
    </div>
  );
}
