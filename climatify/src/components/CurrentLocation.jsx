import apiKeys from "./apiKeys.js";


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
              this.getWeather(28.67, 77.22);
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
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }); //we can also handle success and failure using then adn catch , but we can just taking using it to get the current locaiotn of teh user 
        //we get back data to getCurentpositon then we pass to above getPostion and tehn handles the case of resolve adn reject
      };



      getWeather = async (lat, lon) => { //once we get the cordinates from position, we will get the curent date and time adn wether from api
        const weather_data = await fetch(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}` //fetch data from the api
        );
        const data = await weather_data.json();
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

    }
}