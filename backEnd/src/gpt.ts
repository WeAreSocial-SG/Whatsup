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

function chopStringIntoArray(text: string, chunkSize=1000): string[] {
    const words = text.split(' ');
    const chunkedStrings: string[] = [];
    for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize);
        const chunkedString = chunk.join(' ');
        chunkedStrings.push(chunkedString);
    }
    return chunkedStrings;
}

// for when the content is larger than 4096 tokens
async function compressContentForGpt(content:string){
  let finalContent = content
  while(countWords(finalContent) > 2800){
    const chunks = chopStringIntoArray(content, 2800);
    let newFinalContent = ""
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      const summary = await summariseContent(chunk, "make it less than 1000 words")
      newFinalContent += " "+summary
    }
    finalContent = newFinalContent;
  }
  return finalContent
}

// main function
export default async function summariseContent(content:string, condition="make it less than 100 words"){
  let toSummarise = content

  // compress content if it's bigger then 4096 tokens
  if(countWords(toSummarise) > 2800){toSummarise = await compressContentForGpt(toSummarise)}
  
  const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages:[
        {role: "user", content: "here's an article/transcript. please summarise it"},
        {role: "user", content: toSummarise},
        {role: "user", content: condition},
      ],
  });
  const reply = completion.choices[0].message.content
  return reply
}