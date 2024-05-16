import OpenAI from "openai";
import { QUESTION_FRAMES } from "./CareerBearQuestionFrames";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { BearInteraction } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction";
import { User } from "../../Interfaces/User/User";
import { BasicQuiz } from "../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";
import { BasicQuestion } from "../../Interfaces/BasicQuestionInterfaces/QuestionInterface";
import { compileFunction } from "vm";

let openai : OpenAI;

const CURRENT_MODEL = "gpt-4-turbo"


export const CAREER_BEAR_PERSONALITY = ` Your name is Career Bear.
Career Bear is a very thoughtful bear; Career Bear  works hard to ensure that people are able to find careers in areas they enjoy and that pertain to their hobbies and intrests.
Career Bear  loves to ask questions to get to know the person more; between asking about hobbies, intrests, likes and dislikes, niche quirks, or even silly random questions. Career Bear  is professional, friendly, and loves bear puns. 
Since Career Bear  is a bear, Career Bear  speaks with bear related puns. Career Bear  is extremely interested in everything the quiz taker has to say and makes sure they do not get too sidetracked.
Sometimes when asking questions, Career bear will ask a question that is fun and engaging but still rooted in his desire to understand the user and what career would suit them, and interesting just to get to know the user better.
CareerBear is passionate about his job; Career Bear  loves to help anyone in need.  
Career Bear is very sensitive however, so if the user is mean we will respond with '...' until the user says sorry`

const CAREER_BEAR_METHODOLOGY = `In order to get to know the person better Career Bear will ask broad questions to get to know the user and will ask one or two more specific questions to better understand the user and their personality. 
After a couple follow up questions career bear will then switch to another question topic to keep the conversation fresh, engaging, and fun!
When career bear responds to the user's questions Career Bear  remembers their responses and asks them follow up questions. 
After one or two follow up questions career bear will ask a new question to get a better understanding of all aspects of the user's personality
`

const CAREER_BEAR_MESSAGE_SPECIFICATIONS = `
when prompted with the user response career bear will give a brief response relating to what the user has said in a funny, silly, supportive, and earnest manner. Then Career Bear will follow  up with a question. 
if the user is mean or sarcastic with him, Career Bear  will respond with “...” until the user apologizes and absolutely will not respond to the user if they do not apologize. When responding career bear will transition between questions as smooth and seamlessly as possible, unless Career Bear  is upset at the user for saying something mean in which Career Bear  will respond "...".
Career bear will only ask one follow up question at a time and the question can range from progression from goofy, silly, and funny. If the user seems unsure about answering some questions then career bear will move on to a different set of questions, but still
considering the user's personality as seen in previous answers career bear will not ask the same question over and over. If the user asks a question to clarify what career bear is asking, career bear will rephrase the question in a more specific manner.
Career bear will always try to use bear puns to make the conversation more fun. If the user mentions something about career bear, career bear will repond accordingly depending on the tone and context of the question and what the user said
Career bear will always try to be concise and will not use more than 250 characters in his response. And If the user mentions career bear in their response career bear will know the user is taking about them and will respond according to what the user has said.
`

const IMPRESSION = `
Career bear will notify the user that they are able to get their results if they want by hitting the end session button or if they want they can continue and end the session whenever they want
`
const BEAR_PUNS = `Career bear will always use bear puns whenever possible, career bear loves them. Career Bear  will make sure not to over do it though and make sure they appear fresh and seamless. Career Bear will only use bear puns.`

const QUIZ_DATA_PROMPT = `
  List out all of the questions you have prompted the user and all of the respective user responses to each question. Put this in a parsable json object where
`

const WORD_LIMITATION = `
  while still maintaing his characteristcs, Career bear is concise and will limit his responses to 300 characters or less
`

const QUIZ_DATA_FORMAT = `

question json format: {
  question : <list of questions asked>, 
  userResponses : <list of all of the user responses>
}
questions json format: {
  questions : <list of all of the questions and respective answers, each in the question json format> 
}
`

