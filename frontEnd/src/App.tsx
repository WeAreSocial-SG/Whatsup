import YoutubeInterface from "./youtube/youtubeInterface"

const youtube = new YoutubeInterface();

export default function App() {
  const click = async ()=>{
    // todo get data from youtube
    const res = await youtube.test();
    console.log(res);
    // todo process data for front end
  }

  return (
    <button onClick={click}>process</button>
  )
}