import { useNavigate } from "react-router-dom"
import "./MembersPage.css"


//TODO Make this into a page where we can put about us stuff
export function MembersPage() : JSX.Element {

    const nav = useNavigate();

    return (
        <div className = "members-page">
            <div className = "members-page--content">
                <div>
                    <h1> Group Members </h1>
                    <ul style={{display:"inline"}}>
                        <li> Jamie Pacheco</li>
                        <li> Claudia Chance</li>
                        <li> Edwin </li>
                        <li> Nathan Wood </li>
                    </ul>
                </div>
                <div className = "members-page--page-links">
                    <h2> Pages </h2>
                    <div className = "page-buttons">
                        <button onClick = {() => nav("/home")}> Home </button> 
                        <button onClick = {() => nav("/reports")}> Reports </button>  
                        <button onClick = {() => nav("/home")}> Home </button> 
                        <button onClick = {() => nav("/sign-up")}> Sign Up </button>  
                        <button onClick = {() => nav("/short-quiz")}> Short Quiz</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}