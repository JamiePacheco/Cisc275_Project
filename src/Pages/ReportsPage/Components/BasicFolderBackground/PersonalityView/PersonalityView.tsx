import { PersonalityTrait } from '../../../../../Interfaces/Results/PersonalityTrait';
import "./PersonalityView.css"
// import BasicSticker from '../../../BasicCareerSticker/BasicCareerSticker'
import slushiBoy from "../../../../../assets/career-intern/fitzwithslushie.png"

export function PersonalityView({personalityData} : {personalityData : PersonalityTrait[] | undefined}) : JSX.Element {
    const mappedPersonalityData = personalityData === undefined ? "Data Not Found..." : personalityData.map((per : PersonalityTrait) => {
    return(
        <div className = "personality-tab--content"> 
        <h5 className = 'personality-header-content'> {per.trait}  </h5>
        <p className = 'personality-text-explaination'> {per.traitDescription} </p>
        <p className = 'personality-logic-test'> {per.traitLogic} </p>
    </div> 
        )
    })

    return (
        <div className = "personality-tab-container">
                 <div className="personality-tab-container-content">
                    <div className = "personality-row">
                        {mappedPersonalityData}
                        <div className = "personality-tab-content">
                            <img src = {slushiBoy} alt = "slushi boy"/>
                        </div>
                        <div className = 'career-bear-sticker-container-2'>


                            {/* <BasicSticker/> */}
                        </div>
                    </div>
                </div>
            </div>
    )
}