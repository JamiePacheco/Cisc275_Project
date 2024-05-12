import { CareerFieldSuggestion } from "./CareerFieldSuggestion";
import { PersonalityTrait } from "./PersonalityTrait";

export interface BasicQuizResults {
    basicQuizResults?: number;
    personalityTraits: PersonalityTrait[]
    careerFieldSuggestions : CareerFieldSuggestion[],
}