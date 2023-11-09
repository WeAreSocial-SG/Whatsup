import Configuration, { OpenAI } from "openai";
import { keys } from "./dotenv";

// seutp open ai
const configuration:any = new Configuration({
  apiKey: keys.openAi
});
const openai = new OpenAI(configuration);

function countWords(str:string){
  return str.split(' ').length
}

// for when the content is larger than 4096 tokens
async function compressContentForGpt(content:string){
  let finalContent = content
  while(countWords(finalContent) > 2800){
    
  }
}

// main function
export default async function summariseContent(content:string, condition="make it less than 100 words"){
  // while()
  // if content is too big... split it then summarise and recombine
  // split long content into chunks of 1000 words ish
  // const chunks = splitStringIntoArray(content);
  // // 
  

  // const completion = await openai.chat.completions.create({
  //     model: "gpt-4",
  //     messages:[
  //       {role: "user", content: "here's an article/transcript. please summarise it"},
  //       ...preparedChunks,
  //       {role: "user", content: condition},
  //     ],
  // });
  // const reply = completion.choices[0].message.content
  // return reply
}