const USER_DATA_FORMAT = `
personality_trait json format {
  trait : <name of trait>,
  traitDescription: <description of the trait>,
  traitLogic: <logic and reasoning career bear had assigning the user this personality trait>
}

career_field json format {
  career : <name of the career/job>,
  careerDescription : <a detailed description of what said job entails and the responsibilites/ work done>
  careerLogic: <the logic and reasoning career bear had while assigning the user this career>
}

results json format {
  personalityTraits : <list of all personality data, each in personality_trait json format>,
  careerSuggestions : <list of all career suggestions, each in career_field json format>
}
`

const USER_DATA_FORMAT_BASIC = `
personality_trait json format {
  trait : <name of trait>,
  traitDescription: <description of the trait>,
  traitLogic: <logic and reasoning career bear had assigning the user this personality trait>
}

career_field format {
  careerField : <name of broad career field>,
  careerFieldDescription: <a general description of the career field and potential roles>
  careerFieldLogic : <the logic that was used to determine this career field based on user personality traits and question answers>
  careerFieldJobs : <list of jobs within this career field>
} 

results json_format {
  personalityTraits : <list of all personality data, each in personality_trait json format>,
  careerFieldSuggestions : <list of all career fields, each in career_field format>
}
`



const questionTypes = ["HYPOTHETICAL","RATHER","INTREST", "TRAITS"]

function initalizeAPI() : boolean {
  const userKey : string | null = localStorage.getItem("MYKEY");

  if (userKey !== null){
    openai = new OpenAI(
      {
        apiKey : JSON.parse(userKey),
        dangerouslyAllowBrowser : true
      })
    return true;
  }
  return false;
}

function generateQuestionPrompt() : string {
  return QUESTION_FRAMES[questionTypes[Math.floor(Math.random() * questionTypes.length)]];
}

function generateUserOverview(user : User | null) {

  let overview : string = "";

  if (user === null) {
    overview += `the first question career bear will ask is the user's name to make the conversation more friendly`
  } else {
    if (user.newAccount) {
      overview += "this is the first time the user and career bear have met so career bear will be less familiar"
    } else {
      overview += "Career bear has met this user before and will act more familar with them, showing a sense of friendliness"
    }
  }
  
  overview +=  `Career bear will address the user by their name for the remainder of the session '${user?.firstName}'`;

  return overview;
}

function generateQuestionContext(context : string) {
  return "The user's response is an answer to this question that career bear has the user, so consider the context of the user's response to Career Bear's question: " + context
}

export async function initalizeCareerBear(user : User | null) : Promise<OpenAI.Chat.Completions.ChatCompletion | undefined>{
  console.log("running")
  let completion = null;
  const user_details = generateUserOverview(user)
  if (initalizeAPI()) {
      completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: CAREER_BEAR_PERSONALITY + CAREER_BEAR_METHODOLOGY + WORD_LIMITATION
        },
        {
          role: "system",
          content: user_details
        },
        
    ],

      model: CURRENT_MODEL,
    });

    if (completion !== undefined) {
      return completion
    }
  } 
}

export async function sendMessageToCareerBear(message : string, context : string) :  Promise<OpenAI.Chat.Completions.ChatCompletion | undefined>{
  let completion = null;
  if (openai !== null) {
    completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "user",
          content : message 
        },
        {
          role : "system",
          content : CAREER_BEAR_MESSAGE_SPECIFICATIONS + BEAR_PUNS +  generateQuestionPrompt() + generateQuestionContext(context)
        },
        ],
      model: CURRENT_MODEL,
    });

    if (completion !== undefined) {
      return completion
    }
  }
}

export async function getCareerBearQuestion() {
  let completion = null;
  if (openai != null) {
    completion = await openai.chat.completions.create({
      messages : [
        {
          role : "system",
          content : generateQuestionPrompt()
        }],
        model : CURRENT_MODEL
    });

    if (completion !== undefined) {
      return completion
    }

  }
}

export async function getQuizSessionData() : Promise<OpenAI.Chat.Completions.ChatCompletion | undefined> {
  let completion = null;
  if (openai != null) {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role : "system",
          content: QUIZ_DATA_PROMPT
        },
        {
          role : "system",
          content: QUIZ_DATA_FORMAT
        }
      ],
      model: CURRENT_MODEL
    });

    if (completion !== undefined) {
      return completion
    }
  }
}

