import { useEffect, useState } from "react";
import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { DetailedQuiz } from "../../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { User } from "../../../../Interfaces/User/User";
import { BasicQuizDataCard } from "../QuizDataCard/BasicQuizCard";
import { QuizDataCard } from "../QuizDataCard/QuizDataCard";
import "./QuizDataDisplay.css"

export type quizType = "basic" | "detailed";

interface displayCard {
    quizType : quizType
    data: BasicQuiz | DetailedQuiz
}

const sortingTypes = ["default", "basic", "detailed", "date-descending", "date-ascending"]

export function QuizDataDisplay({quizData, basicData ,userData, loading} 
    : {quizData : DetailedQuiz[], basicData : BasicQuiz[] ,userData : User , loading: boolean}
) : React.JSX.Element {

    const [cardSorting, setCardSorting] = useState(0);

    const [cardData, setCardData] = useState<displayCard[]>([])

    useEffect(() => {

        const detailedCards = quizData.map((card) : displayCard => {
            return (
                {
                    quizType: "detailed",
                    data: card
                }
            )
        })

        const basicCards = basicData.map((card) : displayCard => {
            return (
                {
                    quizType: "basic",
                    data: card
                }
            )
        })

        let concatCards : displayCard[] = [...detailedCards, ...basicCards];

        const sortingType = sortingTypes[cardSorting % sortingTypes.length];

        if (sortingType === "basic") {
            concatCards = concatCards.filter((card) => card.quizType === "basic");
        }

        if (sortingType === "detailed") {
            concatCards = concatCards.filter((card) => card.quizType === "detailed");
        }


        setCardData(concatCards);
    }, [basicData, cardSorting, quizData, setCardData])

    //predicate to check if card is basic quiz 
    function isBasicQuiz(displayCard : BasicQuiz | DetailedQuiz): displayCard is BasicQuiz {
        return true;
    }

    //predicate to check if card is detailed quiz
    function isDetailedQuiz(displayCard : BasicQuiz | DetailedQuiz): displayCard is DetailedQuiz {
        return true;
    }

    return (
        <div className="quiz-data-display">
            
            <div className = "quiz-data-display--header">
                <h4 className = "quiz-data--heading"> Quiz History </h4>
                <div> 
                    <button onClick={() => setCardSorting(prev => prev + 1)}> Sort { cardSorting % sortingTypes.length !== 0 && `(${sortingTypes[cardSorting % sortingTypes.length]})`} </button>
                </div>
            </div>

            {
                cardData.map((displayCard) => {
                    if (displayCard.quizType === "basic" && isBasicQuiz(displayCard.data)) {
                        return <BasicQuizDataCard basicQuizData={displayCard.data} userData={userData}/>
                    } else if (displayCard.quizType === "detailed" && isDetailedQuiz(displayCard.data)) {
                        return <QuizDataCard detailedQuizData={displayCard.data} userData={userData} />
                    }
                    return null
                })
            }


        </div>
    )
}