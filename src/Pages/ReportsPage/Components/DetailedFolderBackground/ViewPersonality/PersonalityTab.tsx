// import careerbearimage from "../../../../assets/career-bear/fitzandcareerbear.png"
import { PersonalityTrait } from "../../../../../Interfaces/Results/PersonalityTrait"
import "./PersonalityTab.css"
// import bearimage from "../../../../assets/career-bear/neutral_career_bear.png"

export function PersonalityTab({personalityData} : {personalityData : PersonalityTrait[] | undefined}) : React.JSX.Element {

    const mappedPersonalityData = personalityData === undefined ? "No Data :(" : personalityData.map((per : PersonalityTrait) => {
        return (
            <div className = "personality-tab--content"> 
                <h5 className = 'personality-header-content'> {per.trait}  </h5>
                <p className = 'personality-text-explaination'> {per.traitDescription} </p>
                <p className = 'personality-logic-test'> {per.traitLogic} </p>
            </div> 
        )
    })

    return (
        // <div>
            <div className = "personality-tab-container">
                 <div className="personality-tab-container-content">
                    <div className = "personality-row">
                        {mappedPersonalityData}
                    </div>
                </div>
            </div>
        // </div>
        
        
    )
}