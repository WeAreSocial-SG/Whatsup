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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importStar(require("openai"));
const dotenv_1 = require("./dotenv");
// seutp open ai
const configuration = new openai_1.default({
    apiKey: dotenv_1.keys.openAi
});
const openai = new openai_1.OpenAI(configuration);
const splitStringIntoArray = (inputString) => {
    const words = inputString.split(' ');
    const maxWordsPerChunk = 300;
    const chunks = [];
    for (let i = 0; i < words.length; i += maxWordsPerChunk) {
        const chunk = words.slice(i, i + maxWordsPerChunk).join(' ');
        chunks.push(chunk);
    }
    return chunks;
};
// main function
function summariseContent(content, condition = "make it less than 100 words") {
    return __awaiter(this, void 0, void 0, function* () {
        // split long article into chunks of 300 words ish
        const chunks = splitStringIntoArray(content);
        console.log(chunks.length);
        // prepare the chunks 
        const preparedChunks = chunks.map((elem) => {
            return { role: "user", content: elem };
        });
        const completion = yield openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "user", content: "here's an article/transcript. please summarise it" },
                ...preparedChunks,
                { role: "user", content: condition },
            ],
        });
        const reply = completion.choices[0].message.content;
        return reply;
    });
}
exports.default = summariseContent;
