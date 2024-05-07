import "./QuizInteraction.css";
import { IndexState } from "./QuestionIndexProp";

export function QuizInteraction({ setIndex, index, isProgressBarFull, length}: IndexState): JSX.Element {
  const handleClick = (value: boolean) => {
    setIndex(value && index < 7 ? index + 1: !value && index > 0 ? index -1 : index );
  }

  return (
    <div className="buttons">
      <button className="previous-button" onClick={() => handleClick(false)} disabled={index === 0}>
        Previous
      </button>
      {isProgressBarFull && ( //temporarily set as a browser alert until fully implemented 
        <button className="submit-button" onClick={() => alert('balls')}> 
          Review Answers
        </button>
      )}
      <button className="next-button" onClick={() => handleClick(true)} disabled={index === length-1}>
        Next
      </button>
    </div>
  );
}