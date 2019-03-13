'use strict';
var colors = require('colors');


const Readline = require('readline');
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const matcher = require('./matcher'); //to use the matcher module here
const weather = require('./weather');
const {CurrentWeather,forecastWeather} = require('./assembly');

rl.setPrompt('> '); 
rl.prompt(); 


rl.on('line', reply => {
	matcher(reply , data => {
// do it by yourself
    switch (data.intent) {
      case 'Hello':
        console.log(`Nice to you`);
        rl.prompt();
        break;
      case 'Exit':
        console.log("See you");
        process.exit();
        break;
      case 'CurrentWeather':
        //console.log(`current weather Let me check, current weather @ ${data.entities.city}`);
        weather(data.entities.city, 'current')
          .then(response => {
            // let pasrseResponse = CurrentWeather(response);
            // console.log("----TTTT")
            // console.log(pasrseResponse)
            //console.log(response.forecast.forecastday[1])
            /*
            console.log(data);
            console.log("***************");
            console.log(response);
            console.log("***************");
            console.log(response.forecast.forecastday[2]);
            console.log("***************");
            console.log("***************");
            //console.log(CurrentWeather(response));
            */
            CurrentWeather(response);
            
            //console.log(data.entities.city + " Temperature is "+ response.current.temp_c);
            //console.log(response.forecast.forecastday[1])
            //console.log("it is very cold in "+response.location.name+" ,"+response.location.country+". with "+response.current.temp_c+" degrees Celsius.");
            rl.prompt();
          }).catch(error => {
            console.log("[CurrentWeather] error current weather There seems to be a problem in connecting with weather service...");
            rl.prompt();
          })
        break;
      case 'WeatherForecast':
        //console.log(`weather forcast Let me check, weather forecast of ${data.entities.city}`);
        weather(data.entities.city)
          .then(response => {
            //let pasrseResponse = forecastWeather(response,data.entities);
            //console.log("Test---------")
            console.log(forecastWeather(response,data.entities));
            rl.prompt();
          }).catch(error => {
            console.log("[WeatherForecast] error weather forcast There seems to be a problem in connecting with weather service...");
            rl.prompt();
          })
        break;
      default:
        console.log("May be there is some wrong ");
        rl.prompt();
    }
	}); 
} );