import React from "react";
import './CareerSuggestion.css'

import { CareerFieldSuggestion } from '../../../../../Interfaces/Results/CareerFieldSuggestion'

export function CareerSuggestionView({data} : {data : CareerFieldSuggestion}) : React.JSX.Element {
    return (
        <div className = 'career-tab-containers'>
            <h1> {data.careerField} </h1>
            <p>{data.careerFieldDescription}</p>
        </div>
    )
}