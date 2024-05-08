import React, { useState } from "react";
import "./QuizInteraction.css";
import { IndexState } from "./QuestionIndexProp";

export function QuizInteraction({ setIndex, index, isProgressBarFull, length, setIsVisible, setReviewIsVisible }: IndexState): JSX.Element {
  const handleClick = (value: boolean) => {
    setIndex(value && index < 7 ? index + 1: !value && index > 0 ? index -1 : index );
  }

  const handleReviewClick = () => {
    setIsVisible(false); 
    setReviewIsVisible(true);
  };

  return (
    <div className="buttons">
      <button className="previous-button" onClick={() => handleClick(false)} disabled={index === 0}>
        Previous
      </button>
      {isProgressBarFull && ( //sets widgets to invisible on click
        <button className="review-button" onClick={handleReviewClick}> 
          Review Answers
        </button>
      )}
      <button className="next-button" onClick={() => handleClick(true)} disabled={index === length-1}>
        Next
      </button>
    </div>
  );
}