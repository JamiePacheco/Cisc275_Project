import theCareerBear from "../../assets/career-bear/the-career-bear.jpg"

import "./AboutPage.css"

export function AboutPage() : React.JSX.Element {

    return (
        <div className = "about-page">
            <div className = "about-page--content">
                
                <div className = "text-content">
                    <img src = {theCareerBear} alt = "the-career-bear"/> 

                    <p>
                        "Shawty asked if I was drippy, I said William, that way she knew I had fitz..." - Unknown
                    </p>

                </div>


            </div>
        </div>
    )

}