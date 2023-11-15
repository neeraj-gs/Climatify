import { useState } from "react";

const LiveClock = () => {
    const time = new Date().toLocaleTimeString();
    const [curTime,setCurTime] = useState(time);

    const updateTime = ()=>{
        const time = new Date().toLocaleTimeString();
        setCurTime(time)
    }

    setInterval(updateTime,1000)


  return (
    <div>{curTime}</div>
  )
}

export default LiveClock