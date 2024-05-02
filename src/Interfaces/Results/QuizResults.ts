import { CareerSuggestion } from "./CareerSuggestion";
import { PersonalityTrait } from "./PersonalityTrait";

export interface QuizResults {
    personalityTraits : PersonalityTrait[];
    careerSuggestions : CareerSuggestion[];
}