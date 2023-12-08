import summariseContent from "./gpt"
import { getCaptions, getSubscriptions } from "./youtube"
import * as fs from 'fs'

interface UpdateData{
    [index:string]:{
        id:string,
        summary:string
    }|string,
}
function writeToJSONFile(obj: any, filePath: string): void {
    try {
        const data = JSON.stringify(obj, null, 2); // Convert the object to a JSON string with 2-space indentation
        fs.writeFileSync(filePath, data); // Write the JSON data to the specified file path
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}
function getTodaysDateAsString(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day: number = today.getDate();
    // Formatting the date components to ensure double digits for single-digit months/days
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    // Creating the date string in YYYY-MM-DD format
    const dateString: string = `${year}-${formattedMonth}-${formattedDay}`;
    return dateString;
}

export default async function createUpdate(){
    console.log("creating an update");
    const dataToWrite:UpdateData = {}
    // get subs
    console.log("getting subs")
    const subs = await getSubscriptions()
    let summarries = ""
    // get captions, summarise them and input data to write
    for (let index = 0; index < subs.length; index++) {
        console.log(`Summarising ${index+1}/${subs.length}`)
        const vid = subs[index];
        const cap = await getCaptions(vid.id);
        const summary = await summariseContent(cap)
        summarries += " " + summary
        dataToWrite[vid.title] = {
            id:vid.id,
            summary:summary!
        }
    }
    console.log("finished summaries, now creating main summary")
    // create main summary 
    const mainSummary = await summariseContent(summarries);
    dataToWrite['mainSummary'] = mainSummary!
    // write data to disk
    writeToJSONFile(dataToWrite, `data/previousUpdateData/${getTodaysDateAsString()}_update.json`)
    writeToJSONFile(dataToWrite, `data/currentData.json`)
    console.log("finished creating update")
}