import './GeneralQuestionWidget.css';
import { ProgressBar } from 'react-bootstrap'; 
import { useState } from 'react';

export function GeneralQuestions() : JSX.Element {
    const [ complete, setComplete] = useState<number>(0);

    const updateValues = (choice: number) => {
        setComplete(complete + 1);
    }


    return (
        <div className='question-header'>
            <div className='progress-bar-bootstrap'>
                <ProgressBar now={complete * 100 / 7} label={complete * 100 / 7}/>
            </div>

            <h1 className='question--heading'>Question 1:</h1>
            <div className='question--choices'>
                <div className='choice'>
                    <input type="radio" name="option" value="A" id="choiceA" />
                    <label htmlFor="choiceA">A.  This is question text</label>
                </div>
                <div className='choice'>
                    <input type="radio" name="option" value="B" id="choiceB" /> 
                    <label htmlFor="choiceA">B.  This is question text</label>
                </div>
                <div className='choice'>
                    <input type="radio" name="option" value="C" id="choiceC" />
                    <label htmlFor="choiceA">C.  This is question text</label>
                </div>
                <div className='choice'>
                    <input type="radio" name="option" value="D" id="choiceD" />
                    <label htmlFor="choiceA">D.  This is question text</label>
                </div>
            </div>
        </div>
    );
}
