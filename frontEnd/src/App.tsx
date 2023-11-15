import { useEffect, useState } from "react";

export default function App() {
  const [contentData, setContentData] = useState()

  // load data from server
  useEffect(()=>{
    (async ()=>{
      const data = await fetch("http://localhost:3000/currentUpdate")
      setContentData(await data.json())
    })()
  }, [])

  return (
    <div className="main">
      {/* title */}
      <h1>What's up</h1>
      {/* subtitle */}
      <div className="subtitle">
        <h2>What happened this week</h2>
        <h2>yy-mm-dd</h2>
      </div>
      {/* main content */}
      <div className="contentContainer"></div>
    </div>
  )
}