import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Question, placeholders } from "../Interfaces/QuestionInterface";
import { Form } from "react-bootstrap";
import { QuizInteraction } from "../QuizInteraction/QuizInteraction";

export function GeneralQuestions(): JSX.Element {
  const [choice, setChoice] = useState<string>(""); // for the radio buttons
  const [answers, setAnswers] = useState<Record<number, string>>({}); // answers is a record of chosen answers used for calculating the progress bar.
  const [index, setIndex] = useState<number>(0); // index in the list of placeholder questions
  const question : Question = placeholders[index];
  const totalQuestions = placeholders.length;


  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers: Record<number, string> = Object.assign({}, answers);
    newAnswers[question.questionNumber] = event.target.value;
    question.answer = event.target.value;
    setAnswers(newAnswers);
    setChoice(question.answer);
  };

  useEffect(() => {
    //this will check if an answer is already stored when the index changes.
    const savedAnswer = answers[question.questionNumber];
    if (savedAnswer) {
      setChoice(savedAnswer);
    } else {
      setChoice(""); // reset choice
    }

  }, [index, answers, question.questionNumber]);


  return (
    <div className="question-component--content">
      <div className="progress-bar-bootstrap">
        <ProgressBar now={(Object.keys(answers).length * 100) / totalQuestions} />
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
            label={options}
            value={`${question.questionNumber}-${options}`}
            checked={choice === `${question.questionNumber}-${options}`}
          />
        ))}
        </div>
          <QuizInteraction 
              setIndex={setIndex} 
              index={index}
              isProgressBarFull={Object.keys(answers).length === totalQuestions}
          />
      </div>
  );
}