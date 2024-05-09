import React from "react";
import { CareerSuggestion } from "../../../../Interfaces/Results/CareerSuggestion";

export function FileView({data} : {data : CareerSuggestion}) : React.JSX.Element {
    return (
        <div>
            <h1> {data.career} </h1>

            <span> {data.careerDescription} </span>
        </div>
    )
}