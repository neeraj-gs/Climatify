import './App.css'
import Weather from './components/CurrentLocation'
import React from 'react'

function App() {

  return (
    <React.Fragment>
      <div className='container'>
        <Weather /> 
        {/* Weather gets the componets, the left componet htat asks for your location and built on top of it */}
      </div>

      <div className="footer-info">
      <a href="https://github.com/neeraj-gs/Weather-App" target="_blank" rel="noreferrer">
        Download Source Code
      </a>
      {" "}
        | Created WIth ❤️️ by Neeraj GS{" "}
      </div>

      
    </React.Fragment>
  )
}

export default App
