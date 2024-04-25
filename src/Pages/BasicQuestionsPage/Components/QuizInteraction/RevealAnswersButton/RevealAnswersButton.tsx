import "./RevealAnswersButton.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  
  