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
        <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">
          Download Source Code
        </a>{" "}
        | Created WIth ❤️️ by Neeraj GS{" "}
        <a target="_blank" href="https://www.gauravghai.dev/" rel="noreferrer">
          Gaurav Ghai
        </a>{" "}
      </div>

      
    </React.Fragment>
  )
}

export default App
