import { useEffect, useState } from "react";
import VideoBlock from "./components/videoBlock";

export default function App() {
  const [contentData, setContentData] = useState<any>(
    {date:"yy-mm-dd", mainSummary:"oh boy we screwed up somewhere"}
  )

  // load data from server
  useEffect(()=>{
    (async ()=>{
      const data = await fetch("https://elcloudapp.com/forward?to=http://13.214.102.62:4000/currentUpdate")
      setContentData(await data.json())
    })()
  }, [])

  const contentKeys = contentData ? Object.keys(contentData) : []

  return (
    <div className="main border">
      {/* title */}
      <div className="heading flex border">
        <h1 className="paddingRem noto title">What's Up?</h1>
      </div>
      {/* subtitle */}
      <div className="subtitle">
        <div>
          <h2 className="paddingRem noto border">What happened this week in innovative tech</h2>
          <h2 className="paddingRem noto border">{contentData.date}</h2>
        </div>
        <p className="weekSummary paddingRem border">{contentData.mainSummary}</p>
      </div>
      <hr />
      {/* main content */}
      <div className="contentContainer">
        {}
        {contentKeys!.map((key)=>{
          if(key === "date" || key === "mainSummary"){return null}
          const dataBlock:any = contentData![key]
          return <VideoBlock title={key} summary={dataBlock.summary} id={dataBlock.id!}/>
        })}
      </div>
      <hr />
    </div>
  )
}