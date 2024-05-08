import "./GeneralQuestionWidget.css";
import { ProgressBar, Form } from "react-bootstrap";
import { useState } from "react";
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { QuizInteraction } from "../QuizInteraction/QuizInteraction";

interface GeneralQuestionsProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  setReviewIsVisible: (reviewIsVisible: boolean) => void;
  quiz: BasicQuiz;
  displayOrder: number[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
}

export function GeneralQuestions({ isVisible, setIsVisible, setReviewIsVisible, quiz, displayOrder, answers, setAnswers }: GeneralQuestionsProps): JSX.Element | null {
  const [index, setIndex] = useState<number>(0);

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const newAnswer = event.target.value;
    const newAnswers = [...answers];
    newAnswers[displayOrder[questionIndex]] = newAnswer; //map answer to original question index using displayOrder
    setAnswers(newAnswers);

    console.log("Answers after update:", newAnswers);  //debug test

  };

  if (!isVisible) {
    return null; //do not render the component if not visible
  }

  return (
    <div className="question-component--content">
      <div className="progress-bar-bootstrap">
        <ProgressBar now={(answers.filter(ans => ans !== "").length / quiz.questionList.length) * 100} />
      </div>
      <h1 className="question--heading">
        {quiz.questionList[index].questionNumber}. {quiz.questionList[index].name}
      </h1>
      <div className="question--choices">
        {quiz.questionList[index].options.map((option, optionIndex) => (
          <Form.Check
              key={optionIndex}
              type="radio"
              name={`question-${index}`}
              id={`option-${index}-${optionIndex}`}
              label={option}
              value={option}
              checked={answers[displayOrder[index]] === option} //checks if the answer at the position of this question in displayOrder matches this option
              onChange={(e) => updateValues(e, index)}
          />
        ))}
      </div>
      <QuizInteraction
        setIndex={setIndex}
        index={index}
        isProgressBarFull={answers.every(ans => ans !== "")}
        length={quiz.questionList.length}
        setIsVisible={setIsVisible}
        setReviewIsVisible={setReviewIsVisible}
      />
    </div>
  );
}