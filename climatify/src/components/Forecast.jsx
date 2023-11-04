//THis is a componet that  shows all the temperatur enad weather detaisl in the second compoent
//used hooks

import { useState } from "react";
import { apiKeys } from "./apiKeys";
import axios from "axios";

const Forcast =(props) =>{
    const [query, setQuery] = useState(""); //searching of the econd component [we can also have a dropdown menu giveng diffrrent cities or places of the world]
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({}); //calling the weather to store the respionse


    const search = (city) => { //once we get the query request we search it
        axios
          .get(
            `${apiKeys.base}weather?q=${ //api is hit again for the city
              city != "[object Object]" ? city : query //if city is an object , if data isnnot cleared predefined is given , if not query passed in search bar is shown
            }&units=metric&APPID=${apiKeys.key}`
          )
          .then((response) => {
            setWeather(response.data);
            setQuery(""); //clear the search bar after data is fetched 
          })
          .catch(function (error) {
            console.log(error);
            setWeather("");
            setQuery("");
            setError({ message: "Not Found , Enter a Correct City Name", query: query });
          });
      };

      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        } // add zero in front of numbers < 10
        return i;
      }

}

export default Forcast;