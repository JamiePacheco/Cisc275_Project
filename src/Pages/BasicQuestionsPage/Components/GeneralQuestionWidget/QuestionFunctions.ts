import { BasicQuiz } from "../../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { Question } from "../../../../Interfaces/BasicQuestionInterfaces/QuestionInterface";
import { User } from "../../../../Interfaces/User/User";
import { QUESTION_DATA } from "../../BasicQuestionData";

export function generateQuestions(a: number, questionNumber: number): Question {
  const uniqueNames = [
    "What aspect of work excites you the most?",
    "When you envision your future career– where are you?",
    "For your job, would you prefer physical labor, mental labor, or a mix of both?",
    "What kinds of environments do you thrive in professionally?",
    "What kind of tasks do you find most fulfilling?",
    "What kind of work environment do you envision for yourself?",
    "Which of the following career paths aligns best with your long-term goals?",
    "I am a…",
  ];
  const uniqueQuestions = [
    [
      "Creativity and innovation",
      "Helping and supporting others",
      "Analyzing data and solving complex problems",
    ],

    [
      "I am in my personal at home office",
      "I am working in an office at my job location with a team of colleagues",
      "I travel often for work– so anywhere they need me!",
    ],

    [
      "Physical: I like to get my hands dirty and work with things directly.",
      "Mental: I enjoy solving problems, working at a task where I need to utilize mental skills.",
      "Both: I enjoy manual labor and jobs that require me to think!",
    ],

    [
      "Dynamic, fast paced environments",
      "Supportive and nurturing",
      "Structured and methodical",
    ],

    [
      "Creating something new from scratch",
      "Working with people (clients, general public, etc) and assisting them with issues",
      "Organizing and optimizing processes",
    ],

    [
      "A fast-paced startup or an entrepreneurial setting",
      "A well established and reputable organization",
      "A dynamic and collaborative team-based environment",
    ],

    [
      "Pursuing opportunities for leadership and management roles",
      "Specializing in a specific field or area of expertise",
      "Contributing to meaningful social or environmental causes",
    ],

    [
      "Technical person: I love computers and technology",
      "Health person: People can always rely on me for health advice, the latest health trends, and workout routines",
      "People person: I enjoy socializing and working with others.",
      "Logical person: I enjoy coming up with new ideas and solutions to real world problems",
      "Creative person: I enjoy making art, coming up with ideas, and am comfortable with ambiguity.",
      "Adventurous person: I seek excitement and challenge in my work, I am open to exploring opportunities and experiences.",
      "Compassionate person: I am driven by a desire to help others and make a positive impact on the world around me.",
    ],
  ];
  return {
    name: uniqueNames[a],
    questionNumber: questionNumber, 
    options: uniqueQuestions[a],
    answer: ""
  };
}

// export function shuffleQuestions(array: Question[]): Question[] {
//   let n: number = array.length - 1;
//   const currentArray: Question[] = array.map((question: Question) => ({
//     ...question,
//     options: [...question.options],
//   }));
//   let j: number;
//   while (n > 0) {
//     j = Math.random() * (n + 1);
//     currentArray.splice(n, 1, ...currentArray.splice(j, 1, currentArray[n]));
//     n = n - 1;
//   }
//   return currentArray;
// }

export function shuffleNumbers(array: number[]): number[] {
  let n: number = array.length - 1;
  const currentArray:number[] = [...array];
  let j: number;
  while (n > 0) {
    j = Math.random() * (n + 1);
    currentArray.splice(n, 1, ...currentArray.splice(j, 1, currentArray[n]));
    n = n - 1;
  }
  return currentArray;
}


export function range(len:number){
  return Array.from(Array(len).keys());
}

export function getCurrentUser() : User | undefined {
  
  const savedUser = sessionStorage.getItem("CURRENT_USER");

  if (savedUser === null) {
    return undefined;
  }

  return JSON.parse(savedUser);
}

export function quizObjects(): BasicQuiz {
  const totalQuestions = 8;
  const questions: Question[] = range(totalQuestions).map(index => generateQuestions(index, index + 1));
  let shuffledIndices = shuffleNumbers(range(totalQuestions));
  let shuffledQuestions = shuffledIndices.map((shuffledIndex, index) => ({
    ...questions[shuffledIndex],
    questionNumber: index + 1  
  }));

  shuffledQuestions = [...shuffledQuestions, 
    {
      name : "Do you like bears?",
      questionNumber : totalQuestions + 1,
      options : ["Bear-y much", "Yes", "Meh", "Not Really", "I hate them"],
      answer: ""
    }
  ]

  shuffledIndices = [...shuffledIndices, 9]

  return {
    dateTaken : new Date().toISOString(),
    questionList: shuffledQuestions,
    numAnswered: 0,
    displayOrder: shuffledIndices,
    currentQuestion: 1,
    user : getCurrentUser()
  };
}

export function generateBasicQuiz(length? : number) {

  if (length === undefined) {
    length = 7;
  }

  const questionPool = [...QUESTION_DATA.questions]

  const quizQuestions : Question[] = [];
  
  //first for loop I have wrote in this class... YIPPIE!!!!
  for (let i : number = 0; i <= length; i++) {
    //gets a random question from pool of questions and removes from pool array
    const selectedQuestion = questionPool.splice(Math.floor(Math.random() * questionPool.length) - 1, 1)[0];
    
    //sets the i-th question to the random question
    quizQuestions[i] = {
      name : selectedQuestion.name,
      questionNumber : i + 1,
      options : selectedQuestion.options,
      answer : ""
    }

    // if the pull of questions has been completely drained break from loop
    if (questionPool.length < 1) {
      break;
    }
  }

  //very crucial question that will always be the last one
  //CRUCIAL TO THE INTEGRITY OF THE QUIZ, WILL EXPLODE IF REMOVED!!!!!!
  const bearQuestion : Question = {
    name : "Do you like bears?",
    questionNumber : quizQuestions.length + 1,
    options : ["Bear-y much", "Yes", "Meh", "Not Really", "I hate them"],
    answer: ""
  }

  const generatedQuestions =  [...quizQuestions, bearQuestion]

  const generatedBasicQuiz : BasicQuiz = {
    dateTaken: new Date().toISOString(),
    questionList: generatedQuestions,
    numAnswered: 0,
    currentQuestion: 1,
    displayOrder: generatedQuestions.map((q) => q.questionNumber),
    user: getCurrentUser()
  }

  //return quiz questions
  return generatedBasicQuiz;
}