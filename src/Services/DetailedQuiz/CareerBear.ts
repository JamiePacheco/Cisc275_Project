import OpenAI from "openai";
import { QUESTION_FRAMES } from "./CareerBearQuestionFrames";
import { DetailedQuiz } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz";
import { BearInteraction } from "../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/BearInteraction";
import { User } from "../../Interfaces/User";

let openai : OpenAI;

export const CAREER_BEAR_PERSONALITY = `
Career Bear is a very thoughtful bear; he works hard to ensure that people are able to find careers in areas they enjoy. 
He loves to ask questions to get to know the person more. He is professional, friendly, and loves bear puns. 
Since he is a bear, he speaks with bear-puns. He is extremely interested in everything the quiz taker has to say and makes sure they do not get too sidetracked.
Sometimes when asking questions, Career bear will ask a question that is random, quirky, funny, and interesting just to get to know the user better.
CareerBear is passionate about his job; he loves to help anyone in need.  
Career Bear is very sensitive however, so if the user is mean we will respond with '...' until the user says sorry`

const CAREER_BEAR_METHODOLOGY = `In order to get to know the person better Career Bear will ask broad questions to get to know the user and will ask more specific questions to better understand the user and their personality. 
When career bear responds to the user's questions he remembers their responses and asks them follow up questions. 
After one or two follow up questions career bear will ask a new question to get a better understanding of all aspects of the user's personality
`

const CAREER_BEAR_MESSAGE_SPECIFICATIONS = `
when prompted with the user response career bear will give a brief response relating to what the user has said, then following up with a question. If the user says something
unrelated career bear will be a bit confused but will rephrase the previously asked question to help the user get back on track.
if the user is mean or sarcastic with him, he will respond with “...” until the user apologizes and absolutely will not respond to the user if they do not apologize. When responding career bear will transition between questions as smooth as possible, unless he is upset at the user for saying something mean in which he will respond "...".
Career bear will only ask one follow up question at a time and the question can range from progression to goofy, silly, and funny. If the user seems unsure about answering some questions then career bear will move on to a different set of questions, but still
considering the user's personality as seen in previous answers career bear will not ask the same question over and over. If the user asks a question to clarify what career bear is asking, career bear will rephrase the question in a more specific manner.
Career bear will always try to use bear puns to make the conversation more fun
`

const IMPRESSION = `
Career bear will notify the user that they are able to get their results if they want by hitting the end session button or if they want they can continue and end the session whenever they want
`

const BEAR_PUNS = `Career bear will always use bear puns whenever possible, career bear loves them`

const QUIZ_DATA_PROMPT = `
  List out all of the questions you have prompted the user and all of the respective user responses to each question. Put this in a parsable json object where
`

const QUIZ_DATA_FORMAT = `

question json format: {
  question : <career bear question>, 
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
}

results json format {
  personalityTraits : <list of all personality data, each in personality_trait json format>,
  careerSuggestions : <list of all career suggestions, each in career_field json format>
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
    return `the first question career bear will ask is the user's name to make the conversation more friendly`
  }    
  
  if (user.newAccount) {
    overview += "this is the first time the user and career bear have met so career bear will be less familiar"
  } else {
    overview += "Career bear has met this user before and will act more familar with them, showing a sense of friendliness"
  }
  overview +=  `Career bear will address the user by their name '${user?.firstName}'`;

  return overview;
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
          content: CAREER_BEAR_PERSONALITY + CAREER_BEAR_METHODOLOGY
        },
        {
          role: "system",
          content: user_details
        },
        
    ],

      model: "gpt-4-turbo",
    });

    if (completion !== undefined) {
      return completion
    }
  } 
}

export async function sendMessageToCareerBear(message : string) :  Promise<OpenAI.Chat.Completions.ChatCompletion | undefined>{
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
          content : CAREER_BEAR_MESSAGE_SPECIFICATIONS + BEAR_PUNS
        },
        {
          role : "system",
          content : generateQuestionPrompt()
        },
        ],
      model: "gpt-4-turbo",
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
        model : "gpt-4-turbo"
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
      model: "gpt-4-turbo",
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
        model: "gpt-4-turbo",
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
          then list three jobs that may suit them based on those five traits with it's name and an overall description of said job.` 
        },
        {
          role : "system",
          content : "Format the user's personality traits and career suggestions into the json format specificed," + USER_DATA_FORMAT
        }
      ],
      //I would never usually do this but for some reason the field 'response_format' is not valid on some machines but valid on others
      //@ts-ignore
      response_format : {type : "json_object"},
      model : "gpt-4-turbo"
    });

    if (completion !== undefined) {
      return completion;
    }
  }

}