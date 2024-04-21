import OpenAI from "openai";

let openai : OpenAI;

export function initalizeKey() {

    const userKey : string = localStorage.getItem("MYKEY") === null ?
     "empty" : localStorage.getItem("MYKEY");

    openai = new OpenAI(
        {apiKey : userKey}
    )
}

export async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
