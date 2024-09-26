"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = summariseContent;
const openai_1 = __importStar(require("openai"));
const dotenv_1 = require("./dotenv");
// seutp open ai
const configuration = new openai_1.default({
    apiKey: dotenv_1.keys.openAi
});
const openai = new openai_1.OpenAI(configuration);
function countWords(str) {
    return str.split(' ').length;
}
function chopStringIntoArray(text, chunkSize = 1000) {
    const words = text.split(' ');
    const chunkedStrings = [];
    for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize);
        const chunkedString = chunk.join(' ');
        chunkedStrings.push(chunkedString);
    }
    return chunkedStrings;
}
// for when the content is larger than 4096 tokens
async function compressContentForGpt(content) {
    let finalContent = content;
    while (countWords(finalContent) > 2800) {
        const chunks = chopStringIntoArray(content, 2800);
        let newFinalContent = "";
        for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
            const summary = await summariseContent(chunk, "make it less than 1000 words");
            newFinalContent += " " + summary;
        }
        finalContent = newFinalContent;
    }
    return finalContent;
}
// main function
async function summariseContent(content, condition = "make it less than 100 words") {
    let toSummarise = content;
    // compress content if it's bigger then 4096 tokens
    if (countWords(toSummarise) > 2800) {
        toSummarise = await compressContentForGpt(toSummarise);
    }
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            { role: "user", content: "here's an article/transcript. please summarise it" },
            { role: "user", content: toSummarise },
            { role: "user", content: condition },
        ],
    });
    const reply = completion.choices[0].message.content;
    return reply;
}
