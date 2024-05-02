import "./GeneralQuestionWidget.css";
import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Question } from "../../../../Interfaces/BasicQuestionInterfaces/QuestionInterface";
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { Form } from "react-bootstrap";
import { QuizInteraction } from "../QuizInteraction/QuizInteraction";
import { quizObjects } from "./QuestionFunctions";

export function GeneralQuestions(): JSX.Element { 
  /**
   * this is where the majority of the logic for the component is. may be subject to change in the future. 
   * 
   */
  const [choice, setChoice] = useState<string>(""); // for the radio buttons
  const [index, setIndex] = useState<number>(0); // index in the list of placeholder questions
  const [quiz, setQuiz] = useState<BasicQuiz>(() => quizObjects());

  const question: Question = quiz.questionList[index];
  const totalQuestions = quiz.questionList.length;

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (question.answer !== event.target.value) {
      const newQuestion: Question = {
        ...question,
        options: [...question.options],
        answer: event.target.value,
      };
      const newQuizList = quiz.questionList.map(
        (question: Question): Question => ({
          ...question,
          options: [...question.options],
        })
      );
      newQuizList.splice(newQuestion.questionNumber - 1, 1, newQuestion);
      const newQuiz: BasicQuiz = { ...quiz, questionList: newQuizList, numAnswered: quiz.numAnswered+1 };
      setQuiz(newQuiz);
    }

    setChoice(event.target.value);
  };

  useEffect(() => {
    //this will check if an answer is already stored when the index changes.
    const savedAnswer = question.answer;
    if (savedAnswer) {
      setChoice(savedAnswer);
    } else {
      setChoice(""); // reset choice
    }
  }, [index, question.answer]);

  return (
    <div className="question-component--content">
      <div className="progress-bar-bootstrap">
        <ProgressBar now={quiz.numAnswered * 100 / totalQuestions} />
      </div>
      <h1 className="question--heading">
        {question.questionNumber}.<span> {question.name}</span>
      </h1>
      <div className="question--choices">
        {question.options.map((options: string) => (
          <Form.Check
            key={`${question.questionNumber}-${options}`}
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
        isProgressBarFull={quiz.numAnswered === totalQuestions}
        length={quiz.questionList.length}
      />
    </div>
  );
}
