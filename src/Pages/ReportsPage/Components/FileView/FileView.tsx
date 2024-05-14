import React from "react";
import './FileView.css'
import { CareerSuggestion } from "../../../../Interfaces/Results/CareerSuggestion";

export function FileView({data} : {data : CareerSuggestion}) : React.JSX.Element {
    return (
        <div className = 'career-tab-containers'>
            <h1> {data.career} </h1>

            <span> {data.careerDescription} </span>
        </div>
    )
}