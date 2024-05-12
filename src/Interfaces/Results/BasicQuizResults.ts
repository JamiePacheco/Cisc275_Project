import { CareerFieldSuggestion } from "./CareerFieldSuggestion";
import { PersonalityTrait } from "./PersonalityTrait";

export interface BasicQuizResults {
    personalityTraits: PersonalityTrait[]
    careerFieldSuggestions : CareerFieldSuggestion[],
}