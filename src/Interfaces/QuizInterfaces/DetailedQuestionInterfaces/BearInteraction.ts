import { BearPrompt } from "./BearPrompt";
import { UserResponse } from "./UserResponse";

export interface BearInteraction {
    careerBearPrompt : BearPrompt;
    userResponse : UserResponse;
    position: number;
}