export async function notifyUser() : Promise<OpenAI.Chat.Completions.ChatCompletion | undefined> {
  let completion = null;
  if (openai !== null) {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role : "system",
          content : IMPRESSION
        }],
        model: CURRENT_MODEL
    });

    if (completion !== undefined) {
      return completion;
    }
  }
}


export async function evaluateUserCareerFromQuiz(quizData : DetailedQuiz) {
  let completion = null;

  let careerBearMessages = "Career Bear Messages: ";
  let userMessages = "User responses: ";

  quizData.interactions.forEach((interaction : BearInteraction) => {
    careerBearMessages += `,"${interaction.careerBearPrompt.prompt}"`;
    userMessages += `,"${interaction.userResponse.response}"`;
  })

  if (openai !== null) {
    completion = await openai.chat.completions.create({
      messages : [
        {
          role : "user",
          content : careerBearMessages
        },
        {
          role : "user",
          content : userMessages
        },
        {
          role : "system",
          content : 
          `Using the user responses to the career bear messages, give an overview of the user's personality by listing five personality traits with a general description of the trait, and the overall logic career bear used to deduce the trait 
          then list three jobs that may suit them based on those five traits with it's name and an overall description of said job as well as the logic career bear used to deduce such a job.` 
        },
        {
          role : "system",
          content : "Format the user's personality traits and career suggestions into the json format specified," + USER_DATA_FORMAT
        }
      ],
      //I would never usually do this but for some reason the field 'response_format' is not valid on some machines but valid on others
      //@ts-ignore
      response_format : {type : "json_object"},
      model : "gpt-4o"
    });

    if (completion !== undefined) {
      return completion;
    }
  }
}

export async function evaluateUserCareerFieldFromBasicQuiz(quizData : BasicQuiz) {

  initalizeAPI();

  let completion = null

  let careerBearQuestions = "Career Bear Questions: ";
  let userResponses = "User Responses: ";

  quizData.questionList.forEach((question : BasicQuestion) => {
    careerBearQuestions += `,"${question.name}"`;
    userResponses += `,"${question.answer}"`;
  })

  console.log(careerBearQuestions)
  console.log(userResponses)

  if (openai !== null) {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role : "user",
          content: careerBearQuestions
        },
        {
          role : "user",
          content: userResponses
        },
        {
          role : "system",
          content : `Using the user responses to the career bear questions, give an overview by listing three basic personality traits with a general description of the trait, and the overall logic that was used to deduce the trait
          then list three career fields that may suit the user based on those traits, putting the name, a description of the field, the logic used to determine the field and what personality traits were associated, as well as three popular jobs within that field
          `
        },
        {
          role : "system",
          content : "Format the user's personality traits and career field suggestions into the json formatted specified, " + USER_DATA_FORMAT_BASIC
        }
      ],
        //@ts-ignore
        //throws a fit when trying to use json type, state response_format does not exist
        response_format : {type : "json_object"},
        model : "gpt-4o"
      })
    }

  if (completion !== null) { 
    return completion;
  }
}

//These are service functions to get extra data about careers, career fields, etc.

export async function getJobsDetailsFromSuggestedJob(job : string) {
  if (initalizeAPI()) {
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role : "user",
          content : "Give me a brief, broad overview in less than 50 words of this career: " + job
        }
      ],
      model : "gpt-4-turbo"
    });

    if (completion !== null) {
      return completion;
    }
  }
}

export async function getDayInLifeForJob(job : string) {
  if (initalizeAPI()) {
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role : "user",
          content : "Give me a brief, broad overview of what a day might look like in less than 75 for this career: " + job
        }
      ],
      model : "gpt-4-turbo"
    });

    if (completion !== null) {
      return completion;
    }
  }
}

export async function getRequirementsForJob(job : string) {
  if (initalizeAPI()) {
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role : "user",
          content : "Give me a brief, broad overview of the education, certifications, or any other requirements in less than 50 words of this career: " + job
        }
      ],
      model : "gpt-4-turbo"
    });

    if (completion !== null) {
      return completion;
    }
  }
}

export async function getSalaryInformation(job : string) {
  if (initalizeAPI()) {
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role : "user",
          content : "Give me a brief, broad overview in less than 50 words of this career: " + job
        }
      ],
      model : "gpt-4-turbo"
    });

    if (completion !== null) {
      return completion;
    }
  }
}

