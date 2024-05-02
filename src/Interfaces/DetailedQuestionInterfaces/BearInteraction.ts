import { BearPrompt } from "../QuizInterfaces/BearPrompt";
import { UserResponse } from "../QuizInterfaces/UserResponse";

export interface BearInteraction {
    careerBearPrompt : BearPrompt;
    userResponse : UserResponse;
}