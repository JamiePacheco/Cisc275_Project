export type QuestionType = "short" | "radio";
export interface Question {
    name: string;
    questionNumber: number;
    type: QuestionType;
    options: string[];
    answer: number;
    body: string;
}


export function generatePlaceholders(type: QuestionType): Question { 
    return {name:"Lorem ipsum dolor sit amet", questionNumber:1, type: type, options:["one", "two", "three"], answer: -1, body:"consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."};
}

export const placeholders: Question[] = [
    generatePlaceholders("short"),
    generatePlaceholders("radio"),
    generatePlaceholders("short"),
    generatePlaceholders("radio"),
    generatePlaceholders("radio"),
    generatePlaceholders("radio"),
    generatePlaceholders("radio")];