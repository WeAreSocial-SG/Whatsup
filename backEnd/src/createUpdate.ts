import summariseContent from "./gpt"
import { getCaptions, getSubscriptions } from "./youtube"

interface UpdateData{
    [index:string]:{
        id:string,
        title:string,
        summary:string
    }
}

export default async function createUpdate(){
    const dataToWrite:UpdateData = {}
    // get subs
    const subs = await getSubscriptions()
    // get captions, summarise them and input data to write
    for (let index = 0; index < subs.length; index++) {
        const vid = subs[index];
        const cap = await getCaptions(vid.id);
        const summary = await summariseContent(cap)
        dataToWrite[vid.title] = {
            id:vid.id,
            title:vid.title,
            summary:summary!
        }
    }
    // write data to disk
    console.log(dataToWrite)
}