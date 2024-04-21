import { HomePageHeaderProps } from "./HomePageHeaderProperties"
import "./HomePageHeader.css"

export function HomePageHeader(home : HomePageHeaderProps ) : React.JSX.Element {

    return (
        <div className = "home-page-header">
            <h1 className = "home-page-header--heading"> Discover your future{home.loggedIn ? ", " + home.name : ""}.</h1>
            <h3 className = "home-page-header--sub-heading"> no one is gonna do it for you </h3>
        </div>
    )
}