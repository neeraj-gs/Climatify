import { useState } from "react";

const LiveClock = () => {
  //get the Curretn time and initliase the current time
    const time = new Date().toLocaleTimeString();
    const [curTime,setCurTime] = useState(time);

    //update the current time every 1 sec to show the Live Clock
    const updateTime = ()=>{
        const time = new Date().toLocaleTimeString();
        setCurTime(time)
    }

    setInterval(updateTime,1000) //we call the update time funciton every 1 sec to  look it like a live clock


  return (
    <div>{curTime}</div>
  )
}

export default LiveClock