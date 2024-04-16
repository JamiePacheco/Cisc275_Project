import { useNavigate } from "react-router-dom"
import "./AppHeader.css"


export function AppHeader() : React.JSX.Element {

    const nav = useNavigate()

    return (
        <header className="App-header">
          <h1 className = "app-header--heading"  onClick={() => {nav("/")}}> Helpi </h1>
        </header>
    )
}