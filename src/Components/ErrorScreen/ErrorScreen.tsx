import "./ErrorScreen.css"

import confusedFitz from "../../assets/career-intern/confused-intern.png"
import { ErrorScreenProps } from "./ErrorScreenProps"

//screen to use when data error or something of the sorts occurs
export function ErrorScreen({message} : ErrorScreenProps) : React.JSX.Element {

    return (
        <div className = "ErrorScreen">
            <div className = "ErrorScreenContent">
                <img className = "ConfusedFitz" src = {confusedFitz} alt = "confused-fitz"/> 
                {
                    !message && <h1> Fitz can't seem to find your data... </h1>
                }
                {
                    message && <h1> {message} </h1>
                }
            </div>
        </div>        
    )

}