import React from 'react';
import { useNavigate } from "react-router-dom"

export function ReportsHeader() : JSX.Element {
    const nav = useNavigate();
    return(
    <div className='header-report-page'>
        <h1>Reports Page</h1>
        <p>Placeholder for Reports Body</p>
        <button onClick = {() => nav("/home")}> Home </button>
    </div>
    )
};