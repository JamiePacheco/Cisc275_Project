import "./RevealAnswersButton.css";
import { IndexState } from "../QuestionIndexProp";

export function RevealAnswers(): JSX.Element {

    return (
      <div className="buttons">
          <button className="reveal-answers-button" onClick={() => alert('Revealed')}>
            Reveal Answers
          </button>
      </div>
    );
  }
  