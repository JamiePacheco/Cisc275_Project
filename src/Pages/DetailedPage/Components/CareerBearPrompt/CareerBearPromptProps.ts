import { BearEmotion } from "../../DetailedPage";

export interface CareerBearPromptProps {
    message : string;
    bearEmotion : BearEmotion;
    bearClickHandler : () => void;
}