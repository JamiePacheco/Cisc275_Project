import "./QuizInteraction.css";
import { IndexState } from "../../QuestionIndexInterface";

export function QuizInteraction({ setIndex, index }: IndexState): JSX.Element {
  return (
    <div className="buttons">
      <button className="previous-button" onClick={() => setIndex(index - 1)}>
        Previous
      </button>
      <button className="next-button" onClick={() => setIndex(index + 1)}>
        Next
      </button>
    </div>
  );
}
