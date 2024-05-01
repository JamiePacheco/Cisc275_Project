export interface Question {
    name: string;
    questionNumber: number;
    options: string[];
    answer: string;
}


export function generatePlaceholders(a:number): Question { 
    const uniqueNames = [
        "What aspect of work excites you the most?",
        "When you envision your future career– where are you?",
        "For your job, would you prefer physical labor, mental labor, or a mix of both?",
        "What kinds of environments do you thrive in professionally?",
        "What kind of tasks do you find most fulfilling?",
        "What kind of work environment do you envision for yourself?",
        "Which of the following career paths aligns best with your long-term goals?",
        "I am a…"
    ];
    const uniqueQuestions = [
        ["Creativity and innovation", 
        "Helping and supporting others", 
        "Analyzing data and solving complex problems"],

        ["I am in my personal at home office", 
        "I am working in an office at my job location with a team of colleagues",
         "I travel often for work– so anywhere they need me!"],

        ["Physical: I like to get my hands dirty and work with things directly.",
        "Mental: I enjoy solving problems, working at a task where I need to utilize mental skills.",
        "Both: I enjoy manual labor and jobs that require me to think!"],

        ["Dynamic, fast paced environments", 
        "Supportive and nurturing", 
        "Structured and methodical"],

        ["Creating something new from scratch", 
        "Working with people (clients, general public, etc) and assisting them with issues", 
        "Organizing and optimizing processes"],

        ["A fast-paced startup or an entrepreneurial setting",
        "A well established and reputable organization", 
        "A dynamic and collaborative team-based environment"],

        ["Pursuing opportunities for leadership and management roles", 
        "Specializing in a specific field or area of expertise", 
        "Contributing to meaningful social or environmental causes"],

        ["Technical person: I love computers and technology",
        "Health person: People can always rely on me for health advice, the latest health trends, and workout routines",
        "People person: I enjoy socializing and working with others.",
        "Logical person: I enjoy coming up with new ideas and solutions to real world problems",
        "Creative person: I enjoy making art, coming up with ideas, and am comfortable with ambiguity.",
        "Adventurous person: I seek excitement and challenge in my work, I am open to exploring opportunities and experiences.",
        "Compassionate person: I am driven by a desire to help others and make a positive impact on the world around me."]
    ];
    return {
        name: uniqueNames[a -1],
        questionNumber: a,
        options: uniqueQuestions[a - 1],
        answer: ""
    };
}

export const placeholders: Question[] = [
    generatePlaceholders(1),
    generatePlaceholders(2),
    generatePlaceholders(3),
    generatePlaceholders(4),
    generatePlaceholders(5),
    generatePlaceholders(6),
    generatePlaceholders(7),
    generatePlaceholders(8)
];