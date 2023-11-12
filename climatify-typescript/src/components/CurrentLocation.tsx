//used class components
import React from "react";
import { apiKeys } from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import loader from "../images/WeatherIcons.gif";
import Forcast from './Forecast'
import LiveClock from "./LiveClock";


const liveDate = (d)=>{ //specifies the current date
    //used to render data on the current location section
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    
      let day = days[d.getDay()]; //to get the current day ,returns 0 to 6 ,so compared with array index
      let date = d.getDate(); //gives number between 1 to 31 based on date
      let month = months[d.getMonth()]; //returns 0 to 11 , so array index is used
      let year = d.getFullYear(); //returns 4 digits of current year
    
      return `${day}, ${date} ${month} ${year}`;
}

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};


class Weather extends React.Component {
    
    //once we allow a location from our browser, it returns a object and we store it in the variables
    state = {
      latitude: undefined, //to get data of the current location
      longitude: undefined,
      errorMessage: undefined,
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      sunrise: undefined,
      sunset: undefined,
      errorMsg: undefined,
    };


    componentDidMount() { //react componentDidMount is automatically called by react after componet is added to dom
        if (navigator.geolocation) { //for browser to allow geolocation
          this.getPosition()
            //If user allow location service then will fetch data & send it to get-weather function.
            .then((position) => {
                //position is an object that gives some data and contains a latitude and longitude
                console.log(position)
                this.getWeather(position.coords.latitude, position.coords.longitude); //used to fetch data from a api givenS
            })
            .catch((err) => {
              //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
              console.log(err);
              this.getWeather(28.67, 77.22); //used to fetch data from a api givenS
              alert(
                "You have disabled location service. Your current location will be used for calculating Real time weather."
              );
            });
        } else {
          alert("Geolocation not available"); //if popup does not occur
        }
    
        this.timerID = setInterval( //pdate data at regular intervals in web applications, ensuring that the information remains current 
          () => this.getWeather(this.state.lat, this.state.lon)
          ,600000); //it calls every 10 min and fetches the data from api
      }

      componentWillUnmount() { //lifecycle methird called jsut before a compoent is removed from dom ,automatically called
        clearInterval(this.timerID); //clears all the schedule , so taht our code restarts from start when teh app loads next time
      }

      getPosition = (options) => { //options can be configs like accuracy requiremetns and timeout
        return new Promise(function (resolve, reject) { //wrapepd in a promise to handle success and failure
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }); //we can also handle success and failure using then adn catch , but we can just taking using it to get the current locaiotn of teh user 
        //we get back data to getCurentpositon then we pass to above getPostion and tehn handles the case of resolve adn reject
      };



      getWeather = async (lat, lon) => { //once we get the cordinates from position, we will get the curent date and time adn wether from api
        const weather_data = await fetch(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}` //fetch data from the api
        );
        const data = await weather_data.json();
        console.log(data);
        this.setState({ //updating the state we created eralier
          latitude: lat,
          longitude: lon,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          temperatureF: Math.round(data.main.temp * 1.8 + 32),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          country: data.sys.country,
        });


        switch (this.state.main) { //based on the case recieved from teh 3rd party api  , we render teh icon based on teh weather name in main
            case "Haze":
              this.setState({ icon: "CLEAR_DAY" });
              break;
            case "Clouds":
              this.setState({ icon: "CLOUDY" });
              break;
            case "Rain":
              this.setState({ icon: "RAIN" });
              break;
            case "Snow":
              this.setState({ icon: "SNOW" });
              break;
            case "Dust":
              this.setState({ icon: "WIND" });
              break;
            case "Drizzle":
              this.setState({ icon: "SLEET" });
              break;
            case "Fog":
              this.setState({ icon: "FOG" });
              break;
            case "Smoke":
              this.setState({ icon: "FOG" });
              break;
            case "Tornado":
              this.setState({ icon: "WIND" });
              break;
            default:
              this.setState({ icon: "CLEAR_DAY" });
          }
    }

    render() {
      if (this.state.temperatureC) { //rendered only if the data is fetched successfully
        return (
          <React.Fragment>
            <div className="city">
              <div className="title">
                <h2>{this.state.city}</h2>
                <h3>{this.state.country}</h3>
              </div>
              <div className="mb-icon">
                {" "}
                <ReactAnimatedWeather
                  icon={this.state.icon}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
                <p>{this.state.main}</p>
                {/* disaplys the main , based on switch case icon is rendered */}
              </div>
              <div className="date-time">
                <div className="dmy">
                  <div id="txt"></div>
                  <div  className="current-time">
                    <LiveClock />
                  </div>
                  <div className="current-date">{liveDate(new Date())}</div>
                </div>
                <div className="temperature">
                  <p>
                    {this.state.temperatureC}°<span>C</span>
                  </p>
                  {/* <span className="slash">/</span>
                  {this.state.temperatureF} &deg;F */}
                </div>
              </div>
            </div>
            <Forcast icon={this.state.icon} weather={this.state.main} />
          </React.Fragment>
        );
      } else { //if teh data is not fetched from the api
        return ( //this is the page being renderd , if the user is not yet allowd for geolocation
          <React.Fragment>
            <div style={{display:"flex", flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'0 auto'}}>
              <img src={loader} style={{top:"0px", width: "100%", WebkitUserDrag: "none" }} />
              <h3 style={{ color: "skyblue", fontSize: "22px", fontWeight: "600" }}>
                Detecting your location .... 
              </h3>
              <h3 style={{ color: "white", marginTop: "30px" }}>
                We use Location to display your current weather report <br />
                Your Cuurent location, time and date will be available.
              </h3>
            </div>
          </React.Fragment>
        );
      }
    }
    



}

export default Weather;