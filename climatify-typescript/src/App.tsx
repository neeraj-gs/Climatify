import './App.css'
import Weather from './components/Weather'

function App() {
  return (
    <>
      {/* Main COmpoent Section  */}
      <div className='container'>
        <Weather /> 
      </div>

      {/* Footer Section  */}
      <div className="footer-info">
      <a href="https://github.com/neeraj-gs/Weather-App" target="_blank" rel="noreferrer" style={{color:'lightblue'}}>
        Source Code
      </a>
      {" "}
        | Created With ❤️️ by Neeraj GS{" "}
      </div>
    </>
  )
}

export default App
