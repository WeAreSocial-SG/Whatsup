import { useEffect, useState } from "react";
import VideoBlock from "./components/videoBlock";

export default function App() {
  const [contentData, setContentData] = useState<any>(
    {date:"yy-mm-dd", mainSummary:"oh boy we screwed up somewhere"}
  )

  // load data from server
  useEffect(()=>{
    (async ()=>{
      const data = await fetch("http://13.214.102.62:4000/currentUpdate")
      setContentData(await data.json())
    })()
  }, [])

  const contentKeys = contentData ? Object.keys(contentData) : []

  return (
    <div className="main">
      {/* title */}
      <h1 className="paddingRem">What's up</h1>
      {/* subtitle */}
      <div className="subtitle">
        <div>
          <h2 className="paddingRem">What happened this week in innovative tech</h2>
          <h2 className="paddingRem">{contentData.date}</h2>
        </div>
        <p className="weekSummary paddingRem">{contentData.mainSummary}</p>
      </div>
      {/* main content */}
      <div className="contentContainer">
        {}
        {contentKeys!.map((key)=>{
          if(key === "date" || key === "mainSummary"){return null}
          const dataBlock:any = contentData![key]
          return <VideoBlock title={key} summary={dataBlock.summary} id={dataBlock.id!}/>
        })}
      </div>
    </div>
  )
}