import { getCaptions} from '@os-team/youtube-captions';

export default class YoutubeInterface{
  constructor(){

  }
  async test(){
    console.log("getting captions")
    const res = await getCaptions('SIm2W9TtzR0', 'en', '/home/elbert/miniconda3/bin/yt-dlp')
    console.log(res)
    // try{
    //   const res = await getCaptions('SIm2W9TtzR0', 'en')
    //   return res
    // }catch(e){
    //   console.log(e)
    // }
  }
}
