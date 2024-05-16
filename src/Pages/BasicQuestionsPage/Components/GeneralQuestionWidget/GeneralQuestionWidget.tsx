import "./GeneralQuestionWidget.css";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { QuizInteraction } from "../QuizInteraction/QuizInteraction";
import { BasicQuestionsPageHeader } from "../BasicQuestionsPageHeader/BasicQuestionsPageHeader";

import { CareerProgressBear } from "../../../../Components/ProgressBar/ProgressBar";
import { User } from "../../../../Interfaces/User/User";

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
  setStarted : React.Dispatch<React.SetStateAction<boolean>>
}

export function GeneralQuestions({
    isVisible,
    setIsVisible,
    setReviewIsVisible, 
    quiz, 
    displayOrder, 
    answers, 
    setAnswers, 
    startingIndex, 
    setQuiz,
    setStarted
  }
   : GeneralQuestionsProps): JSX.Element | null {


  const [index, setIndex] = useState<number>(startingIndex);

  const [progress, setProgress] = useState<number>(answers.filter(ans => ans !== "").length);

  const [user, setUser] = useState<User | undefined>(undefined);

  const [onLanding, setOnLanding] = useState(true);

  useEffect(() => {
    if (onLanding) {
      window.scrollTo(0, 0)
      setOnLanding(false);
    }
  }, [onLanding])


  useEffect(() => {
    const prevProgress = progress;
    const currentProgress = answers.filter(ans => ans !== "").length;
    setProgress(currentProgress);
    if (prevProgress === 0 && prevProgress !== currentProgress) {
      setStarted(true);
    }
  }, [answers, progress, quiz, setStarted])

  useEffect(() => {

    const userData = sessionStorage.getItem("CURRENT_USER");

    if (userData !== null) {
      setUser(JSON.parse(userData));
    }

  }, [])


  useEffect(() => {
    setIndex(startingIndex)
  }, [startingIndex, isVisible])

  if (!isVisible) {
    return null; //do not render the component if not visible
  }

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    const newAnswer = event.target.value;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswer; //map answer to original question index using displayOrder
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

  return (
    <div className="question-component--content">
      <BasicQuestionsPageHeader user={user}/>
     
      <div className = "question--main-content">
        <span className="question--heading">
         <strong>Q{quiz.questionList[index].questionNumber}.</strong> {quiz.questionList[index].name}
        </span>
        <div className="question--choices">
          {quiz.questionList[index].options.map((option, optionIndex) => (
            <Form.Check
                className = "question--choices-radio"
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
      </div>
        {/* Custom progress bar that used sleeping career bear on top */}
      <CareerProgressBear 
        curr={progress} 
        total={quiz.questionList.length}
        mode="career"
      ></CareerProgressBear>
    </div>
  );
}