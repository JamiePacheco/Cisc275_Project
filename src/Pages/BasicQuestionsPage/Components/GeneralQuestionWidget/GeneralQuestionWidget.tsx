import "./GeneralQuestionWidget.css";
import { ProgressBar, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
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
  startingIndex: number,
  setQuiz : React.Dispatch<React.SetStateAction<BasicQuiz>>
}

export function GeneralQuestions({ isVisible, setIsVisible, setReviewIsVisible, quiz, displayOrder, answers, setAnswers, startingIndex, setQuiz}: GeneralQuestionsProps): JSX.Element | null {
  const [index, setIndex] = useState<number>(startingIndex);

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const newAnswer = event.target.value;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswer; //map answer to original question index using displayOrder
    console.log("question: " + questionIndex);
    setAnswers(newAnswers);

    console.log("Answers after update:", newAnswers);  //debug test

    const newQuestions = quiz.questionList;
    newQuestions[index].answer = newAnswer;
    setQuiz(
      {
        ...quiz,
        questionList:  newQuestions
      }
    )

  };

  useEffect(() => {
    setIndex(startingIndex)
  }, [startingIndex])

  if (!isVisible) {
    return null; //do not render the component if not visible
  }

  return (
    <div className="question-component--content">
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
              checked={answers[index] === option} // Checks if the answer at the position of this question in displayOrder matches this option
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
      <div className="progress-bar-bootstrap">
        <ProgressBar now={(answers.filter(ans => ans !== "").length / quiz.questionList.length) * 100} className="custom-progress-bar" color="#6c4c41"/>
      </div>
    </div>
  );
}