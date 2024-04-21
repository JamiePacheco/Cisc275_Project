import './GeneralQuestionWidget.css';

export function GeneralQuestions() : JSX.Element {
    return (
        <div className='question-header'>
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
