import search from 'youtube-search';
import { keys } from './dotenv.js';
import * as fs from 'fs';
import { isDateMoreThanAWeekOld } from './time.js';
const getSubtitles = require('youtube-captions-scraper').getSubtitles;

async function getLatestVideosFromChannel(channelId:string, num=3){
  const  opts = {
    maxResults: num,
    key: keys.googleCloud,
    channelId: channelId,
    order:'date',
  };
  const results = await search('', opts);
  return results
}

export async function getCaptions(id:string){
  const transcriptData = await getSubtitles({videoID:id})
  let transcript = ""
  for (let index = 0; index < transcriptData.length; index++) {
    transcript += " " + transcriptData[index].text
  }
  return transcript
}

function getChannelIds(){
  const ids:Array<string> = []
  // read file
  const rawString = fs.readFileSync('data/subscriptions.csv', 'utf-8');
  // extract ids
  rawString.split(/\r?\n/).forEach((line)=>{
    ids.push(line.split(',')[1])
  })
  return ids
}

export async function getSubscriptions(){
  // get channel ids you subscribe to
  const channelIds = getChannelIds();
  let latestVideosFromThisWeek:any = []
  // for every channel get latest videos and only include videos in the past week
  for (let index = 0; index < channelIds.length; index++) {
    // get latest videos
    const id = channelIds[index];
    const videosFromChannel = await getLatestVideosFromChannel(id);
    // prune videos older than a week
    const videosFromThisWeek = videosFromChannel.results.filter((vidData)=>{
      const date = vidData.publishedAt.split('T')[0]
      return !isDateMoreThanAWeekOld(date)
    })
    // save latest videos
    latestVideosFromThisWeek = [...latestVideosFromThisWeek, ...videosFromThisWeek]
  }
  return latestVideosFromThisWeek
}