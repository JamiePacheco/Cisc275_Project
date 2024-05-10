import "./ErrorScreen.css"

import confusedFitz from "../../assets/career-intern/confused-intern.png"
import { ErrorScreenProps } from "./ErrorScreenProps"

export function ErrorScreen({message} : ErrorScreenProps) : React.JSX.Element {

    return (
        <div className = "ErrorScreen">
            <div className = "ErrorScreenContent">
                <img className = "ConfusedFitz" src = {confusedFitz}/> 
                <h1> Fitz can't seem to find your data... </h1>
            </div>
        </div>        
    )

}