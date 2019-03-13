"use strict";
const axios = require("axios");
const apikey = "6e45df70e4b0469e82091335191302"; //your api key to the apixu
const getWeather = location => {
  return new Promise(async (resolve, reject) => {
  try{
    const weatherConditions = await axios.get( //get weather info from the api
    "http://api.apixu.com/v1/forecast.json", 
    {
      params: {
      key: apikey ,
      q: location ,
      days: 3 
    }
  });

    resolve(weatherConditions.data) //returns back the
//results to the chatbot
    } catch(error){
        reject(error); 
      }
  });
}

module.exports = getWeather;