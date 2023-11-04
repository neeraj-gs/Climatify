import './App.css'
import Weather from './components/CurrentLocation'

function App() {

  return (
    <>
      <div>
        <Weather /> 
        {/* Weather gets the componets, the left componet htat asks for your location and built on top of it */}
      </div>
    </>
  )
}

export default App
