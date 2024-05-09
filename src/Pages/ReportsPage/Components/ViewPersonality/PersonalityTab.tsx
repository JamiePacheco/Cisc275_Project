import { PersonalityTrait } from "../../../../Interfaces/Results/PersonalityTrait"
import "./PersonalityTab.css"

export function PersonalityTab({personalityData} : {personalityData : PersonalityTrait[] | undefined}) : React.JSX.Element {

    const mappedPersonalityData = personalityData === undefined ? "No Data :(" : personalityData.map((per : PersonalityTrait) => {
        return (
            <div className = "personality-tab--content"> 
                <h5> {per.trait}  </h5>
                
                <p> {per.traitDescription} </p>

                <p> {per.traitLogic} </p>
            </div>
        )
    })

    return (
        <div className = "personality-tab">
            <div className = "personality-tab--content">
                {mappedPersonalityData}
            </div>
        </div>
    )
}