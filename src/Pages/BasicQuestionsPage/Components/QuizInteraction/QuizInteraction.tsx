import "./QuizInteraction.css";
import { IndexState } from "./QuestionIndexProp";

export function QuizInteraction({ setIndex, index, restoreAnswer}: IndexState): JSX.Element {
  const handleClick = (value: boolean) => {
    setIndex(value && index < 6 ? index + 1: !value && index > 0 ? index -1 : index );
    restoreAnswer();
  }

  return (
    <div className="buttons">
      <button className="previous-button" onClick={() => handleClick(false)}>
        Previous
      </button>
      <button className="next-button" onClick={() =>handleClick(true)}>
        Next
      </button>
    </div>
  );
}
