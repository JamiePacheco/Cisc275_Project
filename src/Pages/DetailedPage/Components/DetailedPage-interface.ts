export interface Question {
    name: string;
    questionNumber: number;
    options: string[];
    answer: number;
    body: string;
}


export function generatePlaceholders(): Question { 
    return {name:"Lorem ipsum dolor sit amet", questionNumber:1, options:["one", "two", "three"], answer: -1, body:"consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."};
}

export const placeholders: Question[] = [
    generatePlaceholders(),
    generatePlaceholders(),
    generatePlaceholders(),
    generatePlaceholders(),
    generatePlaceholders(),
    generatePlaceholders(),
    generatePlaceholders()
];