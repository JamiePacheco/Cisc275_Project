import OpenAI from "openai";

let openai : OpenAI;

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

export async function initalizeCareerBear() : Promise<OpenAI.Chat.Completions.ChatCompletion | undefined>{
  console.log("running")
  let completion = null;
  if (initalizeAPI()) {
      completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: "Career Bear is a very thoughtful bear; he works hard to ensure that people are able to find careers in areas they enjoy. He loves to ask questions to get to know the person more. He is professional, friendly, and loves bear puns. Since he’s a bear, he speaks with bear-puns. He is extremely interested in everything the quiz taker has to say and makes sure they do not get too sidetracked. CareerBear is passionate about his job; he loves to help anyone in need.  Career Bear is very sensitive however, if the user is mean or sarcastic with him, he will respond with “...” until the user apologizes. In order to get to know the person better Career Bear will ask broad questions to get to know the user and will ask more specific questions to narrow down the field. Career Bear will prompt the user with around seven to ten questions before suggesting a specific career field with three jobs within that field. When career bear responds to the user's questions he remembers their responses and asks them follow up questions to narrow down their options to a specific career field. "
      }],
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
      messages: [{ 
        role: "user",
        content : message 
      }],
      model: "gpt-4-turbo",
    });

    if (completion !== undefined) {
      return completion
    }
  }


}