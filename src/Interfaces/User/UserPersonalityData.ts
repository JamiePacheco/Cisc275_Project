import { CareerFieldSuggestion } from "../Results/CareerFieldSuggestion";
import { CareerSuggestion } from "../Results/CareerSuggestion";
import { PersonalityTrait } from "../Results/PersonalityTrait";

export interface UserPersonalityData {
    userTraits : PersonalityTrait[];
    userCareerFields : CareerFieldSuggestion[]
    userCareers : CareerSuggestion[];
}