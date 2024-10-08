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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createUpdate;
const gpt_js_1 = __importDefault(require("./gpt.js"));
const youtube_js_1 = require("./youtube.js");
const fs = __importStar(require("fs"));
function writeToJSONFile(obj, filePath) {
    try {
        const data = JSON.stringify(obj, null, 2); // Convert the object to a JSON string with 2-space indentation
        fs.writeFileSync(filePath, data); // Write the JSON data to the specified file path
    }
    catch (err) {
        console.error('Error writing to file:', err);
    }
}
function getTodaysDateAsString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day = today.getDate();
    // Formatting the date components to ensure double digits for single-digit months/days
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    // Creating the date string in YYYY-MM-DD format
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;
    return dateString;
}
async function createUpdate() {
    console.log("creating an update");
    const dataToWrite = {};
    // get subs
    console.log("getting subs");
    const subs = await (0, youtube_js_1.getSubscriptions)();
    let summarries = "";
    // get captions, summarise them and input data to write
    for (let index = 0; index < subs.length; index++) {
        try {
            console.log(`Summarising ${index + 1}/${subs.length}`);
            const vid = subs[index];
            const cap = await (0, youtube_js_1.getCaptions)(vid.id);
            const summary = await (0, gpt_js_1.default)(cap);
            summarries += " " + summary;
            dataToWrite[vid.title] = {
                id: vid.id,
                summary: summary
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log("finished summaries, now creating main summary");
    // create main summary 
    const mainSummary = await (0, gpt_js_1.default)(summarries);
    dataToWrite['mainSummary'] = mainSummary;
    // write data to disk
    writeToJSONFile(dataToWrite, `data/previousUpdateData/${getTodaysDateAsString()}_update.json`);
    writeToJSONFile(dataToWrite, `data/currentData.json`);
    console.log("finished creating update");
}
