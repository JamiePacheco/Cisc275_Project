export interface Question {
    name: string;
    questionNumber: number;
    options: string[];
    answer: number;
}


export function generatePlaceholders(a:number): Question { 
    return {name:"Lorem ipsum dolor sit amet", questionNumber:a , options:["one", "two", "three", "five"], answer: -1};
}

export const placeholders: Question[] = [
    generatePlaceholders(1),
    generatePlaceholders(2),
    generatePlaceholders(3),
    generatePlaceholders(4),
    generatePlaceholders(5),
    generatePlaceholders(6),
    generatePlaceholders(7)
];