import React from 'react'
import './ReportsPage'
import { ReportsHeader } from './Components/ReportsHeader/ReportsHeader'
// import { FolderBackground } from "./Components/Folder/Folder-Background"

export function ReportsPage() : JSX.Element{
    return(
        <div className="reports-page">
            <ReportsHeader></ReportsHeader>
        </div>
    )
};
