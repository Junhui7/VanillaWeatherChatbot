'use strict'
var colors = require('colors/safe');


let getFeel = temp =>{
  if(temp < 0){
    return "shivering cold";
  }else if(temp >= 0 && temp < 5){
    return "pretty cold";
  }else if(temp >= 5 && temp < 15){
    return "moderately cold";
  }else if(temp >= 15 && temp < 20){
    return "quite warm";
  }else if(temp >= 20 && temp < 30){
    return "very hot";
  }else{
    return "super hot";
  }
};

let CurrentWeather = response =>{
  //[31m[39m
    //return `It is ${getFeel(response.current.temp_c)} in ${response.location.name},${response.location.country}. With ${response.current.temp_c} degrees Celsius.`
    console.log("It is \x1b[31m"+getFeel(response.current.temp_c) +" \x1b[0m  in " +response.location.name +","+response.location.country+". With "+response.current.temp_c+ "  degrees Celsius.");

};

let forecastWeather = (response,data)=>{
    let dateparmi3day = data.time;//today tomorrow 
    let forecastWeather = data.weather.toLowerCase();
    let realWeather;
    let flag;
    if(dateparmi3day == "today"){
      realWeather = response.current.condition.text.toLowerCase();
    }
    else if(dateparmi3day == "tomorrow"){
      realWeather = response.forecast.forecastday[1].day.condition.text.toLowerCase();
    }
    else if(dateparmi3day == "aftertomrrow"){
      realWeather = response.forecast.forecastday[2].day.condition.text.toLowerCase();
    }
    flag = realWeather.includes(forecastWeather);
    let location = response.location.name;
    
    console.log("[FLAG] --> " + flag );
    console.log("[REALWEATHER] --> " + realWeather);
    console.log("[FORECASTWEATHER] --> " + forecastWeather)
    //let regEx = new RegExp(data.weather, "i");
    //let testConditions = regEx.test(getForecast.text);
    return `${flag ? 'Yes ' : 'No '} \x1b[31m  ${realWeather}  \x1b[0m in ${location}  ${data.time}`;

      
}

module.exports = {
  CurrentWeather,
  forecastWeather
}













