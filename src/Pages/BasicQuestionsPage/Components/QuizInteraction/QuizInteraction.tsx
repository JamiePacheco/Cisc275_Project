import "./QuizInteraction.css";
import { IndexState } from "./QuestionIndexProp";

export function QuizInteraction({ setIndex, index }: IndexState): JSX.Element {
  return (
    <div className="buttons">
      <button className="previous-button" onClick={() => index > 0? setIndex(index - 1): null}>
        Previous
      </button>
      <button className="next-button" onClick={() => index < 6 ? setIndex(index + 1): null}>
        Next
      </button>
    </div>
  );
}
