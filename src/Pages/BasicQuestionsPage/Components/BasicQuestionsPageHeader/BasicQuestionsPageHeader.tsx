import { useEffect, useState } from 'react';
import './BasicQuestionsPageHeader.css';
import { User } from '../../../../Interfaces/User/User';

  export function BasicQuestionsPageHeader({user} : {user : User | undefined}): JSX.Element {

    const [name, setName] = useState("N/A");

    useEffect(() => {
      if (user !== undefined) {
        setName(user.firstName + " " + user.lastName)
      }
    }, [name, user])


    return (
        <div className='main-header'>
            <div className ='basic-questions-page-header'>
              <h1 className='main-header'>Career Exam</h1>
              <p>Carefully think about each answer, and no cheating!</p>
              <p style = {{fontSize: "12px"}}> Any inquirys may be satisfied by poking the bear </p>
            </div>
            <div className = "quiz-details">
              <p><strong>Date</strong> : {new Date().toISOString().split("T")[0].replaceAll("-", "/")} </p>
              <p><strong>Proctor</strong>  : Fitz William </p>
              <p><strong>Examinee</strong> : {name}  </p>
            </div>
        </div>
     
    )
}